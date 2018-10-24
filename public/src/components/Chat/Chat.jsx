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
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                    <Chatbox />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                    <Chatinput /> 
                    </div>
                    <div class="col-sm-2">
                    <Sendbutton />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;