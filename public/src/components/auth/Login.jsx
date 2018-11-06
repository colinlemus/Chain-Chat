import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLogin } from '../../redux/actions/auth/authAction';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            factorAuth: ''
        }
    }

    handleFactorAuth = (factorAuth) => {
        if (factorAuth) {
            return (
                <span>true</span>
            );
        }

        return (
            <span>false</span>
        );
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.fetchLogin(payload);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <img src='./ChainChatLogo.png' class="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 m-auto'>
                        <div className='text-center'>
                            <div className='card'>
                                <div className='card-header font-weight-bold'>Login</div>
                                <div className='card-body'>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='username' placeholder='Username' required='required' value={this.state.username} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='password' className='form-control' name='password' placeholder='Password' required='required' value={this.state.password} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <button type="button" className='btn btn-light mr-3'>
                                                <Link to='/register'>Sign up</Link>
                                            </button>
                                            <button type="button" className='btn btn-light  mr-3'>
                                                <Link to='/forgot'>Forgot Password</Link>
                                            </button>
                                            <button type='submit' value="Submit" className='btn btn-primary login-btn'>Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                            <div className='m-2 p-3'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.prototypes = {
    fetchLogin: PropTypes.func.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { fetchLogin })(Login);