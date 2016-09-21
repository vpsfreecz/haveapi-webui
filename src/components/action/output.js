import React from 'react'
import {Alert} from 'react-bootstrap'
import SingleObject from './output/single_object'
import ObjectList from './output/object_list'

export default React.createClass({
	render: function () {
		if (!this.props.response)
			return null;

		console.log('so show response', this.props.response);

		if (!this.props.response.isOk())
			return (
				<Alert bsStyle="warning">
					<strong>Action failed:</strong> {this.props.response.message}
				</Alert>
			);

		switch (this.props.action.layout('output')) {
			case 'hash':
			case 'object':
				return <SingleObject action={this.props.action} response={this.props.response} />

			case 'hash_list':
			case 'object_list':
				return <ObjectList action={this.props.action} response={this.props.response} />
		}
	},
});
