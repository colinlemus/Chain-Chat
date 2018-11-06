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
            secondPassword: ''
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
            console.log('Passwords do not match');
            return;
        }

        const payload = {
            password: this.state.newPassword,
        }

        axios.post('/api/newPass/', payload)
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12 mb-3'>
                        <img src='./ChainChatLogo.png' class="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
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
                                            <input type='text' className='form-control' name='newPassword' placeholder='Password' required='required' value={this.state.newPassword} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='secondPassword' placeholder='Please re-enter your password.' required='required' value={this.state.secondPassword} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <button type='submit' value="Submit" className='btn btn-primary login-btn'>Reset Password</button>
                                            <button className='btn btn-light ml-3'><Link to='/'>Login</Link></button>
                                        </div>
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
