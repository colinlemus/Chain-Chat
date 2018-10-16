import { SEND_MAIL_REQUEST, SEND_MAIL_SUCCESS, SEND_MAIL_FAILED } from "../../actions/auth/emailAction";

const initialState = {
    loading: false,
    message: '',
    errMessage: ''
}

export default (state = initialState, action) => {
    if (action.type === SEND_MAIL_REQUEST) {
        return {
            ...state,
            loading: true,
            message: '',
            errMessage: ''
        };
    } else if (action.type === SEND_MAIL_SUCCESS) {
        return {
            ...state,
            loading: false,
            message: action.payload.message,
            errMessage: ''
        };
    } else if (action.type === SEND_MAIL_FAILED) {
        return {
            ...state,
            loading: false,
            message: '',
            errMessage: action.payload
        };
    } else {
        return state;
    }
}