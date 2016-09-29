import {connect} from 'react-redux'
import InstanceActions from '../components/instance/actions'

var mapStateToProps = function (state) {
	if (state === undefined)
		state = {};

	return {
		authenticated: state.authenticated,
	};
};

module.exports = connect(mapStateToProps)(InstanceActions);
