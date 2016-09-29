import {connect} from 'react-redux'
import ResourceActions from '../components/resource/actions'

var mapStateToProps = function (state) {
	if (state === undefined)
		state = {};

	return {
		authenticated: state.authenticated,
	};
};

module.exports = connect(mapStateToProps)(ResourceActions);
