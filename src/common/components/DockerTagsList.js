import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const DockerTagsList = ({ tags }) => (
  <div style={styles.wrapper}>
    {tags.map(tag => <Chip key={tag} style={styles.chip}>{tag}</Chip>)}
  </div>
);

DockerTagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DockerTagsList;
