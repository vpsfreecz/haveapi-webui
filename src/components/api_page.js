var React = require('react');
var Link = require('react-router').Link;
var HaveAPI = require('../haveapi-client');
var LoginForm = require('../containers/login_form');

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
		this.api = new HaveAPI.Client(this.props.params.url);
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
					<LoginForm />
					<div className="list">
						<h2>{this.props.params.url}</h2>
						<ul>
							{this.state.resources.map(r => (
								<li key={r}>
									<Link to={'/api/'+encodeURIComponent(this.props.params.url)+'/'+r}>{r}</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="resource">
						{this.props.children}
					</div>
				</div>
			);

		} else return <h2>Loading...</h2>;
	}
});

ApiPage.childContextTypes = {
	api: React.PropTypes.object,
};

module.exports = ApiPage;
