export default class Basic {
	constructor (api) {
		this.api = api;
	}

	authenticate (opts, callback) {
		this.opts = opts;
		this.api.authenticate('basic', this.opts, callback);
	}

	logout (callback) {
		callback(this.api, true);
	}

	save () {
		return this.opts;
	}

	load (opts, callback) {
		this.opts = opts;
		this.api.authenticate('basic', this.opts, callback);
	}
}
