import {connect} from 'react-redux'
import SubResources from '../components/sub_resources.js'

var mapStateToProps = function (state) {
	if (state === undefined)
		state = {};

	return {
		authenticated: state.authenticated,
	};
};

module.exports = connect(mapStateToProps)(SubResources);
