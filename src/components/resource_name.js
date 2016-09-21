import React from 'react'
import {resourcePath} from '../utils'

export default function ({resource}) {
	return (
		<span className="resource-name">
			{resourcePath(resource).map(r => r.replace(/_/g, ' ')).join(' . ')}
		</span>
	);
};
