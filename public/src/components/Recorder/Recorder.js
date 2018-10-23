import React from 'react';
import Listenrec from './Listenrec';
import Startrec from './Startrec';
import Endrec from './Endrec';
import Sendrec from './Sendrec';
// import { speechToText } from '../../utilities/Speech'
// import * as record from 'node-record-lpcm16';
import axios from 'axios';

class Recorder extends React.Component { 
    record=null;
    constructor(props) {
        super(props);
        this.clickHandler=this.clickHandler.bind(this)
        
    }
    
    clickHandler () {

        // this.speechToText();
    }
    endRecord() {
        // this.record.stop;
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <Startrec onClick={this.clickHandler} />
                    </div>
                    <div className="col-sm-3">
                        <Endrec onClick={this.endRecord}/>
                    </div>
                    <div className="col-sm-3">
                        <Listenrec />
                    </div>
                    <div className="col-sm-3">
                        <Sendrec />
                    </div>
                </div>
            </div>
        );
    }
}

export default Recorder;