import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


//Reducer
import count from './count';
import theDefaultReducer, { firstNamedReducer, secondNamedReducer } from './hello';


const rootReducer = combineReducers({
	theDefaultReducer,
	firstNamedReducer,
	secondNamedReducer,
	count,
	router: routerReducer
})

export default rootReducer;
