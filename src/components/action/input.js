import React from 'react'
import {Col, Form, FormGroup, Button} from 'react-bootstrap'
import InputParameter from './input/parameter'

export default React.createClass({
	getInitialState: function () {
		return this.props.initialData || {};
	},

	componentDidMount: function () {
		if (this.props.initialData)
			this.setState(this.props.initialData);
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.initialData)
			this.setState(nextProps.initialData);
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
			var v = this.state[p];

			if (!this.state.hasOwnProperty(p))
				continue;

			if (v === '' || v === null || v === undefined)
				continue;

			params[p] = v;
		}

		console.log('filtered to', params);

		this.props.onSubmit(params);
	},

	render: function () {
		var params = {};

		if (this.props.action.description.input)
			params = this.props.action.description.input.parameters;

		return (
			<Form horizontal onSubmit={this.submit}>
				{Object.keys(params).map(p => (
					<InputParameter
						key={p}
						name={p}
						desc={params[p]}
						initialValue={this.state[p] === undefined ? '' : this.state[p]}
						errors={this.props.errors[p]}
						onChange={this.handleChange.bind(this, p)} />
				))}
				<FormGroup>
					<Col sm={10} smOffset={2}>
						{this.props.executing ? (
							<Button type="submit" disabled>Executing...</Button>
						) : (
							<Button type="submit">Execute</Button>
						)}
					</Col>
				</FormGroup>
			</Form>
		);
	},
});
