import React from 'react';
import Chatbox from './Chatbox';
import Chatinput from './Chatinput';
import Sendbutton from './Sendbutton';

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="row">
                <Chatbox />
            </div>
            <div class="row">
                <Chatinput /> <Sendbutton />
            </div>
        );
    }
}

export default Chat;