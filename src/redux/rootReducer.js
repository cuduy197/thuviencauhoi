import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//Reducer
import auth from './reducers/auth';
import quiz from './reducers/quiz';

const rootReducer = combineReducers({
    auth,
    quiz,
    router: routerReducer
})

export default rootReducer;
