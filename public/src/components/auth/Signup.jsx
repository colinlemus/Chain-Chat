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
            lastName: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var payload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        console.log(payload);
        axios.post('/api/signup/', payload)
            .then((response) => {
                console.log(response);
                this.props.history.push('/');
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='text-center'>
                            <div className='card'>
                                <div className='card-header font-weight-bold'>Sign up</div>
                                <div className='card-body'>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='username' placeholder='Username' required='required' value={this.state.username} onChange={this.handleInputChange} />
                                        </div>
                                        <div className='form-group'>
                                            <input type='text' className='form-control' name='password' placeholder='Password' required='required' value={this.state.password} onChange={this.handleInputChange} />
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
                                        <div className='form-group'>
                                            <button type='submit' value="Submit" className='btn btn-primary btn-lg btn-block'>Signup</button>
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

export default Signup;