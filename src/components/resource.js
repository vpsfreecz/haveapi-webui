import React from 'react'
import ResourceIndex from '../containers/resource_index'

var Resource = React.createClass({
	render: function () {
		var r = this.context.api[this.props.params.name];

		return (
			<div>
				<h3>Resource {this.props.params.name}</h3>
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
				<ResourceIndex name={this.props.params.name} />
			</div>
		);
	}
});

Resource.contextTypes = {
	api: React.PropTypes.object,
};

export default Resource;
