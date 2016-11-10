import React from 'react'
import {Table, ProgressBar} from 'react-bootstrap'

var ActionStates = React.createClass({
	componentDidMount: function () {
		this.fetchStates();
	},

	componentWillUnmount: function () {
		clearTimeout(this.timeout);
	},

	fetchStates: function () {
		var that = this;

		this.context.api.action_state.index(function (c, reply) {
			var newStates = reply.response();

			if (that.statesChanged(newStates)) {
				that.lastStates = newStates;
				that.props.setActionStates(newStates);
			}

			that.timeout = setTimeout(that.fetchStates, 3000);
		});
	},

	statesChanged: function (newStates) {
		if (!this.lastStates)
			this.lastStates = [];

		if (this.lastStates.length != newStates.length)
			return true;

		for (var i = 0; i < newStates.length; i++) {
			var s1 = this.lastStates[i];
			var s2 = newStates[i];

			if (s1.id != s2.id)
				return true;

			if (s1.current != s2.current || s1.total != s2.total || s1.status != s2.status)
				return true;
		}

		return false;
	},

	render: function () {
		return (
			<Table striped condensed hover className="action-states">
				<thead>
					<tr>
						<th className="created-at">Started at</th>
						<th className="action">Action</th>
						<th className="state">State</th>
						<th className="progress-col">Progress</th>
					</tr>
				</thead>
				<tbody>
					{this.props.actionStates.map(state => (
						<tr key={state.id}>
							<td>{new Date(state.created_at).toLocaleString()}</td>
							<td>{state.label}</td>
							<td>{state.status ? 'Executing' : 'Failing'}</td>
							<td>
								<ProgressBar
									min={0}
									max={state.total}
									now={state.current}
									label={state.current +"/"+ state.total +" "+ state.unit} />
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		);
	}
});

ActionStates.contextTypes = {
	store: React.PropTypes.object,
	api: React.PropTypes.object,
};

export default ActionStates;
