import React from 'react'
import {resourcePath, capitalize} from '../../utils'

export default function ({resource}) {
	return (
		<span className="resource-name">
			{resourcePath(resource).map(r => (
				r.split('_').map(v => (capitalize(v)))
			).join(' ')).join('.')}
		</span>
	);
};
