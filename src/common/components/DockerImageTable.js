import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import DockerTagsList from './DockerTagsList';

const DockerImageTable = ({ list, timestamp }) => (
  <div>
    <span>Last fetched: {timestamp}</span>
    {list.map(image => (
      <Paper key={image.name}>
        {image.name}
        <DockerTagsList
          tags={image.tags.slice().sort((a, b) => a.localeCompare(b, { numeric: true }))}
        />
      </Paper>
    ))}
  </div>
);

DockerImageTable.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default DockerImageTable;
