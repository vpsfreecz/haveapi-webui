import React from 'react'
import {Link} from 'react-router'
import Config from './config'

export function linkTo (api, ...args) {
	var ret = [];

	if (!Config.api_url && api) {
		ret.push('api');
		ret.push(encodeURIComponent(api));
	}

	return '/' + ret.concat(args).join('/');
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
	var path = [resource._private.name];
	var tmp = resource;

	while (tmp._private.parent) {
		tmp = tmp._private.parent;
		path.push(tmp._private.name);
	}

	return path.reverse();
}

var LinkTo = React.createClass({
	render: function () {
		var link;
		var url = this.context.api._private.url;

		if (this.props.to instanceof Array)
			link = linkTo(url, ...this.props.to);

		else
			link = linkTo(url, this.props.to);

		return <Link to={link}>{this.props.children}</Link>;
	}
});

LinkTo.contextTypes = {
	api: React.PropTypes.object,
};

export {LinkTo};
