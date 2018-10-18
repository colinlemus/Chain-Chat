import React from 'react';
import Username from './Username';

class Videobox extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-sm-6">
                        <video id="localVideo" autoplay playsinline></video>
                    </div>
                    <div class="col-sm-6">
                        <video id="remoteVideo" autoplay playsinline></video>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6">
                        <Username />
                        <div class="row">
                            <button id="startButton">Start</button>
                            <button id="callButton">Call</button>
                            <button id="hangupButton">Hang Up</button>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <Username />
                    </div>
                </div>

            </div>
        );
    }
}

export default Videobox;