import React from 'react'
import {LinkTo} from '../utils'
import Input from './action/input'
import Output from './action/output'
import {resolveAction} from '../utils'

var Action = React.createClass({
	getInitialState: function () {
		return {
			response: null,
		};
	},

	componentWillReceiveProps: function () {
		this.setState({response: null});
	},

	getAction: function () {
		return resolveAction(
			this.context.api,
			this.props.params.resources,
			this.props.params.action,
			this.props.params.ids,
		);
	},

	execute: function (params) {
		console.log('call action!');
		var that = this;

		this.getAction().invoke(params, function (c, reply) {
			that.setState({response: reply});
		});
	},

	render: function () {
		var action = this.getAction();

		return (
			<div>
				<p>Action {this.props.params.action}</p>
				<Input action={action} onSubmit={this.execute} />
				<Output action={action} response={this.state.response} />
			</div>
		);
	},
});

Action.contextTypes = {
	api: React.PropTypes.object,
};

export default Action;
