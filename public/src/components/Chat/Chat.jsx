import React from 'react';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

class Chat extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <ChatBox socket={socket} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <ChatInput socket={socket} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;