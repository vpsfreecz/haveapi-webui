import React from 'react'
import {LinkTo, resourcePath, findAssociation} from '../../../utils'

function nl2br (str) {
	var rx = /(\n|\r\n)/g;
	var lines = str.split(rx);

	return lines.map(function (line, index) {
		if (line.match(rx))
			return React.createElement('br', {key: index});

		return line;
	});
}

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

		case 'String':
		case 'Text':
			return resource[name] && nl2br(resource[name]);

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
			var path = resourcePath(this.props.resource);
			var ids = this.context.url_params.slice(0, path.length-1);
			ids.push(this.props.resource.id);

			return <LinkTo to={[path.join('.'), 'show', ids.join(',')]} className="parameter">{data}</LinkTo>;
		}

		if (this.props.desc.type == 'Resource') {
			var assoc = findAssociation(this.context.api, this.props.desc.resource.slice(0));
			var metaNs = this.context.api.apiSettings.meta.namespace;
			var attr = this.props.resource._private.attributes[this.props.name];

			if (assoc.show && attr) {
				return (
					<LinkTo
						to={[
							this.props.desc.resource.join('.'),
							'show',
							attr[metaNs].url_params.join(',')
						]}
						className="association">
						{data}
					</LinkTo>
				);
			}
		}

		return <span className="parameter">{data}</span>;
	}
});

OutputParameter.contextTypes = {
	api: React.PropTypes.object,
	url_params: React.PropTypes.array,
};

export default OutputParameter;
