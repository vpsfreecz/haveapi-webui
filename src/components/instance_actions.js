import React from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import ActionName from './action/name'
import {linkTo, resourcePath} from '../utils'

var InstanceActions = React.createClass({
	setAction: function (action) {
		var path = resourcePath(this.props.resource);

		this.context.router.push(linkTo(
			this.context.api,
			path.join('.'),
			'show',
			this.context.url_params.join(','),
			action,
		));
	},

	render: function () {
		var name = this.props.resource._private.name;

		return (
			<DropdownButton
				id="instance-action"
				title="Instance actions"
				className="instance-actions"
				onSelect={this.setAction}>
				{this.props.resource.actions.filter(action => (
					action != 'show' && this.props.resource[action].description.url.indexOf(':'+name+'_id') >= 0
				)).map(action => (
					<MenuItem key={action} eventKey={action}>
						<ActionName action={action} />
					</MenuItem>
				))}
			</DropdownButton>
		);
	},
});

InstanceActions.contextTypes = {
	router: React.PropTypes.object,
	api: React.PropTypes.object,
	url_params: React.PropTypes.array,
};

export default InstanceActions;
