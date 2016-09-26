import React from 'react'
import ResourceName from './resource_name'
import InstanceActions from './instance_actions'
import SubResources from './sub_resources'
import Output from './action/output'
import {resolveAction} from '../utils'

var Instance = React.createClass({
	getInitialState: function () {
		return {
			action: null,
			response: null,
		};
	},

	componentDidMount: function () {
		this.fetch(this.props);
	},

	componentWillReceiveProps: function (nextProps) {
		this.fetch(nextProps);
	},

	fetch: function (props) {
		var that = this;
		var action = resolveAction(
			this.context.api,
			props.params.resources,
			'show',
			props.params.ids,
		);

		action.invoke(function (c, reply) {
			that.setState({
				action: action,
				response: reply,
			});
		});
	},

	render: function () {
		if (!this.state.response)
			return <p>Fetching...</p>;

		return (
			<div className="resource-instance">
				<h2><ResourceName resource={this.state.response} /> #{this.state.response.id}</h2>
				<InstanceActions resource={this.state.response} />
				<SubResources resource={this.state.response} ids={this.props.params.ids} />

				{this.props.children || <Output action={this.state.action} response={this.state.response} />}
			</div>
		);
	}
});

Instance.childContextTypes = {
	url_params: React.PropTypes.array,
};

Instance.contextTypes = {
	api: React.PropTypes.object,
};

export default Instance;
