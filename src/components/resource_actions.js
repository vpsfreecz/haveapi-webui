import React from 'react'
import {LinkTo} from '../utils'

export default React.createClass({
	render: function () {
		var name = this.props.resource._private.name;

		return (
			<ul>
				{this.props.resource.actions.filter(action => (
					!this.props.resource[action].description.url.contains(':'+name+'_id')
				)).map(action => (
					<li key={action}><LinkTo to={[name, action]}>{action}</LinkTo></li>
				))}
			</ul>
		);
	},
});
