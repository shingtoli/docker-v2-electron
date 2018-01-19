import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentArchive from 'material-ui/svg-icons/content/archive';
import { setImageStatus } from '../actions/actions';
import DockerTagsList from './DockerTagsList';

const mapDispatchToProps = dispatch => ({
  setImageStatusHandler: (index, status) => dispatch(setImageStatus(index, status)),
});

const DockerImageItem = ({ image, index, setImageStatusHandler }) => (
  <Paper>
    {image.name}
    <FloatingActionButton
      mini
      style={{ float: 'right' }}
      onClick={() => setImageStatusHandler(index, !image.isHidden)}
    >
      <ContentArchive />
    </FloatingActionButton>
    <DockerTagsList
      imageIndex={index}
      tags={image.tags}
    />
  </Paper>
);

DockerImageItem.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object),
    isHidden: PropTypes.boolean,
  }).isRequired,
  index: PropTypes.number.isRequired,
  setImageStatusHandler: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DockerImageItem);
