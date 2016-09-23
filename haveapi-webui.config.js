export default {
	// Specifying api_url will skip API selection page.
	//api_url: 'https://api.domain.tld',

	// Used if api_url is unset
	default_api_url: 'https://api.domain.tld',

	// Define resource and action to get info about the currently logged
	// user. The action musn't have any URL parameters and has to return
	// a single object describing the user.
	//
	// username and full_name are functions that get one argument - the object
	// returned by the specified action and should return a string, which is later
	// shown in the UI.
	// currentUser: {
	// resource: 'user',
	// action: 'current',
	//	username: user => (user.login),
	//	fullname: user => (user.full_name),
	// }
}
