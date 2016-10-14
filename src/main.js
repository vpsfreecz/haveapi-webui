import React from 'react'
import ReactDOM from 'react-dom'
import {Router, IndexRoute, Route, hashHistory, browserHistory} from 'react-router'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import BasePage from './components/base_page'
import ApiSelector from './components/api/selector'
import ApiVersion from './components/api/version'
import ApiPage from './containers/api_page'
import Resource from './components/resource'
import ResourceIndex from './containers/resource_index'
import VersionIndex from './containers/version_index'
import Instance from './components/instance'
import Action from './components/action'
import Config from './config';
import {reducer} from './reducers'

var store = createStore(reducer);
var history, prefix = '/';

switch (Config.history.mode) {
	case 'hash':
		history = hashHistory;
		break;

	case 'browser':
		history = browserHistory;
		prefix = Config.history.prefix || '/';
		break;

	default:
		history = hashHistory;
}

var routes = (
		<Route path=":resources" component={Resource}>
			<IndexRoute component={ResourceIndex} />
			<Route path="show/:ids" component={Instance}>
				<Route path=":action" component={Action} />
			</Route>
			<Route path=":action(/:ids)" component={Action} />
		</Route>
);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			{
				Config.apiUrl ?
				<Route path={prefix + "(:version)"} component={ApiVersion}>
					<IndexRoute component={VersionIndex} />
					{routes}
				</Route>
				:
				<Route path={prefix} component={BasePage}>
					<IndexRoute component={ApiSelector} />
					<Route path=":url" component={ApiVersion}>
						<IndexRoute component={VersionIndex} />
						{routes}
					</Route>
				</Route>
			}
		</Router>
	</Provider>,
	document.getElementById('container')
);
