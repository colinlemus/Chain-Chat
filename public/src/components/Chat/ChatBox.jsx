import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        this.props.socket.on('chat message', (message) => {
            const username = message.substr(0, message.indexOf('\n')).trim();
            const chatMessage = message.substr(message.indexOf('\n'), (message.length - 1)).trim();
            axios.post(`/api/translate/${chatMessage}/${username}/${this.props.chat.language}`)
                .then(data => {
                    const recievedMessage = data.data.message;
                    const recievedTranslation = data.data.translation;
                    const recievedUsername = data.data.username;
                    const messages = this.state.messages;
                    const original = `Original Message: ${recievedUsername}: ${recievedMessage}`; 
                    const translated = `Translated Message: ${recievedUsername}: ${recievedTranslation}`; 
                    messages.push(original, translated);
                    this.setState({ messages });
                })
                .catch(err => console.log(err));
        });
    }

    handleMessages = () => {
        if (this.state.messages.length !== 0) {
            return (
                <div>{this.state.messages.map((element, i) => {
                    return (
                        <div key={i}>{element}</div>
                    );
                })}
                </div>
            );
        }
    }

    render() {
        return (
            <div>{this.handleMessages()}</div>
        );
    }
}

ChatBox.propTypes = {
    user: PropTypes.object,
    chat: PropTypes.object
};


const mapStateToProps = state => ({
    user: state.user,
    chat: state.chat
});

export default connect(mapStateToProps, {})(ChatBox);
