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

    componentWillMount() {
        socket.on('chat message', (message) => {
            console.log('received ' + message)
            const messages = this.state.messages;
            const original = message.substr(0, message.indexOf('\n')); 
            const translated = message.substr(message.indexOf('\n'),  (message.length - 1));
            messages.push(original, translated);
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