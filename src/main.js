import React from 'react'
import ReactDOM from 'react-dom'
import {Router, IndexRoute, Route} from 'react-router'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import BasePage from './components/base_page'
import ApiSelector from './components/api_selector'
import ApiPage from './containers/api_page'
import Resource from './components/resource'
import Instance from './components/instance'
import Action from './components/action'
import Config from './config';
import {reducer} from './reducers'

var store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			{
				Config.api_url ?
				<Route path="/" component={ApiPage}>
					<Route path=":resources" component={Resource}>
						<Route path="show/:ids" component={Instance} />
						<Route path=":action(/:ids)" component={Action} />
					</Route>
				</Route>
				:
				<Route path="/" component={BasePage}>
					<IndexRoute component={ApiSelector} />
					<Route path="api/:url" component={ApiPage}>
						<Route path=":resources" component={Resource}>
							<Route path="show/:ids" component={Instance} />
							<Route path=":action(/:ids)" component={Action} />
						</Route>
					</Route>
				</Route>
			}
		</Router>
	</Provider>,
	document.getElementById('container')
);
