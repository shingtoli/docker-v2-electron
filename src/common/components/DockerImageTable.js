import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import DockerTagsList from './DockerTagsList';

const DockerImageTable = ({ list }) => (
  <div>
    {list.map(image => (
      <Paper key={image.name}>
        {image.name}
        <DockerTagsList tags={image.tags} />
      </Paper>
    ))}
  </div>
);

DockerImageTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DockerImageTable;
