import React from 'react'
import {LinkTo, linkTo} from '../utils'
import Input from './action/input'
import Output from './action/output'
import {resolveAction, resourcePath} from '../utils'

var IndexAction = React.createClass({
	getInitialState: function () {
		return {
			response: null,
		};
	},

	componentDidMount: function () {
		if (this.props.location.query._exec === '1')
			this.execute(this.props, this.getParams());
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({response: null});

		if (nextProps.location.query._exec === '1')
			this.execute(nextProps, this.getParams(nextProps));
	},

	getAction: function (props) {
		return resolveAction(
			this.context.api,
			props.params.resources,
			'index',
			props.params.ids,
		);
	},

	redirect: function (params) {
		this.context.router.push({
			pathname: linkTo(
				this.context.api,
				this.props.params.resources,
				'index',
				this.props.params.ids,
			),
			query: Object.assign({}, params, {_exec: 1}),
		});
	},

	execute: function (props, params) {
		console.log('call action!');

		var that = this;

		this.getAction(props).invoke(params, function (c, reply) {
			that.setState({response: reply});
		});
	},

	getParams: function (props) {
		if (!props)
			props = this.props;

		var params = Object.assign({}, props.location.query, {});
		delete params._exec;

		var desc = this.getAction(props).description.input.parameters;

		for (var p in params) {
			if (!params.hasOwnProperty(p))
				continue;

			var v = params[p];

			switch (desc[p].type) {
				case 'Boolean':
					if (v === 'true')
						params[p] = true;

					else if (v === 'false')
						params[p] = false;

					else
						continue;

					break;

				default:
					continue;
			}
		}

		return params;
	},

	render: function () {
		var action = this.getAction(this.props);

		return (
			<div>
				<p>Action Index</p>
				<Input action={action} onSubmit={this.redirect} initialData={this.getParams()} />
				<Output action={action} response={this.state.response} />
			</div>
		);
	},
});

IndexAction.contextTypes = {
	api: React.PropTypes.object,
	router: React.PropTypes.object,
};

export default IndexAction;
