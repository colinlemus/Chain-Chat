import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div>
                {this.props.user.map(element => {
                    return (
                        <div>{element}</div>
                    );
                })}
                {/* {this.props.user} */}
            </div>
        )
    }
}

Home.prototypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps, {})(Home);