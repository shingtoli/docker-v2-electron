import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DockerImageItem from './DockerImageItem';

const mapStateToProps = state => ({
  images: state.images,
  timestamp: state.timestamp,
  showHidden: state.showHidden,
});

const DockerImageTable = ({ images, timestamp, showHidden }) => (
  <div>
    <span>Last fetched: {timestamp}</span>
    {images.map((image, index) => {
      if (!showHidden && image.isHidden) {
        return null;
      }
      return (
        <DockerImageItem image={image} index={index} key={image.name} />
      );
    })}
  </div>
);

DockerImageTable.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  timestamp: PropTypes.string.isRequired,
  showHidden: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(DockerImageTable);
