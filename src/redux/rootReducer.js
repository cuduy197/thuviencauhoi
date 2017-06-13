import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//Reducer
import user from './reducers/user';
import auth from './reducers/auth';
import quiz from './reducers/quiz';

const rootReducer = combineReducers({
    user,
    auth,
    quiz,
    router: routerReducer
})

export default rootReducer;
