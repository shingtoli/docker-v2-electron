import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import { setUrl, setUsername, setPassword, setImageDisplay } from '../actions/actions';
import { fetchImages } from '../actions/fetch';

const mapStateToProps = state => ({
  connection: {
    url: state.url,
    username: state.username,
    password: state.password,
  },
});

const mapDispatchToProps = dispatch => ({
  urlHandler: url => dispatch(setUrl(url)),
  usernameHandler: username => dispatch(setUsername(username)),
  passwordHandler: password => dispatch(setPassword(password)),
  connectionHandler: connection => dispatch(fetchImages(connection)),
  showHiddenHandler: toState => dispatch(setImageDisplay(toState)),
});

const ConnectionBar = ({
  connection, urlHandler, usernameHandler,
  passwordHandler, connectionHandler, showHiddenHandler,
}) => (
  <Paper>
    <div>
      <TextField floatingLabelText="Base URL" onChange={(e, v) => urlHandler(v)} />
      <TextField floatingLabelText="Username" onChange={(e, v) => usernameHandler(v)} />
      <TextField
        floatingLabelText="Password"
        type="password"
        onChange={(e, v) => passwordHandler(v)}
      />
      <RaisedButton label="Connect" primary onClick={() => connectionHandler(connection)} />
    </div>
    <div>
      <Toggle
        label="Show Hidden"
        labelPosition="right"
        onToggle={(e, isChk) => showHiddenHandler(isChk)}
      />
    </div>
  </Paper>
);

ConnectionBar.propTypes = {
  connection: PropTypes.shape({
    url: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  urlHandler: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
  connectionHandler: PropTypes.func.isRequired,
  showHiddenHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionBar);
