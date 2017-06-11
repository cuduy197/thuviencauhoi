import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//Reducer
import count from './count';
import user from './user';
import quiz from './quiz';

//mport theDefaultReducer, { firstNamedReducer, secondNamedReducer } from './hello';

const rootReducer = combineReducers({
    user,
    quiz,
    //count,
    router: routerReducer
})

export default rootReducer;
