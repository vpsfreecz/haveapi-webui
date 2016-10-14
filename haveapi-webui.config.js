module.exports = {
	// Specifying apiUrl will skip API selection page.
	// apiUrl: 'https://api.domain.tld',

	// Used if apiUrl is unset
	defaultApiUrl: 'https://api.domain.tld',

	// Select which history mechanism to use
	history: {
		// Hash history ensures that the app works from everywhere and does not
		// require any web server or additional configuration. It uses the part
		// of URL after the '#' sign.
		mode: 'hash',

		// Browser history uses browsers' HTML5 API, it looks like a normal URL, but
		// requires additional configuration of the web server. Generally, all paths
		// descending from `prefix` should return the same `index.html` file containing
		// the app, unless it is a static file.
		// mode: 'browser',

		// Use prefix if the app is not running at the web server's root, but in
		// a subdirectory. For browser history only.
		// prefix: '/',
	},

	// Define resource and action to get info about the currently logged
	// user. The action musn't have any URL parameters and has to return
	// a single object describing the user.
	//
	// username and full_name are functions that get one argument - the object
	// returned by the specified action and should return a string, which is later
	// shown in the UI.
	// currentUser: {
	// 	resource: 'user',
	//	action: 'current',
	//	username: user => (user.login),
	//	fullname: user => (user.full_name),
	// }
}
