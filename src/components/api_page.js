import React from 'react'
import HaveAPI from '../haveapi-client'
import {Row, Col, Navbar} from 'react-bootstrap'
import LoginForm from '../containers/login_form'
import UserInfo from '../containers/user_info'
import ResourceName from './resource_name'
import Authentication from '../authentication'
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
		return {
			api: this.api,
			auth: this.auth,
		};
	},

	componentDidMount: function () {
		this.api = new HaveAPI.Client(Config.api_url || this.props.params.url);
		this.auth = new Authentication(this.api, this.context.store);
		var that = this;

		this.auth.load(function (c, status) {
			if (status) {
				that.setState({
					resources: that.api.resources,
					authenticated: true,
				});
				return;
			}

			that.api.setup(function () {
				that.setState({
					resources: that.unauthenticatedResources(that.api.resources),
					authenticated: false,
				});
			});
		});
	},

	componentWillUpdate: function (nextProps, nextState) {
		console.log('api page will update', nextProps.authenticated, this.state.authenticated);

		if (nextProps.authenticated != this.state.authenticated) {
			console.log('new resources', this.api.resources);
			console.log(this.api);

			this.setState({
				resources: nextProps.authenticated ? this.api.resources : this.unauthenticatedResources(this.api.resources),
				authenticated: nextProps.authenticated,
			});
		}
	},

	unauthenticatedResources: function (resources) {
		var ret = [];
		var that = this;

		resources.forEach(function (r) {
			var rObj = that.api[r];
			var unauth = rObj.actions.find(function (a) {
				return !rObj[a].description.auth;
			});

			if (unauth)
				ret.push(r);
		});

		return ret;
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
							<UserInfo />
						</Navbar.Collapse>
					</Navbar>

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
