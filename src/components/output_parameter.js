import React from 'react'

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

export default function ({name, resource, desc}) {
	var data = formatParameter(name, resource, desc);

	if (desc.type == 'Custom')
		return <pre><code className="parameter">{data}</code></pre>;

	return <span className="parameter">{data}</span>;
};
