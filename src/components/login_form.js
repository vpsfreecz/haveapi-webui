import React from 'react'
import {FormGroup, FormControl, Button} from 'react-bootstrap'

var LoginForm = React.createClass({
	getInitialState: function () {
		var methods = this.context.auth.getSupportedMethods();

		return {
			method: methods.length ? methods[0].name : '',
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
			if (status) {
				that.setState(Object.assign({}, that.state, {
					username: '',
					password: '',
				}));

			} else {
				that.setState(Object.assign({}, that.state, {
					password: '',
					error: true,
				}));
			}
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
		if (this.props.authenticated)
			return <Button className="logout" onClick={this.logout}>Logout</Button>;

		var methods = this.context.auth.getSupportedMethods();

		if (!methods.length)
			return null;

		return (
			<form onSubmit={this.login}>
				<FormGroup validationState={this.state.error ? 'error' : undefined}>
					<FormControl
						type="text"
						placeholder="Username"
						value={this.state.username}
						onChange={e => this.handleChange(e, 'username')} />
					{' '}
					<FormControl
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={e => this.handleChange(e, 'password')} />
				</FormGroup>

				{methods.length > 1 && (
					<FormGroup>
						{' '}
						<FormControl
							componentClass="select"
							value={this.state.method}
							onChange={e => this.handleChange(e, 'method')}>
							{methods.map(auth => (
								<option key={auth.name}>{auth.name}</option>
							))}
						</FormControl>
					</FormGroup>
				)}
				{' '}
				<Button type="submit">Login</Button>
			</form>
		);
	}
});

LoginForm.contextTypes = {
	api: React.PropTypes.object,
	auth: React.PropTypes.object,
};

export default LoginForm;
