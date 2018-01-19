import React from 'react';
import PropTypes from 'prop-types';
import DockerTag from './DockerTag';

const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const DockerTagsList = ({ imageIndex, tags }) => (
  <div style={styles.wrapper}>
    {tags.map((tag, tagIndex) => (
      <DockerTag imageIndex={imageIndex} tagIndex={tagIndex} key={`${imageIndex}_${tag.name}`} />
    ))}
  </div>
);

DockerTagsList.propTypes = {
  imageIndex: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DockerTagsList;
