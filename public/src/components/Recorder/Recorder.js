import React from 'react';
import Listenrec from './Listenrec';
import Startrec from './Startrec';
import Endrec from './Endrec';
import Sendrec from './Sendrec';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Send from '@material-ui/icons/Send';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

const languages = [
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'es',
        label: 'Spanish',
    },
    {
        value: 'de',
        label: 'German',
    },
    {
        value: 'la',
        label: 'Latin',
    },
];

class Recorder extends React.Component {
    record = null;
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this)
    }
    state = {
        language: 'en',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    clickHandler() {
        axios.post('/api/record/' + this.state.language)
            .then((response) => {
                console.log('client side post', response);
            })
    }
    endRecord() {
        // this.record.stop;    
    }

    render() {
        const { classes } = this.props;
        
        return (
            <div class='row'>
                <div>
                    <Button variant="fab" color="primary" aria-label="Listen" onClick={this.clickHandler} >
                        <Mic />
                    </Button>
                    <Button variant="fab" color="secondary" aria-label="Stop" onClick={this.endRecord} >
                        <MicOff />
                    </Button>
                </div>

                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-select-language"
                    select
                    label="Language Selector"
                    className={classes.textField}
                    value={this.state.language}
                    onChange={this.handleChange('language')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select your language"
                    margin="normal"
                >
                    {languages.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
        </div>    
        );
    }
}

Recorder.propTypes = {
    classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(Recorder);

