import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { setLanguage } from '../../redux/actions/chat/chatAction';
import Grid from '@material-ui/core/Grid';
import { ReactMic } from 'react-mic';
// import RecordRTC from 'recordrtc';
var RecordRTC = require('recordrtc');
const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;

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
        value: 'af',
        label: 'Afrikaans',
    },
    {
        value: 'sq',
        label: 'Albanian',
    },
    {
        value: 'ar',
        label: 'Arabic',
    },
    {
        value: 'az',
        label: 'Azerbaijani',
    },
    {
        value: 'eu',
        label: 'Basque',
    },
    {
        value: 'be',
        label: 'Belarusian',
    },
    {
        value: 'bg',
        label: 'Bulgarian',
    },
    {
        value: 'ca',
        label: 'Catalan',
    },
    {
        value: 'bn',
        label: 'Bengali',
    },
    {
        value: 'zh-CN',
        label: 'Chinese Simplified',
    },
    {
        value: 'zh-TW',
        label: 'Chinese Traditional',
    },
    {
        value: 'hr',
        label: 'Croatian',
    },
    {
        value: 'cs',
        label: 'Czech',
    },
    {
        value: 'da',
        label: 'Danish',
    },
    {
        value: 'nl',
        label: 'Dutch',
    },
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'eo',
        label: 'Esperanto',
    },
    {
        value: 'et',
        label: 'Estonian',
    },
    {
        value: 'tl',
        label: 'Filipino',
    },
    {
        value: 'fi',
        label: 'Finnish',
    },
    {
        value: 'fr',
        label: 'French',
    },
    {
        value: 'gl',
        label: 'Galician',
    },
    {
        value: 'ka',
        label: 'Georgian',
    },
    {
        value: 'de',
        label: 'German',
    },
    {
        value: 'el',
        label: 'Greek',
    },
    {
        value: 'gu',
        label: 'Gujarati',
    },
    {
        value: 'ht',
        label: 'Haitian Creole',
    },
    {
        value: 'iw',
        label: 'Hebrew',
    },
    {
        value: 'hi',
        label: 'Hindi',
    },
    {
        value: 'hu',
        label: 'Hungarian',
    },
    {
        value: 'is',
        label: 'Icelandic',
    },
    {
        value: 'id',
        label: 'Indonesian',
    },
    {
        value: 'ga',
        label: 'Irish',
    },
    {
        value: 'it',
        label: 'Italian',
    },
    {
        value: 'ja',
        label: 'Japanese',
    },
    {
        value: 'kn',
        label: 'Kannada',
    },
    {
        value: 'ko',
        label: 'Korean',
    },
    {
        value: 'la',
        label: 'Latin',
    },
    {
        value: 'lv',
        label: 'Latvian',
    },
    {
        value: 'lt',
        label: 'Lithuanian',
    },
    {
        value: 'mk',
        label: 'Macedonian',
    },
    {
        value: 'ms',
        label: 'Malay',
    },
    {
        value: 'mt',
        label: 'Maltese',
    },
    {
        value: 'no',
        label: 'Norwegian',
    },
    {
        value: 'fa',
        label: 'Persian',
    },
    {
        value: 'pl',
        label: 'Polish',
    },
    {
        value: 'pt',
        label: 'Protuguese',
    },
    {
        value: 'ro',
        label: 'Romanian',
    },
    {
        value: 'ru',
        label: 'Russian',
    },
    {
        value: 'sr',
        label: 'Serbian',
    },
    {
        value: 'sk',
        label: 'Slovak',
    },
    {
        value: 'sl',
        label: 'Slovenian',
    },
    {
        value: 'es',
        label: 'Spanish',
    },
    {
        value: 'sw',
        label: 'Swahili',
    },
    {
        value: 'sv',
        label: 'Swedish',
    },
    {
        value: 'ta',
        label: 'Tamil',
    },
    {
        value: 'te',
        label: 'Telugu',
    },
    {
        value: 'th',
        label: 'Thai',
    },
    {
        value: 'tr',
        label: 'Turkish',
    },
    {
        value: 'uk',
        label: 'Ukrainian',
    },
    {
        value: 'ur',
        label: 'Urdu',
    },
    {
        value: 'vi',
        label: 'Vietnamese',
    },
    {
        value: 'cy',
        label: 'Welsh',
    },
    {
        value: 'yi',
        label: 'Yiddish',
    },
];

class Recorder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: 'en',
            record: false
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });

        if (name === 'language') {
            this.props.setLanguage(event.target.value);
        }
    };

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        // axios.post(`/api/record/${this.props.chat.language}/${this.props.user.username}`, recordedBlob)
        //     .then((response) => {
        //         console.log('client side post', response);
        //     })
        axios.post(`/api/record/en/testing123`, recordedBlob)
            .then((response) => {
                console.log('client side post', response);
            })
    }

    startRecord = () => {
        this.setState({
            record: true
        });
    }

    endRecord = () => {
        this.setState({
            record: false
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#f5f5f5"
                    backgroundColor="#3F51B5" />
                </Grid>                
                <Grid item xs={4} className='mt-3'>
                    <Button variant="fab" color="primary" aria-label="Listen" onClick={this.startRecord} >
                        <Mic />
                    </Button>
                    <Button variant="fab" color="secondary" aria-label="Stop" onClick={this.endRecord} >
                        <MicOff />
                    </Button>
                </Grid>

                <Grid item xs={8}>
                    <div>
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
                </Grid>
            </Grid>
        );
    }
}

Recorder.propTypes = {
    classes: PropTypes.object.isRequired,
    setLanguage: PropTypes.func.isRequired,
    user: PropTypes.object,
    chat: PropTypes.object
};


const mapStateToProps = state => ({
    user: state.user,
    chat: state.chat
});


export default connect(mapStateToProps, { setLanguage })(withStyles(styles)(Recorder));