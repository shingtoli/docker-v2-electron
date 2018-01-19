import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import { grey400, grey200, red900 } from 'material-ui/styles/colors';
import { States } from '../constants/states';
import { setTagStatus } from '../actions/actions';

const styles = {
  chip: {
    margin: 4,
  },
};

const chipColor = (state) => {
  switch (state) {
    case States.DIMMED:
      return grey200;
    case States.HIGHLIGHT:
      return red900;
    default:
      return grey400;
  }
};

const stateToggleHandler = tag =>
  (tag.state === States.HIGHLIGHT ? States.NORMAL : States.HIGHLIGHT);

const mapStateToProps = ((state, props) => ({
  tag: state.images[props.imageIndex].tags[props.tagIndex],
  update: state.update,
}));

const mapDispatchToProps = dispatch => ({
  setTagStatusHandler: (imageIndex, tagName, toState) =>
    dispatch(setTagStatus(imageIndex, tagName, toState)),
});

const DockerTag = ({
  imageIndex, tagIndex, tag, setTagStatusHandler,
}) => (
  <Chip
    backgroundColor={chipColor(tag.state)}
    style={styles.chip}
    onClick={() => setTagStatusHandler(imageIndex, tagIndex, stateToggleHandler(tag))}
  >
    {tag.name}
  </Chip>
);

DockerTag.propTypes = {
  imageIndex: PropTypes.number.isRequired,
  tagIndex: PropTypes.number.isRequired,
  tag: PropTypes.shape({
    name: PropTypes.string.isRequired,
    state: PropTypes.number,
    val: PropTypes.number.isRequired,
  }).isRequired,
  setTagStatusHandler: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DockerTag);
