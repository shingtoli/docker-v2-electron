import React from 'react';
import PropTypes from 'prop-types';
import DockerImageItem from './DockerImageItem';

const DockerImageTable = ({ list, timestamp, showHidden }) => (
  <div>
    <span>Last fetched: {timestamp}</span>
    {list.map((image, index) => {
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
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  timestamp: PropTypes.string.isRequired,
  showHidden: PropTypes.bool.isRequired,
};

export default DockerImageTable;
