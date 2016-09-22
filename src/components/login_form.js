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

		var that = this;

		this.context.auth.authenticate(this.state.method, {
			username: this.state.username,
			password: this.state.password,
		}, function (c, status) {
			// TODO
			// Show error when failed
		});
	},

	logout: function (e) {
		var that = this;

		this.context.auth.logout(function (c, status) {
			// TODO
			// Show error when failed
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
	auth: React.PropTypes.object,
};

export default LoginForm;
