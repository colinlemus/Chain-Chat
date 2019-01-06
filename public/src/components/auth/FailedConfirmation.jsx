import React, { Component } from 'react';

export default class Confirmation extends Component {
    handleRedirect = (event) => {
        this.props.history.push(event.target.name);
    }

    render() {
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
                            <div class="card-header text-center font-weight-bold">
                                Verification Status
                            </div>
                            <div className="card-body text-center">
                                <p className="card-text">Not Verified!</p>
                                <button className="btn btn-primary" name='/' onClick={this.handleRedirect}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
