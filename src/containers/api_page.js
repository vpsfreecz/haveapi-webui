import {connect} from 'react-redux'
import ApiPage from '../components/api_page'

var mapStateToProps = function (state) {
	console.log('map state to props', state);

	if (state === undefined)
		state = {};

	return state;
};

module.exports = connect(mapStateToProps)(ApiPage);
