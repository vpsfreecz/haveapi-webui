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
