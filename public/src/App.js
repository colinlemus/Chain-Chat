import React, { Component } from 'react'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Event404 from './components/Event404';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { initializeSession } from './redux/actions/auth/authAction';
import ForgotPassword from './components/auth/ForgotPassword';

class App extends Component {
    componentWillMount = () => {
        this.props.initializeSession();
    }

    requireAuth = (nextState, replace) => {

    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path="/signup" render={() => {
                        if (this.requireAuth()) {
                            return (<Redirect to='/' />);
                        }

                        return (<Signup />);
                    }} />
                    <Route exact path="/forgot" render={() => {
                        if (this.requireAuth()) {
                            return (<Redirect to='/' />);
                        }

                        return (<ForgotPassword />);
                    }} />
                    <Route path='/confirmation/' />
                    <Route path='*' component={Event404} />
                </Switch>
            </BrowserRouter>
        )
    }
}

App.prototypes = {
    initializeSession: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps, { initializeSession })(App);