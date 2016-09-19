import React from 'react'
import ReactDOM from 'react-dom'
import {Router, IndexRoute, Route} from 'react-router'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import BasePage from './components/base_page'
import ApiSelector from './components/api_selector'
import ApiPage from './containers/api_page'
import Resource from './components/resource'
import Config from './config';
import {reducer} from './reducers'

var store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			{
				Config.api_url ?
				<Route path="/" component={ApiPage}>
					<Route path=":name" component={Resource} />
				</Route>
				:
				<Route path="/" component={BasePage}>
					<IndexRoute component={ApiSelector} />
					<Route path="api/:url" component={ApiPage}>
						<Route path=":name" component={Resource} />
					</Route>
				</Route>
			}
		</Router>
	</Provider>,
	document.getElementById('container')
);
