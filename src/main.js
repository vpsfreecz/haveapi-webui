var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ApiSelector = require('./components/api_selector');
var ApiPage = require('./containers/api_page');
var Resource = require('./components/resource');

var store = Redux.createStore(require('./reducers'));

ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<Router>
			<Route path="/" component={ApiSelector} />
			<Route path="/api/:url" component={ApiPage}>
				<Route path=":name" component={Resource} />
			</Route>
		</Router>
	</ReactRedux.Provider>,
	document.getElementById('container')
);
