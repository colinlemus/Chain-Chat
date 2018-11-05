import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import axios from 'axios';

class ChatInput extends React.Component {
    state = {
        message: ''
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleOnSubmit = (event) => {
        event.preventDefault();

        const payload = {
            message: this.state.message,
            username: this.props.user.username ? this.props.user.username : 'test'
        }

        axios.post('/api/message/', payload)
            .then((response) => {
                console.log('client side post', response);
            });

        this.setState({
            message: ''
        });
    }

    render() {

        return (
            <div className="row">
                <form noValidate autoComplete="off" onSubmit={this.handleOnSubmit}>
                    <TextField
                        id="standard-full-width"
                        className='col-sm-8'
                        label="Chat"
                        value={this.state.message}
                        onChange={this.handleChange('message')}
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button className='col-sm-4' variant="fab" color="primary" aria-label="Send" onClick={this.handleOnSubmit}>
                        <Send />
                    </Button>
                </form>
            </div>
        );
    }
}

ChatInput.prototypes = {
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(ChatInput);
