import { combineReducers } from 'redux';
import loginReducer from './auth/authReducer';
import { FETCH_SESSION_DATA, FETCH_FORGOT_SESSION } from '../actions/auth/authAction';

const appReducer = combineReducers({
    user: loginReducer
})

export default (state, action) => {
    if (action.type === FETCH_SESSION_DATA) {
        return {
            ...state,
            user: action.payload
        }
    } else if(action.type === FETCH_FORGOT_SESSION) {
        return {
            ...state, 
            user: action.payload
        }
    }

    return appReducer(state, action)
}