import React from 'react'
import {FormGroup, FormControl, Button} from 'react-bootstrap'

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			method: 'token',
			username: '',
			password: '',
		};
	},

	handleChange: function (e, field) {
		var change = {}
		change[field] = e.target.value;

		this.setState(Object.assign({}, this.state, change));
	},

	login: function (e) {
		e.preventDefault();

		console.log('login', this.state);

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
					<FormControl
						type="text"
						placeholder="Username"
						value={this.state.username}
						onChange={e => this.handleChange(e, 'username')} />
					<FormControl
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={e => this.handleChange(e, 'password')} />
					<FormControl
						componentClass="select"
						value={this.state.method}
						onChange={e => this.handleChange(e, 'method')}>
						{Object.keys(this.context.api._private.description.authentication).map(auth => (
							<option key={auth}>{auth}</option>
						))}
					</FormControl>
					<Button type="submit">Login</Button>
				</FormGroup>
			</form>
		);
	}
});

LoginForm.contextTypes = {
	api: React.PropTypes.object,
};

export default LoginForm;
