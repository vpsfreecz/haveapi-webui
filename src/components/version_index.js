import React from 'react'
import {Table, Glyphicon} from 'react-bootstrap'
import ResourceName from './resource/name'
import {LinkTo, resourcePath} from '../utils'

var VersionIndex = React.createClass({
	unauthenticatedResources: function (resources) {
		var ret = [];
		var that = this;

		resources.forEach(function (r) {
			var unauth = r.actions.find(function (a) {
				return !r[a].description.auth;
			});

			if (unauth)
				ret.push(r);
		});

		return ret;
	},

	render: function () {
		var resources;

		if (this.props.authenticated)
			resources = this.context.api.resources;

		else
			resources = this.unauthenticatedResources(this.context.api.resources);

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
