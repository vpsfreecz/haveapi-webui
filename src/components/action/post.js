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
		};
	},

	componentWillReceiveProps: function () {
		this.setState({response: null});
	},

	execute: function (params) {
		console.log('call action!');
		var that = this;

		this.props.action.invoke(params, function (c, reply) {
			that.setState({response: reply});
		});
	},

	render: function () {
		return (
			<div>
				<p>Action <ActionName action={this.props.params.action} /></p>
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
