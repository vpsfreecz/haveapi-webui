import React from 'react'
import Output from './action/output'

var Instance = React.createClass({
	getInitialState: function () {
		return {
			action: null,
			response: null,
		};
	},

	componentDidMount: function () {
		this.fetch(this.context.api[this.props.params.resource].show, this.props.params.id);
	},

	componentWillReceiveProps: function (nextProps) {
		this.fetch(this.context.api[nextProps.params.resource].show, nextProps.params.id);
	},

	fetch: function (action, id) {
		var that = this;

		action.invoke(id, function (c, reply) {
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
				<Output action={this.state.action} response={this.state.response} />
			</div>
		);
	}
});

Instance.contextTypes = {
	api: React.PropTypes.object,
};

export default Instance;
