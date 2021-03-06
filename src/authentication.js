import Basic from './authentication/basic'
import Token from './authentication/token'
import ActivityMonitor from './activity_monitor'

const supportedAuthMethods = [
	'token',
];

export default class Authentication {
	constructor (api, store) {
		this.api = api;
		this.store = store;
	}

	authenticate (method, opts, callback) {
		var that = this;

		this.username = opts.username;
		this.method = method;
		this.handler = this.getHandler(method);

		this.handler.authenticate(opts, function (c, status) {
			if (status) {
				that.loggedIn();
				that.save();
			}

			if (callback)
				callback(c, status);
		});
	}

	logout (callback) {
		var that = this;

		this.handler.logout(function (c, status) {
			if (status) {
				that.api.setup(function (c2, status2) {
					that.loggedOut();

					if (callback)
						callback(c2, status2);
				});

			} else if (callback)
				callback(c, status);
		});
	}

	save () {
		sessionStorage.setItem('authentication', JSON.stringify({
			username: this.username,
			method: this.method,
			opts: this.handler.save(),
		}));
	}

	load (callback) {
		var str = sessionStorage.getItem('authentication');

		if (!str)
			return callback(this.api, false);

		var data = JSON.parse(str);

		if (!data.method)
			return callback(this.api, false);

		var handler = this.getHandler(data.method);
		var that = this;

		this.username = data.username;
		this.method = data.method;

		handler.load(data.opts, function (c, status) {
			if (status) {
				that.handler = handler;
				that.loggedIn();
			}

			callback(c, status);
		});
	}

	forget () {
		sessionStorage.removeItem('authentication');
	}

	loggedIn () {
		this.store.dispatch({type: 'LOGIN', opts: {username: this.username}});
		this.monitor = new ActivityMonitor();
		this.monitor.startIdleTimer(this.logout.bind(this), 20*60*1000);
	}

	loggedOut () {
		this.forget();
		this.store.dispatch({type: 'LOGOUT'});

		if (this.monitor)
			this.monitor.stopIdleTimer();
	}

	getHandler (method) {
		var klass = {
			basic: Basic,
			token: Token,
		}[method];

		return new klass(this.api, {
			optsChanged: this.save.bind(this),
			loggedOut: this.loggedOut.bind(this),
		});
	}

	getAvailableMethods () {
		var auth = this.api._private.description.authentication;
		var ret = [];

		for (var name in auth) {
			if (!auth.hasOwnProperty(name))
				continue;

			ret.push({
				name: name,
				supported: supportedAuthMethods.indexOf(name) >= 0,
				desc: auth[name],
			});
		}

		return ret;
	}

	getSupportedMethods () {
		return this.getAvailableMethods().filter(m => m.supported);
	}
}
