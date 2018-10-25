import React from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

class Chatbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            <div>{this.handleMessages()}</div>
        );
    }
}

export default Chatbox;