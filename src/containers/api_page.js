var ReactRedux = require('react-redux');
var ApiPage = require('../components/api_page');

var mapStateToProps = function (state) {
	console.log('map state to props', state);

	if (state === undefined)
		state = {};

	return state;
};

module.exports = ReactRedux.connect(mapStateToProps)(ApiPage);
