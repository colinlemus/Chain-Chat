import React from 'react';
import Listenrec from './Listenrec';
import Startrec from './Startrec';
import Endrec from './Endrec';
import Sendrec from './Sendrec';

class Recorder extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-sm-3">
                        <Startrec />
                    </div>
                    <div class="col-sm-3">
                        <Endrec />
                    </div>
                    <div class="col-sm-3">
                        <Listenrec />
                    </div>
                    <div class="col-sm-3">
                        <Sendrec />
                    </div>
                </div>
            </div>
        );
    }
}

export default Recorder;