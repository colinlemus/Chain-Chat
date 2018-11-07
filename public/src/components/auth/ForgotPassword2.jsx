import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeForgotSession } from '../../redux/actions/auth/authAction';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            secondPassword: '',
            changed: '',
            match: ''
        }
    }

    componentWillMount = () => {
        this.props.initializeForgotSession();
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.newPassword !== this.state.secondPassword) {
            this.setState({
                match: 'These two passwords do not match, please enter the same passwords'
            });
            return;
        }

        const payload = {
            password: this.state.newPassword,
        }

        axios.post('/api/newPass/', payload)
            .then(() => {
                this.setState({
                    changed: 'Your password has been successfully changed, you will be redirected shortly!',
                    match: ''
                });

                setTimeout(() => {
                    this.props.history.push('/');
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleRedirect = (event) => {
        this.props.history.push(event.target.name);
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mb-3'>
                        <img src={require('../../assests/ChainChatLogo.png')} class="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6 m-auto'>
                        <div className='text-center'>
                            <div className='card'>
                                <div className='card-header font-weight-bold'>Forgot Password</div>
                                <div className='card-body'>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='form-group'>
                                            <input type='password' className='form-control' name='newPassword' placeholder='Password' required='required' value={this.state.newPassword} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='password' className='form-control' name='secondPassword' placeholder='Please re-enter your password.' required='required' value={this.state.secondPassword} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <button className='btn btn-light' onClick={this.handleRedirect} name='/'>
                                                Login
                                            </button>
                                            <button type='submit' value="Submit" className='btn btn-primary login-btn ml-3'>Reset Password</button>
                                        </div>
                                        <div style={{ marginTop: '2vh' }}>{this.state.changed}</div>
                                        <div style={{ marginTop: '2vh' }}>{this.state.match}</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ForgotPassword.prototypes = {
    initializeForgotSession: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { initializeForgotSession })(ForgotPassword);