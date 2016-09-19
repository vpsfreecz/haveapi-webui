var React = require('react');
var Bs = require('react-bootstrap');
var FormGroup = Bs.FormGroup;
var FormControl = Bs.FormControl;
var Button = Bs.Button;

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			password: '',
		};
	},

	handleChange: function (e, field) {
		change = {}
		change[field] = e.target.value;

		this.setState(Object.assign({}, this.state, change));
	},

	login: function (e) {
		e.preventDefault();

		console.log('login', this.state, this.username, this.password);

		var that = this;

		this.context.api.authenticate('token', {
			username: this.state.username,
			password: this.state.password,
		}, function (c, status) {
			console.log('result: ', c, status);
			console.log(c.authProvider.token);

			if (status && c.authProvider.token) {
				sessionStorage.setItem('auth_token', c.authProvider.token);
				that.props.login();
			}
		});
	},

	logout: function (e) {
		var that = this;

		this.context.api.logout(function (c, status) {
			if (status) {
				sessionStorage.removeItem('auth_token');
				that.props.logout();
			}
		});
	},

	render: function () {
		if (this.props.authenticated) {
			return <Button className="logout" onClick={this.logout}>Logout</Button>;

		} else return (
			<form onSubmit={this.login}>
				<FormGroup>
					<FormControl type="text" placeholder="Username" onChange={e => this.handleChange(e, 'username')} />
					<FormControl type="password" placeholder="Password" onChange={e => this.handleChange(e, 'password')} />
					<Button type="submit">Login</Button>
				</FormGroup>
			</form>
		);
	}
});

LoginForm.contextTypes = {
	api: React.PropTypes.object,
};

module.exports = LoginForm;
