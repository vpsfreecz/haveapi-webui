import React from 'react'
import {Navbar} from 'react-bootstrap'
import {LinkTo} from '../utils'
import Config from '../config'

var UserInfo = React.createClass({
	getInitialState: function () {
		return {
			id: null,
			name: null,
		};
	},

	componentDidMount: function () {
		if (this.props.authenticated) {
			this.fetchInfo();
		}
	},

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.authenticated && !this.state.name) {
			this.fetchInfo();

		} else if (!nextProps.authenticated && this.state.name) {
			this.setState(this.getInitialState());
		}
	},

	isConfigured: function () {
		if (!Config.currentUser)
			return false;

		return Config.currentUser.resource && Config.currentUser.action && true;
	},

	resolveAttr: function (user, name) {
		if (!Config.currentUser[name])
			return null;

		return Config.currentUser[name](user);
	},

	getName: function (user) {
		return this.resolveAttr(user, 'fullname') || this.resolveAttr(user, 'username');
	},

	fetchInfo: function () {
		if (!this.isConfigured()) {
			this.setState({
				id: null,
				name: this.props.username,
			});
			return;
		}

		var that = this;
		var resource = this.context.api[Config.currentUser.resource];

		resource[Config.currentUser.action].invoke(function (c, user) {
			if (user.isOk()) {
				that.setState({
					id: user.id,
					name: that.getName(user),
				});
			}
		});
	},

	render: function () {
		if (this.state.name) {
			var link = null;

			if (this.state.id && this.context.api[Config.currentUser.resource].show) {
				link = [Config.currentUser.resource, 'show', this.state.id];

			} else if (this.isConfigured()) {
				link = [Config.currentUser.resource, Config.currentUser.action];
			}

			return (
				<Navbar.Text pullRight>
					Logged as
					{' '}
					{link ? <LinkTo to={link}>{this.state.name}</LinkTo> : this.state.name}
	      </Navbar.Text>
			);
		}

		return null;
	}
});

UserInfo.contextTypes = {
	api: React.PropTypes.object,
};

export default UserInfo;
