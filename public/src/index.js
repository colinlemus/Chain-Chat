import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Signup from './components/Signup';
import Event404 from './components/Event404';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const requireAuth = (nextState, replace) => {
    const user = store.getState().user.user[0];
    const authenticated = store.getState().user.user[0].authenticated;
    console.log(authenticated);
    if (!user) {
        return true;
    } else if (user.id === '') {
        return true;
    } else if (user.password === '') {
        return true;
    } else if (user.lastName === '') {
        return true;
    } else if (user.firstName === '') {
        return true;
    } else if (user.username === '') {
        return true;
    } else if (user.email === '') {
        return true;
    } else if (!user.authenticated) {
        return true;
    }

    alert('welcome')
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path="/signup" render={() => {
                    if (requireAuth()) {
                        return (<Redirect to='/' />);
                    }

                    return (<Signup />);
                }} />
                {/* <Route exact path='/signup' component={Signup} render={() => { */}

                })} />
                <Route path='*' component={Event404} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
