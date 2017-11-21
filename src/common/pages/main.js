'use babel';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUrl, setUsername, setPassword, fetchImages } from '../actions/actions';
import ConnectionBar from '../components/ConnectionBar';
import DockerImageTable from '../components/DockerImageTable';

const mapStateToProps = state => ({
  images: state.images,
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
});

const Main = ({
  images, connection, urlHandler, usernameHandler, passwordHandler, connectionHandler,
}) => (
  <div>
    <ConnectionBar
      urlHandler={urlHandler}
      usernameHandler={usernameHandler}
      passwordHandler={passwordHandler}
      connectionHandler={() => connectionHandler(connection)}
    />
    <DockerImageTable list={images} />
  </div>
);

Main.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  connection: PropTypes.shape({
    url: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  urlHandler: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
  connectionHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
