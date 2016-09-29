import {connect} from 'react-redux'
import ResourceIndex from '../components/resource/index'

var mapStateToProps = function (state) {
	if (state === undefined)
		state = {};

	return {
		authenticated: state.authenticated,
	};
};

module.exports = connect(mapStateToProps)(ResourceIndex);
