import React from 'react';
import Icon from '@material-ui/icons';
import axios from 'axios';

class Callbutton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        axios.post('/api/record')
        .then((response) => {
            console.log('client side post', response);
        })
    }
    
    render() {
        return (
            <div>
                <button 
                    className="primary"
                    onClick={this.handleClick}
                >
                    Start Record
                </button>
            </div>
        );
    }
}

export default Callbutton;