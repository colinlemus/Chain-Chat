import React, { Component } from 'react'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081')

export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        socket.emit('chat message', this.state.message);
        socket.on('chat message', (message) => {
            const news = [];
            news.push(message);
            console.log(news);
            this.setState({ messages: this.state.messages.push(news) })
            console.log(this.state.messages);
        });
    }
    handleMessages = () => {
        if (this.state.messages !== 0) {
            return (
                <div>
                    {this.state.messages.map((element, i) => {
                        return (
                            <div key={i}>{element}</div>
                        )
                    })
                    }
                </div>

            )

        }
    }

    render() {
        return (
            <div>
                <ul id="messages"></ul>
                <form onSubmit={this.handleOnSubmit}>
                    <input type='text' name='message' placeholder='msg here' required='required' value={this.state.message} onChange={this.handleInputChange} />

                    <button type='submit' value='submit'>Send</button>
                </form>
                <div>{this.handleMessages()}</div>
            </div>
        )
    }
}
