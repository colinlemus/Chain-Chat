import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
        }
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
            password: this.state.username
        }

        axios.post('/api/forgot/', payload)
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
                                            <input type='text' className='form-control' name='username' placeholder='Username' required='required' value={this.state.username} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <button type='submit' value="Submit" className='btn btn-primary login-btn'>Request Reset</button>
                                            <button className='btn btn-light ml-3'>
                                            <Link to='/'>Login</Link>
                                            </button>
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
