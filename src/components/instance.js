import React from 'react'
import {ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap'
import ResourceName from './resource/name'
import ResourceActions from '../containers/resource_actions'
import InstanceActions from '../containers/instance_actions'
import SubResources from '../containers/sub_resources'
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
				<ButtonGroup>
					<ResourceActions resource={this.state.response} ids={this.props.params.ids} />
					<InstanceActions resource={this.state.response} />
					<SubResources resource={this.state.response} ids={this.props.params.ids} />
				</ButtonGroup>

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
