import React from 'react';
import Chatbox from './Chatbox';
import Chatinput from './Chatinput';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8081');

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                    <Chatbox socket={socket}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                    <Chatinput socket={socket}/> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;