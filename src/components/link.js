import React from 'react'
import {Link as RouterLink} from 'react-router'
import {linkTo} from '../utils'

var Link = React.createClass({
	render: function () {
		var link;

		if (this.props.to instanceof Array)
			link = linkTo(this.context.api, ...this.props.to);

		else
			link = linkTo(this.context.api, this.props.to);

		return (
			<RouterLink to={link} className={this.props.className}>
				{this.props.children}
			</RouterLink>
		);
	}
});

Link.contextTypes = {
	api: React.PropTypes.object,
};

export default Link;
