import React from 'react'
import ResourceName from './resource_name'
import {LinkTo, resourcePath} from '../utils'

export default React.createClass({
	render: function () {
		return (
			<ul>
				{this.props.resource.resources.map(r => (
					<li key={r}>
						<LinkTo to={[resourcePath(this.props.resource[r]).join('.'), 'index', this.props.ids]}>
							<ResourceName resource={this.props.resource[r]} />
						</LinkTo>
					</li>
				))}
			</ul>
		);
	}
});
