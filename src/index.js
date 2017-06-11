import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.less';
import App from './App';
import NavBar from './components/ui/nav/NavBar';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

//Page 
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound';

//Store 
import { store, history } from './redux/store.js';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
//FIX 404 USING Switch
ReactDOM.render(
    <LocaleProvider locale={enUS}>
    <Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<NavBar />
				<div className="App-intro">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/home" component={App} />
					<Route exact strict path="/add/:monhoc/:chude" component={App} />
					<Route path="/test/:id" component={Home} />
					<Route component={NotFound} />
				</Switch>
				</div>
			</div>
		</ConnectedRouter>
		</Provider>
		</LocaleProvider>, document.getElementById('root'));

registerServiceWorker();
