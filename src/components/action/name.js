import React from 'react'
import {capitalize} from '../../utils'

export default function ({action}) {
	return (
		<span className="action">
			{action.split('_').map(a => capitalize(a)).join(' ')}
		</span>
	);
};
