import React from 'react'
import {LinkTo, resourcePath} from '../utils'

function formatParameter (name, resource, desc) {
	switch (desc.type) {
		case 'Resource':
			var attr = resource._private.attributes[name];

			if (!attr)
				return '-';

			return attr[desc.value_label] + ' (#' + attr[desc.value_id] + ')';

		case 'Boolean':
			return resource[name] ? 'Yes' : 'No';

		case 'Datetime':
			var v = resource[name];

			if (v)
				return new Date(v).toLocaleString();

			return '-';

		case 'Custom':
			return JSON.stringify(resource[name], null, 2);

		default:
			return resource[name];
	}
}

var OutputParameter = React.createClass({
	render: function () {
		var data = formatParameter(
			this.props.name,
			this.props.resource,
			this.props.desc
		);

		if (this.props.desc.type == 'Custom')
			return <pre><code className="parameter">{data}</code></pre>;

		if (this.props.name == 'id' && this.props.resource.show) {
			var ids = this.context.url_params.slice(0);
			ids.push(this.props.resource.id);

			return <LinkTo to={[resourcePath(this.props.resource).join('.'), 'show', ids.join(',')]} className="parameter">{data}</LinkTo>;
		}

		return <span className="parameter">{data}</span>;
	}
});

OutputParameter.contextTypes = {
	url_params: React.PropTypes.array,
};

export default OutputParameter;
