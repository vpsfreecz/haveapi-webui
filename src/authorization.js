function sortResources (resources) {
	return resources.sort(function (a, b) {
		var aName = a.getName();
		var bName = b.getName();

		if (aName < bName)
			return -1;

		if (aName > bName)
			return 1;

		return 0;
	});
}

export function filterResources (auth, resources) {
	if (auth)
		return sortResources(resources);

	var ret = [];
	var that = this;

	resources.forEach(function (r) {
		var unauth = r.actions.find(function (a) {
			return !r[a].description.auth;
		});

		if (unauth)
			ret.push(r);
	});

	return sortResources(ret);
}

export function filterActions (auth, resource) {
	if (auth)
		return resource.actions.sort();

	return resource.actions.filter(a => !resource[a].description.auth).sort();
}
