import { FETCH_LOGIN_USER } from "../../actions/auth/authAction";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initalState = {
    user: [{
        id: cookies.get('id'),
        email: cookies.get('email'),
        firstName: cookies.get('firstName'),
        lastName: cookies.get('lastName'),
        username: cookies.get('username'),
        password: cookies.get('password'),
        authenticated: cookies.get('authenticated')
    }]
};

export default (state = initalState, action) => {
    if (action.type === FETCH_LOGIN_USER) {
        cookies.set('id', action.payload.id);
        cookies.set('email', action.payload.email);
        cookies.set('firstName', action.payload.firstName);
        cookies.set('lastName', action.payload.lastName);
        cookies.set('username', action.payload.username);
        cookies.set('password', action.payload.password);
        cookies.set('authenticated', true);

        return {
            ...state,
            user: action.payload
        }
    } else {
        return state;
    }
}