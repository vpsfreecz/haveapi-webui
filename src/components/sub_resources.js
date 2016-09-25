import React from 'react'
import ResourceName from './resource_name'
import {LinkTo, resourcePath} from '../utils'

export default React.createClass({
	render: function () {
		return (
			<ul>
				{this.props.resource.resources.map(r => (
					<li key={r.getName()}>
						<LinkTo to={[resourcePath(r).join('.'), 'index', this.props.ids]}>
							<ResourceName resource={r} />
						</LinkTo>
					</li>
				))}
			</ul>
		);
	}
});
