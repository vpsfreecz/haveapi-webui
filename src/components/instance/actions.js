import React from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'
import ActionName from '../action/name'
import {linkTo, resourcePath} from '../../utils'
import {filterActions} from '../../authorization'

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
		var name = this.props.resource.getName();
		var actions = filterActions(
			this.props.authenticated,
			this.props.resource
		).filter(a => (
			a != 'show' && this.props.resource[a].description.url.indexOf(':'+name+'_id') >= 0
		));

		if (!actions.length)
			return null;

		return (
			<DropdownButton
				id="instance-action"
				title="Instance actions"
				className="instance-actions"
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

InstanceActions.contextTypes = {
	router: React.PropTypes.object,
	api: React.PropTypes.object,
	url_params: React.PropTypes.array,
};

export default InstanceActions;
