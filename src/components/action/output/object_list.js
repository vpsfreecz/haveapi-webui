import React from 'react'
import {Table, Alert, ButtonGroup, Button, Glyphicon} from 'react-bootstrap'
import OutputParameter from './parameter'
import {resourcePath, linkTo} from '../../../utils'

var ObjectList = React.createClass({
	getActionButtons: function (r) {
		var ret = [];

		if (this.props.objectSelector) {
			ret.push(
				<Button
					key="select"
					onClick={e => (this.props.objectSelector(r))}
					title="Select this object">
					<Glyphicon glyph="copy" />
				</Button>
			);
			return ret;
		}

		if (r.actions.indexOf('update') !== -1) {
			ret.push(
				<Button
					bsSize="xs"
					key="edit"
					title="Edit"
					onClick={e => this.updateObject(r)}>
					<Glyphicon glyph="edit" />
				</Button>
			);
		}

		if (r.actions.indexOf('delete') !== -1) {
			ret.push(
				<Button
					bsSize="xs"
					key="delete"
					title="Delete"
					onClick={e => this.deleteObject(r)}>
					<Glyphicon glyph="remove" />
				</Button>
			);
		}

		return ret;
	},

	updateObject: function (r) {
		var metaNs = this.context.api.apiSettings.meta.namespace;

		this.context.router.push(linkTo(
			this.context.api,
			resourcePath(r).join('.'),
			'update',
			r._private.response[metaNs].url_params.join(','),
		));
	},

	deleteObject: function (r) {
		var metaNs = this.context.api.apiSettings.meta.namespace;

		this.context.router.push(linkTo(
			this.context.api,
			resourcePath(r).join('.'),
			'delete',
			r._private.response[metaNs].url_params.join(','),
		));
	},

	render: function () {
		var list = this.props.response;

		if (!list.length)
			return (
				<Alert bsStyle="info">No objects found.</Alert>
			);

		var output_params = this.props.action.description.output.parameters;
		var cols = Object.keys(output_params);

		var i = 0;

		return (
			<Table striped condensed hover className="action-output">
				<thead>
					<tr>
						<th></th>
						{cols.map(c => (
							<th key={c}>{output_params[c].label || c}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{this.props.response.items.map(r => (
						<tr key={r.id || ('object-' + i++)}>
							<td>
								<ButtonGroup>
									{this.getActionButtons(r)}
								</ButtonGroup>
							</td>
							{cols.map(c => (
								<td key={c}>
									<OutputParameter name={c} resource={r} desc={output_params[c]} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		);
	}
});

ObjectList.contextTypes = {
	api: React.PropTypes.object,
	router: React.PropTypes.object,
};

export default ObjectList;
