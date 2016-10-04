import React from 'react'
import {Alert} from 'react-bootstrap'
import HaveAPI from '../../haveapi-client'
import {Grid, Row, Col, Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import LoginForm from '../../containers/login_form'
import UserInfo from '../../containers/user_info'
import ResourceName from '../resource/name'
import Authentication from '../../authentication'
import Config from '../../config'
import Package from '../../package'
import {LinkTo} from '../../utils'
import {filterResources} from '../../authorization'

var ApiPage = React.createClass({
	getInitialState: function () {
		return {
			setup: false,
			resources: [],
			authenticated: false,
		};
	},

	getChildContext: function () {
		return {
			auth: this.auth,
		};
	},

	componentDidMount: function () {
		this.auth = new Authentication(this.context.api, this.context.store);
		var that = this;

		this.auth.load(function (c, status) {
			if (status) {
				that.setState({
					setup: true,
					resources: that.context.api.resources.map(r => r.getName()),
					authenticated: true,
				});
				return;
			}

			that.context.api.setup(function (c, status) {
				if (!status) {
					that.setState({error: 'unable to fetch API description'});
					return;
				}

				that.setState({
					setup: true,
					resources: filterResources(
						false,
						that.context.api.resources
					).map(r => r.getName()),
					authenticated: false,
				});
			});
		});
	},

	componentWillUpdate: function (nextProps, nextState) {
		console.log('api page will update', nextProps.authenticated, this.state.authenticated);

		if (nextProps.authenticated != this.state.authenticated) {
			this.setState({
				setup: true,
				resources: filterResources(
					nextProps.authenticated,
					this.context.api.resources
				).map(r => r.getName()),
				authenticated: nextProps.authenticated,
			});

			if (!nextProps.authenticated)
				this.context.router.replace('/');
		}
	},

	setVersion: function (v, event) {
		this.context.router.push('/'+v);
	},

	render: function () {
		if (this.state.setup) {
			var apiUrl = Config.apiUrl || this.props.params.url;

			return (
				<div className="api">
					<Navbar fluid>
						<Navbar.Header>
							<Navbar.Brand>
								<LinkTo to={''} className="navbar-brand">{apiUrl}</LinkTo>
							</Navbar.Brand>
						</Navbar.Header>
						{this.context.api._private.versions.length > 1 && (
							<Nav>
								<NavDropdown
									title={'v'+this.context.api._private.currentVersion}
									id="version-dropdown"
									onSelect={this.setVersion}>
									{this.context.api._private.versions.filter(
										v => v != this.context.api._private.currentVersion
									).map(v => (
										<MenuItem eventKey={v} key={v}>{v}</MenuItem>
									))}
								</NavDropdown>
							</Nav>
						)}
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
												<ResourceName resource={this.context.api[r]} />
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

		} else if (this.state.error) {
			return (
				<Alert bsStyle="warning">
					<strong>Setup failed:</strong>
					{' '}
					{this.state.error}
				</Alert>
			);

		} else return <h2>Loading...</h2>;
	}
});

ApiPage.childContextTypes = {
	auth: React.PropTypes.object,
};

ApiPage.contextTypes = {
	router: React.PropTypes.object,
	store: React.PropTypes.object,
	api: React.PropTypes.object,
};

export default ApiPage;
