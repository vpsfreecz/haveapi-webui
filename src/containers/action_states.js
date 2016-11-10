import {connect} from 'react-redux'
import ActionStates from '../components/action_states'

var mapStateToProps = function (state) {
	if (state === undefined)
		state = {};

	return {actionStates: state.actionStates};
};

var mapDispatchToProps = function (dispatch) {
	return {
		setActionStates: function (states) {
			dispatch({type: 'ACTION_STATES', opts: states});
		},
	};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ActionStates);
