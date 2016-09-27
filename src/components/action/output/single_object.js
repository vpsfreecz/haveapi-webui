import React from 'react'
import OutputParameter from './parameter'

export default React.createClass({
	render: function () {
		var output_params = this.props.action.description.output.parameters;

		return (
			<dl className="single-object dl-horizontal">
				{Object.keys(output_params).map(p => (
					<div key={p}>
						<dt>{output_params[p].label || p}:</dt>
						<dd><OutputParameter name={p} resource={this.props.response} desc={output_params[p]} /></dd>
					</div>
				))}
			</dl>
		);
	}
});
