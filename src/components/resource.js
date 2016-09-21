import React from 'react'
import ResourceName from '../components/resource_name'
import ResourceActions from '../components/resource_actions'
import {resolveResource} from '../utils'

var Resource = React.createClass({
	getChildContext: function () {
		return {
			url_params: (this.props.params.ids && this.props.params.ids.split('.')) || [],
		};
	},

	render: function () {
		var resource = resolveResource(
			this.context.api,
			this.props.params.resources,
		);

		return (
			<div>
				<h3>Resource <ResourceName resource={resource} /></h3>
				<ResourceActions resource={resource} ids={this.props.params.ids} />
				{this.props.children}
			</div>
		);
	}
});

Resource.childContextTypes = {
	url_params: React.PropTypes.array,
};

Resource.contextTypes = {
	api: React.PropTypes.object,
};

export default Resource;
