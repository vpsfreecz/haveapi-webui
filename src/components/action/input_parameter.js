import React from 'react'
import {Col, FormGroup, ControlLabel, FormControl, Checkbox, HelpBlock, InputGroup, Button, Glyphicon} from 'react-bootstrap'
import {findAssociation} from '../../utils'
import SelectModal from './input/select_modal'

var InputParameter = React.createClass({
	getInitialState: function () {
		return {
			value: null,
		};
	},

	componentDidMount: function () {
		if (this.props.desc.type != 'Resource')
			return;

		this.fetchChoices(this.props);
	},

	componentWillReceiveProps: function (nextProps) {
		if (this.props.desc.type != 'Resource')
			return;

		this.fetchChoices(nextProps);
	},

	fetchChoices: function (props) {
		var res = findAssociation(this.context.api, props.desc.resource.slice(0));
		var that = this;

		if (res.index) {
			res.index(function (c, list) {
				var choices = [];

				list.each(function (obj) {
					choices.push({
						id: obj[ props.desc.value_id ],
						label: obj[ props.desc.value_label ],
					});
				});

				that.setState(Object.assign({}, this.state, {choices: choices}));
			});

		} else {
			this.setState(Object.assign({}, this.state, {choices: null}));
		}
	},

	toggleField: function (e) {
		e.preventDefault();

		this.setState(Object.assign({}, this.state, {
			raw: !this.state.raw,
		}));
	},

	toggleModal: function () {
		this.setState(Object.assign({}, this.state, {
			showModal: !this.state.showModal,
		}));
	},

	modalClosed: function (obj) {
		if (!obj || !obj.id)
			return this.toggleModal();

		var newState = {
			showModal: false,
			value: obj.id,
		};

		if (!this.state.choices || !this.state.choices.find(v => (v.id == obj.id)))
			newState[raw] = true;

		this.setState(Object.assign({}, this.state, newState));
	},

	getSelectModal: function () {
		return (
			<SelectModal
				show={this.state.showModal}
				desc={this.props.desc}
				onClose={this.modalClosed} />
		);
	},

	fieldForParam: function () {
		var def = this.props.desc.default || '';
		var val = this.state.value || '';

		switch (this.props.desc.type) {
			case 'String':
				return <FormControl type="text" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Datetime':
				return <FormControl type="datetime" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Integer':
			case 'Float':
				return <FormControl type="number" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Boolean':
				return <Checkbox checked={val ? true : false} onChange={this.handleCheckbox} />;

			case 'Text':
			case 'Custom':
				return <FormControl componentClass="textarea" placeholder={def} value={val} onChange={this.handleChange} />;

			case 'Resource':
				if (this.state.raw) {
					return (
						<InputGroup>
							<FormControl
								type="number"
								placeholder={def}
								value={val}
								onChange={this.handleChange} />

							<InputGroup.Button>
								<Button onClick={this.toggleField} title="Show choices">
									<Glyphicon glyph="list" />
								</Button>
								<Button onClick={this.toggleModal} title="Find from list">
									<Glyphicon glyph="folder-open" />
								</Button>
							</InputGroup.Button>
							{this.getSelectModal()}
						</InputGroup>
					);

				} else if (this.state.choices) {
					return (
						<InputGroup>
							<FormControl
								componentClass="select"
								value={val}
								onChange={this.handleChange}>
								<option>---</option>
								{this.state.choices.map(v => (
									<option key={v.id} value={v.id}>{v.label}</option>
								))}
							</FormControl>

							<InputGroup.Button>
								<Button onClick={this.toggleField} title="Enter resource ID">
									<Glyphicon glyph="edit" />
								</Button>
								<Button onClick={this.toggleModal} title="Find from list">
									<Glyphicon glyph="folder-open" />
								</Button>
							</InputGroup.Button>
							{this.getSelectModal()}
						</InputGroup>
					);

				} else if (this.state.choices === null) {
					return (
						<FormControl
							type="number"
							placeholder={def}
							value={val}
							onChange={this.handleChange} />
					);

				} else {
					return (
						<InputGroup>
							<FormControl componentClass="select">
								<option disabled>Fetching...</option>
							</FormControl>

							<InputGroup.Button>
								<Button onClick={this.toggleField} title="Enter resource ID">
									<Glyphicon glyph="edit" />
								</Button>
							</InputGroup.Button>
						</InputGroup>
					);
				}

			default:
				return <FormControl type="text" placeholder={def} value={val} onChange={this.handleChange} />;
		}
	},

	handleChange: function (event) {
		console.log('param change', event.target.value);

		var v = event.target.value;
		this.setState({value: v});
		this.props.onChange(v);
	},

	handleCheckbox: function (event) {
		console.log('param check', event.target.checked);

		var v = event.target.checked;
		this.setState({value: v});
		this.props.onChange(v);
	},

	render: function () {
		return (
			<FormGroup>
				<Col componentClass={ControlLabel} sm={2}>
					{this.props.desc.label || this.props.name}:
				</Col>
				<Col sm={10}>
					{this.fieldForParam()}
					<HelpBlock>{this.props.desc.description || ''}</HelpBlock>
				</Col>
			</FormGroup>
		);
	}
});

InputParameter.contextTypes = {
	api: React.PropTypes.object,
};

export default InputParameter;
