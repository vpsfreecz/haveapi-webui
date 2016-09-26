import React from 'react'
import {Table} from 'react-bootstrap'
import ActionName from './action/name'
import {LinkTo, resourcePath} from '../utils'

var ResourceActions = React.createClass({
	render: function () {
		var name = this.props.resource._private.name;
		var path = resourcePath(this.props.resource);

		return (
			<div className="resource-actions">
				<h3>Resource actions</h3>

				<Table condensed>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{this.props.resource.actions.filter(action => (
							this.props.resource[action].description.url.indexOf(':'+name+'_id') === -1
						)).map(action => (
							<tr key={action}>
								<td>
									{/*
										Since we're linking to a resource action, not an instance action, we
										remove the id of the last resource, i.e. use all ids, except the last.
									*/}
									<LinkTo
										to={[
											path.join('.'),
											action,
											this.context.url_params.slice(0, path.length-1).join(',')
										]}>
										<ActionName action={action} />
									</LinkTo>
								</td>
								<td>{this.props.resource[action].description.description}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	},
});

ResourceActions.contextTypes = {
	url_params: React.PropTypes.array,
};

export default ResourceActions;
