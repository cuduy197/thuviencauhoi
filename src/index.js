import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.less';
import App from './App';
import NavBar from './components/ui/nav/NavBar';

//Page 
import Home from './pages/Home.jsx';

//Store 
import { store, history } from './redux/store.js';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<NavBar />
				<div className="App-intro">
					<Route exact path="/" component={Home} />
					<Route path="/home" component={App} />
					<Route path="/test/:id" component={Home} />
				</div>
			</div>
		</ConnectedRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
