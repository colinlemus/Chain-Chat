import { combineReducers } from 'redux';
import loginReducer from './auth/authReducer';
import { FETCH_SESSION_DATA } from '../actions/auth/authAction';

const appReducer = combineReducers({
    user: loginReducer
})

export default (state, action) => {
    if (action.type === FETCH_SESSION_DATA) {
        return {
            ...state,
            user: action.payload
        }
    }

    return appReducer(state, action)
}