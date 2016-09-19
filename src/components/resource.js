import React from 'react'
import ResourceIndex from '../containers/resource_index'

var Resource = React.createClass({
	render: function () {
		var r = this.context.api[this.props.params.resource];

		return (
			<div>
				<h3>Resource {this.props.params.resource}</h3>
				{/*
				<h4>Actions</h4>
				<ul>
					{r.actions.map(a => (
						<li key={a}>{a}</li>
					))}
				</ul>

				<h4>Subresources</h4>
				<ul>
					{r.resources.map(r => (
						<li key={r}>{r}</li>
					))}
				</ul>
				*/}

				<h4>Index</h4>
				<ResourceIndex name={this.props.params.resource} />
			</div>
		);
	}
});

Resource.contextTypes = {
	api: React.PropTypes.object,
};

export default Resource;
