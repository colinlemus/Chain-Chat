import React from 'react';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import openSocket from 'socket.io-client';
import Grid from '@material-ui/core/Grid'

const socket = openSocket('https://chainchat.colinlem.us:8081');

class Chat extends React.Component {
    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                        <ChatBox socket={socket} />
                </Grid>
                <ChatInput socket={socket} />
            </Grid>
        );
    }
}

export default Chat;