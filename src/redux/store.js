import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware, push } from 'react-router-redux';

//REDUCER 
import reducers from './reducers';


//MIDDLEWARE
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
// Now you can dispatch navigation actions from anywhere!
//store.dispatch(push('/home'))

//STORE
const store = createStore(
	reducers,
	applyMiddleware(middleware)
)

export { store, history }; 
