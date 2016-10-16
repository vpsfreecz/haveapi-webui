import React from 'react'
import GetAction from './action/get'
import PostAction from './action/post'
import {resolveAction} from '../utils'

var Action = React.createClass({
	getAction: function () {
		return resolveAction(
			this.context.api,
			this.props.params.resources,
			this.props.params.action,
			this.props.params.ids,
		);
	},

	render: function () {
		var action = this.getAction();

		switch (action.httpMethod()) {
			case 'GET':
				return <GetAction action={action} {...this.props} />;

			default:
				return <PostAction action={action} {...this.props} />;
		}
	},
});

Action.contextTypes = {
	api: React.PropTypes.object,
};

export default Action;
