import React from 'react'
import {LinkTo} from '../../utils'
import ActionName from './name'
import Input from './input'
import Output from './output'
import {resolveAction} from '../../utils'

var Action = React.createClass({
	getInitialState: function () {
		return {
			response: null,
			executing: false,
		};
	},

	componentWillReceiveProps: function () {
		this.setState({response: null});
	},

	execute: function (params) {
		console.log('call action!');
		this.setState({executing: true});

		var that = this;

		this.props.action.invoke(params, function (c, reply) {
			that.setState({
				response: reply,
				executing: false,
			});
		});
	},

	render: function () {
		return (
			<div>
				<h2>Action <ActionName action={this.props.params.action} /></h2>
				<Input
					action={this.props.action}
					onSubmit={this.execute}
					executing={this.state.executing} />
				<Output action={this.props.action} response={this.state.response} />
			</div>
		);
	},
});

Action.contextTypes = {
	api: React.PropTypes.object,
};

export default Action;
