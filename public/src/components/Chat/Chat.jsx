import React from 'react';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

class Chat extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                        <ChatBox socket={socket} />
                </div>
                <ChatInput socket={socket} />
            </div>
        );
    }
}

export default Chat;