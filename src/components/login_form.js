var React = require('react');

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			password: '',
		};
	},

	login: function (e) {
		e.preventDefault();

		console.log('login', this.state);

		var that = this;

		this.context.api.authenticate('token', {
			username: this.username.value,
			password: this.password.value,
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
			return <button className="logout" onClick={this.logout}>Logout</button>;

		} else return (
			<form className="login" onSubmit={this.login}>
				<input type="text" placeholder="Username" ref={(ref) => this.username = ref} />
				<input type="password" placeholder="Password" ref={(ref) => this.password = ref} />
				<input type="submit" value="Login" />
			</form>
		);
	}
});

LoginForm.contextTypes = {
	api: React.PropTypes.object,
};

module.exports = LoginForm;
