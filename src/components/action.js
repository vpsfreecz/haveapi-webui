import React from 'react'
import {LinkTo} from '../utils'
import Input from './action/input'
import Output from './action/output'

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
		var resource = this.context.api[this.props.params.resource];
		var action = resource[ this.props.params.action ];
		var that = this;

		action.invoke(params, function (c, reply) {
			that.setState({response: reply});
		});
	},

	render: function () {
		var resource = this.context.api[this.props.params.resource];
		var action = resource[ this.props.params.action ];

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
