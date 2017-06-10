/*eslint-disable */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware, push } from 'react-router-redux';
import logger from 'redux-logger';
//REDUCER 
import reducers from './reducers';

//Saga 
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/saga'

//MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
// Now you can dispatch navigation actions from anywhere!
//store.dispatch(push('/home'))

//STORE
const store = createStore(
    reducers,
    applyMiddleware(middleware, sagaMiddleware)
)

//SAGA RUNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
sagaMiddleware.run(rootSaga);

export { store, history };
