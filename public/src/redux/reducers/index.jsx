import { combineReducers } from 'redux';
import loginReducer from './auth/authReducer';

export default combineReducers({
    user: loginReducer
});