import React from 'react';
import Chat from '../Chat/Chat';
import Recorder from '../Recorder/Recorder.jsx';

class ChainChat extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <img src='./ChainChatLogo.png' className="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-sm-6">
                        <Username />
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-sm-12">
                        <Chat />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 pt-3 pl-4">
                        <Recorder />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChainChat;