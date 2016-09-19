var React = require('react');
var HaveAPI = require('../haveapi-client');
var Bs = require('react-bootstrap');
var Row = Bs.Row;
var Col = Bs.Col;
var Navbar = Bs.Navbar;
var LoginForm = require('../containers/login_form');

import Config from '../config'
import {LinkTo} from '../utils'

var ApiPage = React.createClass({
	getInitialState: function () {
		return {
			resources: [],
			authenticated: false,
		};
	},

	getChildContext: function () {
		return {api: this.api};
	},

	componentDidMount: function () {
		this.api = new HaveAPI.Client(Config.api_url || this.props.params.url);
		var that = this;
		var token = sessionStorage.getItem('auth_token');

		if (token) {
			this.api.authenticate('token', {
				token: token,
			}, function () {
				that.setState({
					resources: that.api.resources,
					authenticated: true, // FIXME: token might be invalid
				});
			});

		} else {
			this.api.setup(function () {
				that.setState({
					resources: that.api.resources,
					authenticated: false,
				});
			});
		}
	},

	componentWillUpdate: function (nextProps, nextState) {
		console.log('api page will update', nextProps.authenticated, this.state.authenticated);

		if (nextProps.authenticated != this.state.authenticated) {
			console.log('new resources', this.api.resources);
			console.log(this.api);
			this.setState({
				resources: this.api.resources,
				authenticated: nextProps.authenticated,
			});
		}
	},

	render: function () {
		if (this.api) {
			return (
				<div className="api">
					<Navbar>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="#">{Config.api_url || this.props.params.url}</a>
							</Navbar.Brand>
						</Navbar.Header>
						<Navbar.Collapse>
							<Navbar.Form pullRight>
								<LoginForm />
							</Navbar.Form>
						</Navbar.Collapse>
					</Navbar>

					<Row>
						<Col md={2}>
							<div className="list">
								<ul>
									{this.state.resources.map(r => (
										<li key={r}>
											<LinkTo api={this.props.params.url} to={r}>{r}</LinkTo>
										</li>
									))}
								</ul>
							</div>
						</Col>
						<Col md={10}>
							<div className="resource">
								{this.props.children}
							</div>
						</Col>
					</Row>
				</div>
			);

		} else return <h2>Loading...</h2>;
	}
});

ApiPage.childContextTypes = {
	api: React.PropTypes.object,
};

module.exports = ApiPage;
