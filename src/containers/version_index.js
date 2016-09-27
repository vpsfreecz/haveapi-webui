import {connect} from 'react-redux'
import VersionIndex from '../components/version_index'

var mapStateToProps = function (state) {
	console.log('map state to props', state);

	if (state === undefined)
		state = {};

	return {authenticated: state.authenticated};
};

module.exports = connect(mapStateToProps)(VersionIndex);
