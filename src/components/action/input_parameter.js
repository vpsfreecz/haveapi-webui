import React from 'react'
import {Col, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'

export default React.createClass({
	getInitialState: function () {
		return {
			value: null,
		}
	},

	fieldForParam: function () {
		var def = this.props.desc.default || '';
		var val = this.state.value || '';

		switch (this.props.desc.type) {
			case 'String':
				return <FormControl type="text" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Datetime':
				return <FormControl type="datetime" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Integer':
			case 'Float':
				return <FormControl type="number" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Text':
			case 'Custom':
				return <FormControl componentClass="textarea" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Resource':
				return <FormControl type="number" placeholder={def} value={val} onChange={this.handleChange} />;
				return (
					<FormControl componentClass="select">
						<option>{/* TODO */}</option>
					</FormControl>
				);

			default:
				return <FormControl type="text" placeholder={def} value={val} onChange={this.handleChange} />;
		}
	},

	handleChange: function (event) {
		console.log('param change', event.target.value);

		var v = event.target.value;
		this.setState({value: v});
		this.props.onChange(v);
	},

	render: function () {
		return (
			<FormGroup>
				<Col componentClass={ControlLabel} sm={2}>
					{this.props.desc.label || this.props.name}:
				</Col>
				<Col sm={10}>
					{this.fieldForParam()}
					<HelpBlock>{this.props.desc.description || ''}</HelpBlock>
				</Col>
			</FormGroup>
		);
	}
});
