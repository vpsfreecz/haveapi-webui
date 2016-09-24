import React from 'react'
import {LinkTo, resourcePath} from '../utils'

var ResourceActions = React.createClass({
	render: function () {
		var name = this.props.resource._private.name;
		var path = resourcePath(this.props.resource);

		return (
			<ul>
				{this.props.resource.actions.filter(action => (
					this.props.resource[action].description.url.indexOf(':'+name+'_id') === -1
				)).map(action => (
					<li key={action}>
						{/*
							Since we're linking to a resource action, not an instance action, we
							remove the id of the last resource, i.e. use all ids, except the last.
						*/}
						<LinkTo
							to={[
								path.join('.'),
								action,
								this.context.url_params.slice(0, path.length-1).join(',')
							]}>
							{action}
						</LinkTo>
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
