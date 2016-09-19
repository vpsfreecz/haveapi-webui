var React = require('react');
var Link = require('react-router').Link;
var Bs = require('react-bootstrap');
var Row = Bs.Row;
var Col = Bs.Col;
var Form = Bs.Form;
var FormGroup = Bs.FormGroup;
var ControlLabel = Bs.ControlLabel;
var FormControl = Bs.FormControl;
var Button = Bs.Button;

var ApiSelector = React.createClass({
	getInitialState: function () {
		return {
			//url: 'https://api.vpsfree.cz',
			url: 'http://192.168.122.11:4567',
		};
	},

	handleChange: function (e) {
		this.setState({url: e.target.value});
	},

	setUrl: function (e) {
		e.preventDefault();
		this.props.history.pushState(null, '/api/' + encodeURIComponent(this.state.url));
	},

	render: function () {
		return (
			<Row>
				<Col md={4} mdOffset={4}>
					<Form inline onSubmit={this.setUrl}>
						<FormGroup>
							<ControlLabel>API URL:</ControlLabel>
							<FormControl type="text" value={this.state.url} onChange={this.handleChange} />
						</FormGroup>
						<Button type="submit">Continue</Button>
					</Form>
				</Col>
			</Row>
		);
	}
});

module.exports = ApiSelector;
