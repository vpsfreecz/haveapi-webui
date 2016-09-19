import {connect} from 'react-redux'
import ResourceIndex from '../components/resource_index'

var mapStateToProps = function (state) {
	console.log('map state to props', state);

	if (state === undefined)
		state = {};

	return state;
};

var mapDispatchToProps = function (dispatch) {
	console.log('map dispatch');

	return {};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ResourceIndex);
