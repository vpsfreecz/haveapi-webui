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
		login: function () {
			console.log('wtf is this');
			dispatch({type: 'LOGIN'});
		},
		logout: function () {
			dispatch({type: 'LOGOUT'});
		},
	};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
