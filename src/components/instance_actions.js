import React from 'react'
import {LinkTo} from '../utils'

export default React.createClass({
	render: function () {
		var name = this.props.resource._private.name;

		return (
			<ul>
				{this.props.resource.actions.filter(action => (
					action != 'show' && this.props.resource[action].description.url.contains(':'+name+'_id')
				)).map(action => (
					<li key={action}><LinkTo to={[name, action, this.props.resource.id]}>{action}</LinkTo></li>
				))}
			</ul>
		);
	},
});
