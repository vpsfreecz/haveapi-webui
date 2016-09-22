import Basic from './authentication/basic'
import Token from './authentication/token'

export default class Authentication {
	constructor (api, store) {
		this.api = api;
		this.store = store;
	}

	authenticate (method, opts, callback) {
		var that = this;

		this.method = method;
		this.handler = this.getHandler(method);

		this.handler.authenticate(opts, function (c, status) {
			that.loggedIn();
			that.save();

			if (callback)
				callback(c, status);
		});
	}

	logout (callback) {
		var that = this;

		this.handler.logout(function (c, status) {
			if (status) {
				that.api.setup(function (c2, status2) {
					console.log('setup after logout', status2, c2.resources);
					that.loggedOut();
					callback(c2, status2);
				});

			} else if (callback)
				callback(c, status);
		});
	}

	save () {
		sessionStorage.setItem('authentication', JSON.stringify({
			method: this.method,
			opts: this.handler.save(),
		}));
	}

	load (callback) {
		var str = sessionStorage.getItem('authentication');

		if (!str)
			return callback(this.api, false);

		var data = JSON.parse(str);
		var handler = this.getHandler(data.method);
		var that = this;

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
		this.store.dispatch({type: 'LOGIN'});
	}

	loggedOut () {
		this.forget();
		this.store.dispatch({type: 'LOGOUT'});
	}

	getHandler (method) {
		var klass = {
			basic: Basic,
			token: Token,
		}[method];

		return new klass(this.api);
	}
}
