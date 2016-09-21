import React from 'react'
import ResourceName from '../components/resource_name'
import ResourceActions from '../components/resource_actions'

var Resource = React.createClass({
	render: function () {
		return (
			<div>
				<h3>Resource <ResourceName resource={this.props.params.resource} /></h3>
				<ResourceActions resource={this.context.api[this.props.params.resource]} />
				{this.props.children}
			</div>
		);
	}
});

Resource.contextTypes = {
	api: React.PropTypes.object,
};

export default Resource;
