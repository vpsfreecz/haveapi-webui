import React from 'react'
import {LinkTo, resourcePath} from '../utils'

var InstanceActions = React.createClass({
	render: function () {
		var name = this.props.resource._private.name;
		var path = resourcePath(this.props.resource);

		return (
			<ul>
				{this.props.resource.actions.filter(action => (
					action != 'show' && this.props.resource[action].description.url.indexOf(':'+name+'_id') >= 0
				)).map(action => (
					<li key={action}><LinkTo to={[path.join('.'), action, this.context.url_params.join(',')]}>{action}</LinkTo></li>
				))}
			</ul>
		);
	},
});

InstanceActions.contextTypes = {
	url_params: React.PropTypes.array,
};

export default InstanceActions;
