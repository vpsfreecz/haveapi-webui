import React from 'react'
import {Table} from 'react-bootstrap'
import ActionName from './action/name'
import {LinkTo, resourcePath} from '../utils'

var InstanceActions = React.createClass({
	render: function () {
		var name = this.props.resource._private.name;
		var path = resourcePath(this.props.resource);

		return (
			<div className="instance-actions">
				<h3>Instance actions</h3>

				<Table condensed>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{this.props.resource.actions.filter(action => (
							action != 'show' && this.props.resource[action].description.url.indexOf(':'+name+'_id') >= 0
						)).map(action => (
							<tr key={action}>
								<td>
									<LinkTo to={[path.join('.'), action, this.context.url_params.join(',')]}>
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

InstanceActions.contextTypes = {
	url_params: React.PropTypes.array,
};

export default InstanceActions;
