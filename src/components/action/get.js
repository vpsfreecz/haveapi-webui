import React from 'react'
import {LinkTo, linkTo} from '../../utils'
import ActionName from './name'
import Input from './input'
import Output from './output'

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

	redirect: function (params) {
		this.context.router.push({
			pathname: linkTo(
				this.context.api,
				this.props.params.resources,
				this.props.params.action,
				this.props.params.ids,
			),
			query: Object.assign({}, params, {_exec: 1}),
		});
	},

	execute: function (props, params) {
		console.log('call action!');

		var that = this;

		props.action.invoke(params, function (c, reply) {
			that.setState({response: reply});
		});
	},

	getParams: function (props) {
		if (!props)
			props = this.props;

		var params = Object.assign({}, props.location.query, {});
		delete params._exec;

		var desc = props.action.description.input.parameters;

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
		return (
			<div>
				<h2>Action <ActionName action={this.props.params.action} /></h2>
				<Input action={this.props.action} onSubmit={this.redirect} initialData={this.getParams()} />
				<Output action={this.props.action} response={this.state.response} />
			</div>
		);
	},
});

IndexAction.contextTypes = {
	api: React.PropTypes.object,
	router: React.PropTypes.object,
};

export default IndexAction;
