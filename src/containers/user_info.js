import {connect} from 'react-redux'
import UserInfo from '../components/user_info'

var mapStateToProps = function (state) {
	if (state === undefined)
		state = {};

	return {authenticated: state.authenticated};
};

module.exports = connect(mapStateToProps)(UserInfo);
