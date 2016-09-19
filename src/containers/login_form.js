var ReactRedux = require('react-redux');
var LoginForm = require('../components/login_form');

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

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LoginForm);
