import React from 'react';
import Chat from '../Chat/Chat';
import Username from './Username';
import Language from '../Language/Language';
import Recorder from '../Recorder/Recorder';


class Chainchat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="container">
                <div class="row">
                    <h1> Welcome to Chain Chat! </h1>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <Username />
                    </div>
                    <div class="col-sm-6">
                        <Language />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <Chat />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <Recorder />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chainchat;