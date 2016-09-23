import {connect} from 'react-redux'
import LoginForm from '../components/login_form'

var mapStateToProps = function (state) {
	console.log('map state to props', state);

	if (state === undefined)
		state = {};

	return state;
};

var mapDispatchToProps = function (dispatch) {
	console.log('map dispatch');

	return {
		login: function (username) {
			dispatch({type: 'LOGIN', opts: {username: username}});
		},
		logout: function () {
			dispatch({type: 'LOGOUT'});
		},
	};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
