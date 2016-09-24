import React from 'react'
import {Col, Form, Button} from 'react-bootstrap'
import InputParameter from './input_parameter'

export default React.createClass({
	getInitialState: function () {
		return {};
	},

	handleChange: function (param, value) {
		var state = {};
		state[param] = value;

		console.log('input param reported changed', param, value);

		this.setState(Object.assign({}, this.state, state));
	},

	submit: function (e) {
		e.preventDefault();

		console.log('submited with', this.state);

		var params = {};

		for (var p in this.state) {
			if (!this.state.hasOwnProperty(p))
				continue;

			if (this.state[p] === '' || this.state[p] === null || this.state[p] === undefined)
				continue;

			params[p] = this.state[p];
		}

		console.log('filtered to', params);

		this.props.onSubmit(params);
	},

	render: function () {
		var params = this.props.action.description.input.parameters;

		return (
			<Form horizontal onSubmit={this.submit}>
				{Object.keys(params).map(p => (
					<InputParameter
						key={p}
						name={p}
						desc={params[p]}
						onChange={this.handleChange.bind(this, p)} />
				))}
				<Col sm={10} smOffset={2}>
					<Button type="submit">Execute</Button>
				</Col>
			</Form>
		);
	},
});
