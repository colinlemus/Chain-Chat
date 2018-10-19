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

    componentDidMount = () => {
        setTimeout(() => {
            console.log(this.props.user);
        }, 2000);
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
                                            <input type='text' className='form-control' name='factorAuth' placeholder='2 Factor Authentication' value={this.state.factorAuth} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <button type='submit' value="Submit" className='btn btn-primary btn-lg btn-block login-btn'>Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <Link to='/signup'>Sign up</Link>
                            <Link to='/forgot'>Forgot Password</Link>
                            <div>
                                ID: {this.props.user.id}
                            </div>
                            <div>
                                Username: {this.props.user.username}
                            </div>
                            <div>
                                Password: {this.props.user.password}
                            </div>
                            <div>
                                Email: {this.props.user.email}
                            </div>
                            <div>
                                First Name: {this.props.user.firstName}
                            </div>
                            <div>
                                Last Name: {this.props.user.lastName}
                            </div>
                            <div>
                                2 Factor Auth: {this.handleFactorAuth(this.props.user.factorAuth)}
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