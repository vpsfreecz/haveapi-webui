var React = require('react');

var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redux = require('redux');
var ReactRedux = require('react-redux');
var BasePage = require('./components/base_page');
var ApiSelector = require('./components/api_selector');
var ApiPage = require('./containers/api_page');
var Resource = require('./components/resource');

var store = Redux.createStore(require('./reducers'));

ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<Router>
			<Route path="/" component={BasePage}>
				<IndexRoute component={ApiSelector} />
				<Route path="api/:url" component={ApiPage}>
					<Route path=":name" component={Resource} />
				</Route>
			</Route>
		</Router>
	</ReactRedux.Provider>,
	document.getElementById('container')
);
