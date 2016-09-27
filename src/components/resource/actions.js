import React from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import ActionName from '../action/name'
import {linkTo, resourcePath} from '../../utils'

var ResourceActions = React.createClass({
	setAction: function (action) {
		var path = resourcePath(this.props.resource);

		// Since we're linking to a resource action, not an instance action, we
		// remove the id of the last resource, i.e. use all ids, except the last.
		this.context.router.push(linkTo(
			this.context.api,
			path.join('.'),
			action,
			this.context.url_params.slice(0, path.length-1).join(',')
		));
	},

	render: function () {
		var name = this.props.resource.getName();
		var actions = this.props.resource.actions.filter(a => (
			this.props.resource[a].description.url.indexOf(':'+name+'_id') === -1
		));

		if (!actions.length)
			return null;

		return (
			<DropdownButton
				id="resource-action"
				title="Resource actions"
				className="resource-actions"
				onSelect={this.setAction}>
				{actions.map(action => (
					<MenuItem key={action} eventKey={action}>
						<ActionName action={action} />
					</MenuItem>
				))}
			</DropdownButton>
		);
	},
});

ResourceActions.contextTypes = {
	router: React.PropTypes.object,
	api: React.PropTypes.object,
	url_params: React.PropTypes.array,
};

export default ResourceActions;
