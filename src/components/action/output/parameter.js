import React from 'react'
import LinkTo from '../../link'
import {resourcePath, findAssociation} from '../../../utils'

function nl2br (str) {
	var rx = /(\n|\r\n)/g;
	var lines = str.split(rx);

	return lines.map(function (line, index) {
		if (line.match(rx))
			return React.createElement('br', {key: index});

		return line;
	});
}

function formatParameter (name, object, desc) {
	switch (desc.type) {
		case 'Resource':
			var attr = object._private.attributes[name];

			if (!attr)
				return '-';

			return attr[desc.value_label] + ' (#' + attr[desc.value_id] + ')';

		case 'Boolean':
			return object[name] ? 'Yes' : 'No';

		case 'Datetime':
			var v = object[name];

			if (v)
				return new Date(v).toLocaleString();

			return '-';

		case 'Custom':
			return JSON.stringify(object[name], null, 2);

		case 'String':
		case 'Text':
			return object[name] && nl2br(object[name]);

		default:
			return object[name];
	}
}

var OutputParameter = React.createClass({
	render: function () {
		var data = formatParameter(
			this.props.name,
			this.props.object,
			this.props.desc
		);

		if (this.props.desc.type == 'Custom')
			return <pre><code className="parameter">{data}</code></pre>;

		if (this.props.name == 'id' && this.props.resource.show) {
			var path = resourcePath(this.props.resource);
			var ids = this.context.url_params.slice(0, path.length-1);
			ids.push(this.props.object.id);

			return <LinkTo to={[path.join('.'), 'show', ids.join(',')]} className="parameter">{data}</LinkTo>;
		}

		if (this.props.desc.type == 'Resource') {
			var assoc = findAssociation(this.context.api, this.props.desc.resource.slice(0));
			var metaNs = this.context.api.apiSettings.meta.namespace;
			var attr = this.props.object._private.attributes[this.props.name];

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
