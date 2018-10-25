import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

// handleOnSubmit = (event) => {
//     event.preventDefault();
//     console.log("Submit handler");
//     socket.emit('chat message', this.state.message);
// }

function Sendbutton(props) {
    const { classes } = props;
    return (
        <div>
            <Button variant="fab" color="primary" aria-label="Send" className={classes.button}>
                <Send />
            </Button>
        </div>
    );
}

Sendbutton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sendbutton);