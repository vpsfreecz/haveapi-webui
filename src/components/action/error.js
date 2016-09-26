import React from 'react'
import {Alert} from 'react-bootstrap'

export default React.createClass({
	renderErrors: function (response) {
		var ret = [];
		var errors = response.envelope.errors;
		var desc = response.action.description.input.parameters;

		for (var p in errors) {
			if (!errors.hasOwnProperty(p))
				continue;

			ret.push(
				<li key={p}>
					<strong>{desc[p].label || p}:</strong>
					{' '}
					{errors[p].join('; ')}
				</li>
			);
		}

		return <ul className="error-list">{ret}</ul>;
	},

	render: function () {
		var response;

		if (this.props.response.apiResponse)
			response = this.props.response.apiResponse();

		else
			response = this.props.response;

		return (
			<Alert bsStyle="warning">
				<strong>Action failed:</strong> {response.message()}
				{response.envelope.errors && this.renderErrors(response)}
			</Alert>
		);
	}
});
