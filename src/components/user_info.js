import React from 'react'
import {Navbar} from 'react-bootstrap'
import {LinkTo} from '../utils'
import Config from '../config'

var UserInfo = React.createClass({
	getInitialState: function () {
		return {
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
				name: 'unknown',
			});
			return;
		}

		var that = this;
		var resource = this.context.api[Config.currentUser.resource];

		resource[Config.currentUser.action].invoke(function (c, user) {
			if (user.isOk()) {
				that.setState({
					name: that.getName(user),
				});
			}
		});
	},

	render: function () {
		if (this.state.name) {
			return (
				<Navbar.Text pullRight>
					Logged as
					{' '}
					{this.isConfigured() ? <LinkTo to={[Config.currentUser.resource, Config.currentUser.action]}>{this.state.name}</LinkTo> : this.state.name}
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
