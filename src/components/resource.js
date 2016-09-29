import React from 'react'
import ResourceName from './resource/name'
import Navigation from './navigation'
import {resolveResource} from '../utils'

var Resource = React.createClass({
	getChildContext: function () {
		return {
			url_params: this.getUrlParams(),
		};
	},

	getUrlParams: function () {
		return (this.props.params.ids && this.props.params.ids.split(',')) || [];
	},

	render: function () {
		var resource = resolveResource(
			this.context.api,
			this.props.params.resources,
		);

		return (
			<div>
				<Navigation
					resources={this.props.params.resources.split('.')}
					action={this.props.params.action}
					ids={this.getUrlParams()} />
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
