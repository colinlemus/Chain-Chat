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
        const query = url.substr(window.location.href.indexOf('/confirmation/'), (window.location.href.length - 1)).trim();
        axios.get(query).then(res => {
            this.setState({
                verified: res.data.verified
            });
        });
    }

    render() {
        if (this.state.verified) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <img src={require('../../assests/ChainChatLogo.png')} className="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-6 m-auto">
                        <div className="card">
                        <div class="card-header">
                            Verification Status
                        </div>
                        <div className="card-body m-auto">
                            <p className="card-text">Verified!</p>
                            <a href="/" className="btn btn-primary">Login</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <img src={require('../../assests/ChainChatLogo.png')} className="rounded mx-auto d-block" alt="Responsive" width='722px' height='282px' />
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-sm-6 m-auto">
                        <div className="card">
                        <div class="card-header">
                            Verification Status
                        </div>
                        <div className="card-body m-auto">
                            <p className="card-text"> Not Verified!</p>
                            <a href="/" className="btn btn-primary">Login</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        );
    }
}
