import React, { Component } from 'react'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Event404 from './components/Event404';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { initializeSession, initializeForgotSession } from './redux/actions/auth/authAction';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPassword2 from './components/auth/ForgotPassword2';
import Test from './components/test/test';

class App extends Component {
    componentWillMount = () => {
        this.props.initializeSession();
        this.props.initializeForgotSession();
    }

    createRoute = (requireAuth, pathType, route, component, reroute) => {
        if (requireAuth) {
            if (pathType === 'exact') {
                if (this.props.user.active) {
                    return (<Route exact path={route} component={component} />);
                }

                return (<Redirect to={reroute} />);
            } else if (pathType === 'path') {
                if (this.props.user.active) {
                    return (<Route path={route} component={component} />);
                }

                return (<Redirect to={reroute} />);
            }
        } else {
            if (pathType === 'exact') {
                return (<Route exact path={route} component={component} />);
            } else if (pathType === 'path') {
                return (<Route path={route} component={component} />);
            }
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {this.createRoute(false, 'exact', '/', Login)}
                    {this.createRoute(false, 'exact', '/register', Signup)}
                    {this.createRoute(false, 'exact', '/forgot', ForgotPassword)}
                    {this.createRoute(false, 'exact', '/change', ForgotPassword2)}
                    {this.createRoute(false, 'path', '/forgot')}
                    {this.createRoute(false, 'path', '/confirmation')}
                    {this.createRoute(false, 'exact', '/test', Test)}
                    {this.createRoute(false, 'path', '*', Event404)}
                </Switch>
            </BrowserRouter>
        )
    }
}

App.prototypes = {
    initializeSession: PropTypes.func.isRequired,
    initializeForgotSession: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { initializeSession, initializeForgotSession })(App);