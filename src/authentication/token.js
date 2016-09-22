export default class Token {
	constructor (api) {
		this.api = api;
	}

	authenticate (opts, callback) {
		var that = this;

		this.api.authenticate('token', Object.assign({}, opts, {
			lifetime: 'renewable_auto',
			interval: 300,
		}), function (c, status) {
			callback(c, status);
		});
	}

	logout (callback) {
		var that = this;

		this.api.logout(function (c, status) {
			callback(c, status);
		});
	}

	save () {
		return {
			token: this.api.authProvider.token,
		};
	}

	load (opts, callback) {
		var that = this;

		this.api.authenticate('token', {token: opts.token}, function (c, status) {
			callback(c, status);
		});
	}
}
