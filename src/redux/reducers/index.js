import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


//Reducer
import count from './count';
import user from './user';

//mport theDefaultReducer, { firstNamedReducer, secondNamedReducer } from './hello';


const rootReducer = combineReducers({
	user,
	count,
	router: routerReducer
})

export default rootReducer;
