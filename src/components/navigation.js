import React from 'react'
import {Breadcrumb} from 'react-bootstrap'
import {absLinkTo, resourcePath, capitalize} from '../utils'
import ResourceName from './resource/name'
import ActionName from './action/name'

var Navigation = React.createClass({
	renderResources: function (resources, ids) {
		var resources = this.props.resources;
		var ids = this.props.ids.slice(0);
		var ret = [];
		var path = [];
		var idPath = [];
		var obj = this.context.api;
		var that = this;

		resources.forEach(function (r) {
			var curId = ids.shift();
			obj = obj[r];

			path.push(r);

			if (curId)
				idPath.push(curId);

			that.renderResource(
				path,
				r,
				curId,
				idPath.length && idPath,
			).forEach(item => ret.push(item));
		});

		// If there there's not action set, the last item is the active one
		if (!this.props.action) {
			var item = ret[ret.length-1];

			ret[ret.length-1] = React.cloneElement(
				item,
				Object.assign({}, item.props, {active: true}),
				item.props.children,
			);
		}

		return ret;
	},

	renderResource: function (path, resource, showId, pathIds) {
		var ret = [];
		var resourcePathIds = [];

		if (pathIds) {
			resourcePathIds = pathIds.slice(0).reverse().slice(
				(pathIds.length - path.length) + 1
			).reverse();
		}

		ret.push(
			<Breadcrumb.Item
				key={resource}
				className="resource"
				href={absLinkTo(this.context.api, path.join('.'), 'index', resourcePathIds.join(','))}>
				<span className="name">
					{resource.split('_').map(r => (capitalize(r))).join(' ')}
				</span>
			</Breadcrumb.Item>
		);

		if (showId && pathIds.length) {
			ret.push(
				<Breadcrumb.Item
					key={resource + showId}
					href={absLinkTo(this.context.api, path.join('.'), 'show', pathIds.join(','))}>
				#{showId}
			</Breadcrumb.Item>
			);
		}

		return ret;
	},

	render: function () {
		return (
			<Breadcrumb className="navigation">
				<Breadcrumb.Item href={absLinkTo(this.context.api)}>Resources</Breadcrumb.Item>
				{' '}
				{this.renderResources()}
				{' '}
				{this.props.action &&
					<Breadcrumb.Item className="action" active>
						<ActionName action={this.props.action} />
					</Breadcrumb.Item>
				}
			</Breadcrumb>
		);
	}
});

Navigation.contextTypes = {
	api: React.PropTypes.object,
};

export default Navigation;
