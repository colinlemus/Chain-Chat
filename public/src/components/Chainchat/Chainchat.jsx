import React from 'react';
import Chat from '../Chat/Chat';
import Username from './Username';
import Language from '../Language/Language';
import Recorder from '../Recorder/Recorder.js';


class Chainchat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-12">
                    <img src='./ChainChatLogo.png' class="rounded mx-auto d-block" alt="Responsive image" width='722px' height='282px'/>
                </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Username />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Chat />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 pt-3 pl-4">
                        <Recorder />
                    </div>
                    <div className="col-sm-6">
                        <Language />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chainchat;