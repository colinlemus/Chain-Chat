import React from 'react';
import Listenrec from './Listenrec';
import Startrec from './Startrec';
import Endrec from './Endrec';
import Sendrec from './Sendrec';
// import { speechToText } from '../../utilities/Speech'
// import * as record from 'node-record-lpcm16';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Send from '@material-ui/icons/Send';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class Recorder extends React.Component {
    record = null;
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        axios.post('http://localhost:8080/api/record')
            .then((response) => {
                console.log('client side post', response);
            })
    }
    endRecord() {
        // this.record.stop;
    }

    render() {
        return (
            <div>
                <Button variant="fab" color="primary" aria-label="Listen" onClick={this.clickHandler} >
                    <Mic />
                </Button>
                <Button variant="fab" color="secondary" aria-label="Stop" onClick={this.endRecord} >
                    <MicOff />
                </Button>
            </div>
        );
    }
}

Recorder.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Recorder);