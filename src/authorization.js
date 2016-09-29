export function filterResources (auth, resources) {
	if (auth)
		return resources;

	var ret = [];
	var that = this;

	resources.forEach(function (r) {
		var unauth = r.actions.find(function (a) {
			return !r[a].description.auth;
		});

		if (unauth)
			ret.push(r);
	});

	return ret;
}

export function filterActions (auth, resource) {
	if (auth)
		return resource.actions;

	return resource.actions.filter(a => !resource[a].description.auth);
}
