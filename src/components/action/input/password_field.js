import React from 'react'
import {FormGroup, ControlLabel, FormControl, InputGroup, Button} from 'react-bootstrap'

export default React.createClass({
	getInitialState: function () {
		return {show: false};
	},

	toggleVisibility: function () {
		this.setState({show: !this.state.show});
	},

	render: function () {
		return (
			<InputGroup>
				<FormControl
					type={this.state.show ? 'text' : 'password'}
					placeholder={this.props.placeholder}
					value={this.props.value}
					onChange={this.props.onChange} />
				<InputGroup.Button>
					<Button onClick={this.toggleVisibility}>
						{this.state.show ? 'Hide' : 'Show'}
					</Button>
				</InputGroup.Button>
			</InputGroup>
		);
	}
});
