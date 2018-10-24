import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import PlayArrow from '@material-ui/icons/PlayArrow'
import Send from '@material-ui/icons/Send';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function Recorder(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="fab" color="primary" aria-label="Listen" className={classes.button}>
        <Mic />
      </Button>
      <Button variant="fab" color="secondary" aria-label="Stop" className={classes.button}>
        <MicOff />
      </Button>
      <Button variant="fab" color="primary" aria-label="Listen" className={classes.button}>
        <PlayArrow />
      </Button>
      <Button variant="fab" color="inherit" aria-label="Send" className={classes.button}>
        <Send />
      </Button>
    </div>
  );
}

Recorder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Recorder);