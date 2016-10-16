import React from 'react'
import {
	Grid,
	Row,
	Col,
	Jumbotron,
	Form,
	InputGroup,
	FormControl,
	Button
} from 'react-bootstrap'
import Config from '../../config'

var ApiSelector = React.createClass({
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
		this.context.router.push('/' + encodeURIComponent(this.state.url));
	},

	render: function () {
		return (
			<Grid>
				<Row>
					<Col md={12}>
						<Jumbotron className="api-selector">
							<h1>HaveAPI WebUI</h1>
							<p>
								<a href="https://github.com/vpsfreecz/haveapi-webui">haveapi-webui</a>{' '}
								is a web user interface for all{' '}
								<a href="https://github.com/vpsfreecz/haveapi">HaveAPI-based</a> APIs.{' '}
								Enter URL address of any such API to connect to it.
							</p>

							<Form onSubmit={this.setUrl}>
								<InputGroup bsSize="large">
									<FormControl type="text" value={this.state.url} onChange={this.handleChange} />
									<InputGroup.Button>
										<Button type="submit">Connect</Button>
									</InputGroup.Button>
								</InputGroup>
							</Form>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		);
	}
});

ApiSelector.contextTypes = {
	router: React.PropTypes.object,
};

export default ApiSelector;
