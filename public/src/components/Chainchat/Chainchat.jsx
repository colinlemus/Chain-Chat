import React from 'react';
import Videobox from '../Video/Videobox';
import Chat from '../Chat/Chat';

class Chainchat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="row">
                <h1> Welcome to Chain Chat! </h1>
            </div>
            <div class="row">
                <div class="col-sm-9">
                    <Videobox />
                </div>
                <div class="col-sm-3">
                    <Chat />
                </div>
            </div>
        );
    }
}

export default Chainchat;