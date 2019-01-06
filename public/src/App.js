import React, { Component } from 'react'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Event404 from './components/Event404';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { initializeSession, initializeForgotSession } from './redux/actions/auth/authAction';
import ForgotPassword from './components/auth/ForgotPassword';
import NewPassword from './components/auth/NewPassword';
import Chainchat from './components/ChainChat/ChainChat.jsx';
import Confirmation from './components/auth/Confirmation';
import FailedConfirmation from './components/auth/FailedConfirmation';
import ErrorAuth from './components/auth/ErrorAuth';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }
    componentDidMount = () => {
        this.props.initializeSession();
        this.props.initializeForgotSession();
        if(!this.props.user.active) {
            setTimeout(() =>{
                console.log(this.props.user.active);
                this.setState({
                    loading: false
                })
            }, 1000);
        }
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
        if (this.state.loading) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <img src={require('./assests/ChainChatLogo.png')} className="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 m-auto">
                            <div className="card">
                                <div class="card-header text-center font-weight-bold">
                                    Loading Web Page
                                </div>
                                <div className="card-body text-center">
                                    <p className="card-text">Currently loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        {this.createRoute(false, 'exact', '/', Login)}
                        {this.createRoute(false, 'exact', '/register', Signup)}
                        {this.createRoute(false, 'exact', '/forgot', ForgotPassword)}
                        {this.createRoute(false, 'exact', '/change', NewPassword)}
                        {this.createRoute(false, 'path', '/forgot')}
                        {this.createRoute(false, 'exact', '/failedConfirmation', FailedConfirmation)}
                        {this.createRoute(false, 'exact', '/autherror', ErrorAuth)}
                        {this.createRoute(false, 'exact', '/confirmed', Confirmation)}
                        {this.createRoute(true, 'exact', '/chainchat', Chainchat, '/')}
                        {this.createRoute(false, 'path', '/assests')}
                        {this.createRoute(false, 'path', '*', Event404)}
                    </Switch>
                </BrowserRouter>
            )
        }
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