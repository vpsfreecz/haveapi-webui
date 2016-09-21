import React from 'react'
import {LinkTo, resourcePath} from '../utils'

var ResourceActions = React.createClass({
	render: function () {
		var name = this.props.resource._private.name;

		return (
			<ul>
				{this.props.resource.actions.filter(action => (
					!this.props.resource[action].description.url.contains(':'+name+'_id')
				)).map(action => (
					<li key={action}>
						<LinkTo to={[resourcePath(this.props.resource).join('.'), action, this.context.url_params.join(',')]}>{action}</LinkTo>
					</li>
				))}
			</ul>
		);
	},
});

ResourceActions.contextTypes = {
	url_params: React.PropTypes.array,
};

export default ResourceActions;
