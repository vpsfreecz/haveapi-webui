import path from 'path'
import React from 'react'
import Config from './config'

export function linkTo (api, ...args) {
	var ret = [];

	if (!Config.apiUrl && api)
		ret.push(encodeURIComponent(api._private.url));

	ret.push(api._private.currentVersion);

	var prefix = '/';

	if (Config.history.mode == 'browser' && Config.history.prefix)
		prefix = Config.history.prefix;

	return path.join(prefix, ret.concat(args).join('/'));
}

export function absLinkTo (...args) {
	var prefix;
	var link = linkTo.apply(null, args);

	switch (Config.history.mode) {
		case 'hash':
			return '#' + link;

		case 'browser':
			return path.join('/', link);

		default:
			return '#' + link;
	}
}

export function resolveResource (api, resources) {
	var names = resources.split('.');
	var tmp = api;

	names.forEach(function (v) {
		tmp = tmp[v];
	});

	return tmp;
}

export function resolveAction (api, resources, action, ids) {
	var action = resolveResource(api, resources)[action];

	if (ids)
		action.provideIdArgs(ids.split(','));

	return action;
}

export function resourcePath (resource) {
	var path = [resource.getName()];
	var tmp = resource;

	while (tmp._private.parent) {
		tmp = tmp._private.parent;
		path.push(tmp._private.name);
	}

	return path.reverse();
}

export function findAssociation (api, path) {
	var name = path.shift();

	if (!path.length)
		return api[name];

	return findAssociation(api[name], path);
}

export function capitalize (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function actionErrors (response) {
	if (!response)
		return {};

	var realResponse = response.apiResponse ? response.apiResponse() : response;

	return realResponse.envelope.errors || {};
}
