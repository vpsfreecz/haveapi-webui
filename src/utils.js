import React from 'react'
import {Link} from 'react-router'
import Config from './config'

export function linkTo(api, ...args) {
	var ret = [];

	if (!Config.api_url && api) {
		ret.push('api');
		ret.push(encodeURIComponent(api));
	}

	return '/' + ret.concat(args).join('/');
}

export function LinkTo({to, children, api}) {
	var link;

	if (to instanceof Array)
		link = linkTo(api, ...to);

	else
		link = linkTo(api, to);

	return <Link to={link}>{children}</Link>;
}
