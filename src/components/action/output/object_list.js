import React from 'react'
import {Table, Alert} from 'react-bootstrap'
import OutputParameter from '../../output_parameter'

export default React.createClass({
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
						{cols.map(c => (
							<th key={c}>{output_params[c].label || c}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{this.props.response.items.map(r => (
						<tr key={r.id || ('object-' + i++)}>
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
