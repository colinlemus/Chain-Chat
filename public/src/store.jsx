import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';

const initalState = {};
const middleware = [thunk];

export const store = createStore(
    rootReducer,
    initalState,
    applyMiddleware(...middleware)
);