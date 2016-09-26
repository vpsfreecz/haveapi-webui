import React from 'react'
import {Table} from 'react-bootstrap'
import ResourceName from './resource_name'
import {LinkTo, resourcePath} from '../utils'

export default React.createClass({
	render: function () {
		return (
			<div className="subresources">
				<h3>Subresources</h3>

				<Table condensed>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{this.props.resource.resources.map(r => (
							<tr key={r.getName()}>
								<td>
									<LinkTo to={[resourcePath(r).join('.'), 'index', this.props.ids]}>
										<ResourceName resource={r} />
									</LinkTo>
								</td>
								<td>{r._private.description.description}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
});
