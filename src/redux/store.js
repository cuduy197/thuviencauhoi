/*eslint-disable */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

//REDUCER 
import rootReducer from './rootReducer';
//Saga 
import rootSaga from './rootSaga'

//MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();

const history = createHistory();
const routerHistory = routerMiddleware(history);

//store.dispatch(push('/home')) //  Now you can dispatch navigation actions from anywhere!

//STORE
const store = createStore(
    rootReducer,
    applyMiddleware(routerHistory, sagaMiddleware)
)
//SAGA RUNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
sagaMiddleware.run(rootSaga);

//Debug
if (process.env.NODE_ENV == 'development') {
    window.store = store;
}


export { store, history };
