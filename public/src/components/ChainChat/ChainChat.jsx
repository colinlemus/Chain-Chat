import React from 'react';
import Chat from '../Chat/Chat';
import Recorder from '../Recorder/Recorder.jsx';

class ChainChat extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 mb-3">
                        <img src={require('../../assests/ChainChatLogo.png')} className="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12 m-auto d-flex justify-content-end'>
                    <button href="/" className="btn btn-danger"> Logout! </button>
                    </div>
                </div>
                <Chat />
                <div className="row">
                    <div className="col-sm-6 pt-3 mt-4 mb-4">
                        <Recorder />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChainChat;
