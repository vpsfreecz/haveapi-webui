export default class Token {
	constructor (api, callbacks) {
		this.api = api;
		this.callbacks = callbacks;
	}

	authenticate (opts, callback) {
		this._authenticate(Object.assign({}, opts, {
			lifetime: 'renewable_manual',
			interval: 300,
		}), callback);
	}

	logout (callback) {
		var that = this;

		this.api.logout(function (c, status) {
			if (status)
				that.stopWatchdog();

			callback(c, status);
		});
	}

	loggedOut () {
		this.callbacks.loggedOut();
	}

	save () {
		return {
			token: this.api.authProvider.token,
			validTo: this.api.authProvider.validTo,
		};
	}

	load (opts, callback) {
		var expiration = new Date(opts.validTo);

		if (expiration < Date.now())
			return callback(this.api, false);

		this._authenticate({
			token: opts.token,
			validTo: opts.validTo,
		}, callback);
	}

	startWatchdog () {
		console.log('token expires at', this.api.authProvider.validTo);

		var that = this;
		var now = Date.now();
		var expiration = new Date(this.api.authProvider.validTo);
		var delta = expiration - now;

		if (expiration < now) {
			console.log('the token is expired');
			this.loggedOut();
			return;
		}

		this.timeout = setTimeout(function () {
			console.log('renewing token');

			that.api.authProvider.renewToken(function (c, status) {
				if (status) {
					console.log('token renewed', that.api.authProvider.validTo);
					that.callbacks.optsChanged();
					that.startWatchdog();
					return;
				}

				console.log('failed to renew the token');

				setTimeout(that.loggedOut.bind(that), expiration - Date.now());
			});

		}, delta - 30*1000);
	}

	stopWatchdog () {
		if (this.timeout)
			clearTimeout(this.timeout);
	}

	_authenticate (opts, callback) {
		var that = this;

		this.api.authenticate('token', opts, function (c, status) {
			if (status)
				that.startWatchdog();

			callback(c, status);
		});
	}
}
