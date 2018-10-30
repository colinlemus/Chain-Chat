import React from 'react';
import Icon from '@material-ui/icons';

class Endcallbutton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <button className="primary"> Send</button>
            </div>
        );
    }
}

export default Endcallbutton;