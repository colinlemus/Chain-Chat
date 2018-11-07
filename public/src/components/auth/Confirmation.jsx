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
                <div className='container'>
                    <div className="row">
                        <div className="col-sm-6 m-auto">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Verification Status</h5>
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
            <div className='container'>
                <div className="row ">
                    <div className="col-sm-6 m-auto">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Verification Status</h5>
                                <p className="card-text">Not verified!</p>
                                <a href="/" className="btn btn-primary">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
