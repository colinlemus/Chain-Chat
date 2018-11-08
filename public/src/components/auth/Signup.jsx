import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            signed: '',
            usernameLength: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.username.length >= 11) {
            this.setState({
                usernameLength: 'Please keep your username between 1 - 10 characters.'
            });

            return;
        }

        const payload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        }

        axios.post('/api/signup/', payload)
            .then(() => {
                this.setState({
                    signed: 'An email has been sent to your newly created account, you will be redirected shortly!',
                    usernameLength: ''
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
                    <div className='col-12'>
                        <img src={require('../../assests/ChainChatLogo.png')} class="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6 m-auto'>
                        <div className='text-center'>
                            <div className='card'>
                                <div className='card-header font-weight-bold'>Sign up</div>
                                <div className='card-body'>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='username' placeholder='Username' required='required' value={this.state.username} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='password' className='form-control' name='password' placeholder='Password' required='required' value={this.state.password} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='email' placeholder='Email' required='required' value={this.state.email} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='firstName' placeholder='First Name' required='required' value={this.state.firstName} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='lastName' placeholder='Last Name' required='required' value={this.state.lastName} onChange={this.handleInputChange} />
                                        </div>
                                        <div>
                                            <button className='btn btn-light mr-3' onClick={this.handleRedirect} name='/'>Login</button>
                                            <button type='submit' value="Submit" className='btn btn-primary'>Sign up</button>
                                        </div>
                                        <div style={{ marginTop: '2vh' }}>{this.state.signed}</div>
                                        <div style={{ marginTop: '2vh' }}>{this.state.usernameLength}</div>
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

export default Signup;