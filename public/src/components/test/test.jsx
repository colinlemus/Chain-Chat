import React, { Component } from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

export default class test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount() {
        socket.on('chat message', (message) => {
            console.log('received ' + message)
            const messages = this.state.messages;
            messages.push(message);
            this.setState({ messages })
        });
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log("Submit handler");
        socket.emit('chat message', this.state.message);
    }

    handleMessages = () => {
        if (this.state.messages.length !== 0) {
            return (
                <div>{this.state.messages.map((element, i) => {
                    return (
                        <div key={i}>{element}</div>
                    );
                })}
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <input type='text' name='message' placeholder='msg here' required='required' value={this.state.message} onChange={this.handleInputChange} />

                    <button type='submit' value='submit'>Send</button>
                </form>
                <div>{this.handleMessages()}</div>
            </div>
        )
    }
}
