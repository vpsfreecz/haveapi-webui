import React from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import ResourceName from './resource/name'
import {linkTo, resourcePath} from '../utils'
import {filterResources} from '../authorization'

var SubResources = React.createClass({
	setResource: function (r) {
		this.context.router.push(linkTo(
			this.context.api,
			resourcePath(r).join('.'),
			'index',
			this.props.ids,
		));
	},

	render: function () {
		var resources = filterResources(
			this.props.authenticated,
			this.props.resource.resources
		);

		if (!resources.length)
			return null;

		return (
			<DropdownButton
				id="subresources"
				title="Sub resources"
				className="subresources"
				onSelect={this.setResource}>
				{resources.map(r => (
					<MenuItem key={r.getName()} eventKey={r}>
						<ResourceName resource={r} />
					</MenuItem>
				))}
			</DropdownButton>
		);
	}
});

SubResources.contextTypes = {
	router: React.PropTypes.object,
	api: React.PropTypes.object,
};

export default SubResources;
