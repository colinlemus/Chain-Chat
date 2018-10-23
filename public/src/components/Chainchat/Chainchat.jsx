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
            <div className="container">
                <div className="row">
                    <h1> Welcome to Chain Chat! </h1>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Username />
                    </div>
                    <div className="col-sm-6">
                        <Language />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Chat />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Recorder />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chainchat;