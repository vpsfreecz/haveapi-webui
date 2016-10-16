import React from 'react'
import {Table, Glyphicon} from 'react-bootstrap'
import ResourceName from './resource/name'
import LinkTo from './link'
import {resourcePath} from '../utils'
import {filterResources} from '../authorization'

var VersionIndex = React.createClass({
	render: function () {
		var resources = filterResources(
			this.props.authenticated,
			this.context.api.resources
		);

		return (
			<div className="version-index">
				<h1>API version {this.context.api._private.currentVersion}</h1>
				<h2>Authentication methods</h2>
				<Table condensed>
					<thead>
						<tr>
							<th>Method</th>
							<th>Supported</th>
						</tr>
					</thead>
					<tbody>
						{this.context.auth.getAvailableMethods().map(m => (
							<tr key={m.name}>
								<td>{m.name}</td>
								<td>
									<Glyphicon
										glyph={m.supported ? 'ok-circle' : 'ban-circle'}
										title={m.supported ? 'Supported' : 'Not supported'} />
								</td>
							</tr>
						))}
					</tbody>
				</Table>

				<h2>Resources</h2>
				<Table condensed>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{resources.map(r => (
							<tr key={r.getName()}>
								<td>
									<LinkTo to={resourcePath(r).join('.')}>
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

VersionIndex.contextTypes = {
	api: React.PropTypes.object,
	auth: React.PropTypes.object,
};

export default VersionIndex;
