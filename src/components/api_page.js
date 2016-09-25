import React from 'react'
import HaveAPI from '../haveapi-client'
import {Grid, Row, Col, Navbar} from 'react-bootstrap'
import LoginForm from '../containers/login_form'
import UserInfo from '../containers/user_info'
import ResourceName from './resource_name'
import Authentication from '../authentication'
import Config from '../config'
import Package from '../package'
import {LinkTo} from '../utils'

var ApiPage = React.createClass({
	getInitialState: function () {
		return {
			resources: [],
			authenticated: false,
		};
	},

	getChildContext: function () {
		return {
			api: this.api,
			auth: this.auth,
		};
	},

	componentDidMount: function () {
		this.api = new HaveAPI.Client(Config.apiUrl || this.props.params.url);
		this.auth = new Authentication(this.api, this.context.store);
		var that = this;

		this.auth.load(function (c, status) {
			if (status) {
				that.setState({
					resources: that.api.resources.map(r => r.getName()),
					authenticated: true,
				});
				return;
			}

			that.api.setup(function () {
				that.setState({
					resources: that.unauthenticatedResources(that.api.resources).map(r => r.getName()),
					authenticated: false,
				});
			});
		});
	},

	componentWillUpdate: function (nextProps, nextState) {
		console.log('api page will update', nextProps.authenticated, this.state.authenticated);

		if (nextProps.authenticated != this.state.authenticated) {
			this.setState({
				resources: (nextProps.authenticated ? this.api.resources : this.unauthenticatedResources(this.api.resources)).map(r => r.getName()),
				authenticated: nextProps.authenticated,
			});
		}
	},

	unauthenticatedResources: function (resources) {
		var ret = [];
		var that = this;

		resources.forEach(function (r) {
			var unauth = r.actions.find(function (a) {
				return !r[a].description.auth;
			});

			if (unauth)
				ret.push(r);
		});

		return ret;
	},

	render: function () {
		if (this.api) {
			var apiUrl = Config.apiUrl || this.props.params.url;

			return (
				<div className="api">
					<Navbar fluid>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="#">{apiUrl}</a>
							</Navbar.Brand>
						</Navbar.Header>
						<Navbar.Collapse>
							<Navbar.Form pullRight>
								<LoginForm />
							</Navbar.Form>
							<UserInfo />
						</Navbar.Collapse>
					</Navbar>

					<Grid fluid>
						<Row>
							<Col md={2}>
								<ul className="resource-list">
									{this.state.resources.map(r => (
										<li key={r} className={r == this.props.params.resource ? 'active' : ''}>
											<LinkTo to={r}>
												<ResourceName resource={this.api[r]} />
											</LinkTo>
										</li>
									))}
								</ul>
							</Col>
							<Col md={10}>
								<div className="resource">
									{this.props.children}
								</div>
							</Col>
						</Row>
					</Grid>
					<footer>
							<p>
								Connected to API server at <a href={apiUrl} target="_blank">{apiUrl}</a>.
								Powered by <a href={Package.repository}>HaveAPI WebUI</a> v{Package.version}.
							</p>
					</footer>
				</div>
			);

		} else return <h2>Loading...</h2>;
	}
});

ApiPage.childContextTypes = {
	api: React.PropTypes.object,
	auth: React.PropTypes.object,
};

ApiPage.contextTypes = {
	store: React.PropTypes.object,
};

export default ApiPage;
