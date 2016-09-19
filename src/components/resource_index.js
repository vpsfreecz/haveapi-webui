import React from 'react'
import {Table} from 'react-bootstrap'

var ResourceIndex = React.createClass({
	getInitialState: function () {
		return {
			list: null,
			authenticated: this.props.authenticated,
		}
	},

	componentDidMount: function () {
		console.log('resource index mounted', this.props.name);
		this.fetchList(this.context.api[this.props.name]);
	},

	componentWillReceiveProps: function (props) {
		console.log('will receive props', props);

		if (props.authenticated == this.state.authenticated && props.name == this.props.name)
			return;

		this.setState({
			list: null,
			authenticated: props.authenticated,
		});

		this.fetchList(this.context.api[props.name]);
	},

	componentWillUpdate: function (nextProps, nextState) {
		console.log('will update resource index', nextProps, nextState);
	},

	componentWillUnmount: function () {
		console.log('unmounting resource index');
	},

	fetchList: function (resource) {
		var that = this;
		console.log('fetching index');

		resource.index(function (c, list) {
			console.log('got index', c, list);
			that.setState({
				list: list,
				authenticated: that.state.authenticated,
			});
		});
	},

	renderParam: function (name, desc, resource) {
		switch (desc.type) {
			case 'Resource':
				return resource[name + '_id']

			default:
				return resource[name];
		}
	},

	render: function () {
		console.log('render resource index');

		if (this.state.list) {
			if (!this.state.list.length)
				return <p>No objects found.</p>;

			var output_params = this.context.api[this.props.name]._private.description.actions.index.output.parameters;
			console.log(output_params);

			var cols = [];

			for (var p in output_params) {
				if (!output_params.hasOwnProperty(p))
					continue;

				cols.push(p);
			}

			console.log(cols);

			var i = 0;

			return (
				<Table striped bordered condensed hover className="resource-index">
					<thead>
						<tr>
							{cols.map(c => (
								<th key={i++}>{output_params[c].label || c}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{this.state.list.items.map(r => (
							<tr key={i++}>
								{cols.map(c => (
									<td key={i++}>{this.renderParam(c, output_params[c], r)}</td>
								))}
							</tr>
						))}
					</tbody>
				</Table>
			);

		} else {
			return <p>Fetching...</p>;
		}
	}
});

ResourceIndex.contextTypes = {
	api: React.PropTypes.object,
};

export default ResourceIndex;
