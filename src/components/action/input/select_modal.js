import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {findAssociation} from '../../../utils'
import Input from '../input'
import Output from '../output'

var SelectModal = React.createClass({
	getInitialState: function () {
		return {
			response: null,
		};
	},

	componentWillReceiveProps: function () {
		this.setState({response: null});
	},

	getAction: function () {
		return findAssociation(this.context.api, this.props.desc.resource.slice(0)).index;
	},

	execute: function (params) {
		console.log('call action!');
		var that = this;

		this.getAction().invoke(params, function (c, reply) {
			that.setState({response: reply});
		});
	},

	objectSelected: function (object) {
		console.log('object selected', object);
		this.props.onClose(object);
	},

	render: function () {
		var action = this.getAction();

		return (
			<Modal show={this.props.show} bsSize="large" className="select-modal">
				<Modal.Header>Select {this.props.desc.resource.join('.')}</Modal.Header>
				<Modal.Body>
					<Input action={action} onSubmit={this.execute} />
					<Output
						action={action}
						response={this.state.response}
						objectSelector={this.objectSelected} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={e => this.props.onClose()}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});

SelectModal.contextTypes = {
	api: React.PropTypes.object,
};

export default SelectModal;
