import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import { grey400, blue400, red900 } from 'material-ui/styles/colors';
import { States } from '../constants/states';
import { setTagStatus } from '../actions/actions';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const chipColor = (state) => {
  switch (state) {
    case States.DIMMED:
      return grey400;
    case States.HIGHLIGHT:
      return red900;
    default:
      return blue400;
  }
};

const stateToggleHandler = tag => (tag.state === States.DIMMED ? States.NORMAL : States.DIMMED);

const mapDispatchToProps = dispatch => ({
  setTagStatusHandler: (imageIndex, tagName, toState) =>
    dispatch(setTagStatus(imageIndex, tagName, toState)),
});

const DockerTagsList = ({ imageIndex, tags, setTagStatusHandler }) => (
  <div style={styles.wrapper}>
    {tags.slice().sort((a, b) => (b.val - a.val))
      .map(tag => (
        <Chip
          backgroundColor={chipColor(tag.state)}
          key={`${imageIndex}_${tag.name}`}
          style={styles.chip}
          onClick={() => {
            setTagStatusHandler(imageIndex, tag.name, stateToggleHandler(tag));
          }}
        >
          {tag.name}
        </Chip>
    ))}
  </div>
);

DockerTagsList.propTypes = {
  imageIndex: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    state: PropTypes.number.isRequired,
    val: PropTypes.number.isRequired,
  })).isRequired,
  setTagStatusHandler: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DockerTagsList);
