import { FETCH_LANGUAGE } from "../../actions/chat/chatAction";

const initalState = {
    language: 'en'
};

export default (state = initalState, action) => {    
    if (action.type === FETCH_LANGUAGE) {
        return {
            ...state,
            language: action.payload
        }
    } else {
        return state;
    }
}