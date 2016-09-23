import React from 'react'
import {Link} from 'react-router';
import {Row, Col, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import Config from '../config'

export default React.createClass({
	getInitialState: function () {
		return {
			url: Config.defaultApiUrl || '',
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
