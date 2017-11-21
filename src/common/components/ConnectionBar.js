import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const ConnectionBar = ({
  urlHandler, usernameHandler, passwordHandler, connectionHandler,
}) => (
  <Paper>
    <TextField floatingLabelText="Base URL" onChange={(e, v) => urlHandler(v)} />
    <TextField floatingLabelText="Username" onChange={(e, v) => usernameHandler(v)} />
    <TextField
      floatingLabelText="Password"
      type="password"
      onChange={(e, v) => passwordHandler(v)}
    />
    <RaisedButton label="Connect" primary onClick={connectionHandler} />
  </Paper>
);

ConnectionBar.propTypes = {
  urlHandler: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
  connectionHandler: PropTypes.func.isRequired,
};

export default ConnectionBar;
