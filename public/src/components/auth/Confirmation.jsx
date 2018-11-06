import React, { Component } from 'react';
import axios from 'axios';

export default class Confirmation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            verified: false
        }
    }

    componentDidMount = () => {
        const url = window.location.href;
        console.log(url);
        axios.get(url).then(res => {
            this.setState({
                verified: res.data.verified
            });
        });
    }

    render() {
        if (this.state.verified) {
            return (
                <div>Verified!</div>
            );
        }

        return (
            <div>Not verified!</div>
        );
    }
}
