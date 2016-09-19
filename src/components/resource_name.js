import React from 'react'

export default function ({resource}) {
	return <span className="resource-name">{resource.replace(/_/g, ' ')}</span>;
};
