import React from 'react'
import {Table} from 'react-bootstrap'
import ActionName from '../action/name'
import LinkTo from '../link'
import {resolveResource} from '../../utils'
import {filterActions} from '../../authorization'

var ResourceIndex = React.createClass({
	render: function () {
		var resource = resolveResource(
			this.context.api,
			this.props.params.resources,
		);

		return (
			<Table condensed>
				<thead>
					<tr>
						<th>Action</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{filterActions(
						this.props.authenticated,
						resource
					).filter(action => (
							resource[action].description.url.indexOf(':'+resource.getName()+'_id') === -1
					)).map(action => (
						<tr key={action}>
							<td>
								<LinkTo to={[this.props.params.resources, action]}>
									<ActionName action={action} />
								</LinkTo>
							</td>
							<td>{resource[action].description.description}</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	}
});

ResourceIndex.contextTypes = {
	api: React.PropTypes.object,
};

export default ResourceIndex;
