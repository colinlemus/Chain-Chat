import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Signup from './components/Signup';
import Event404 from './components/Event404';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated } } = store.getState()
    if (!authenticated) {
        replace({
            pathname: "/",
            state: { nextPathname: nextState.location.pathname }
        })
    }
    callback()
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/signup' component={Signup}/>
                <Route path='*' component={Event404} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
