import { States } from '../constants/states';
import { writeDataFile } from '../datastore/controller';

const writePassthrough = (nstate) => {
  writeDataFile(nstate);
  return nstate;
};

const Reducer = (state = {
  url: '', username: '', password: '', images: [], timestamp: '', showHidden: false,
}, action) => {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.url };
    case 'SET_USERNAME':
      return { ...state, username: action.username };
    case 'SET_PASSWORD':
      return { ...state, password: action.password };
    case 'SET_IMAGE_DISPLAY':
      return { ...state, showHidden: action.toState };
    case 'LIST_IMAGES':
      return writePassthrough({
        ...state, images: [...action.images], timestamp: action.timestamp,
      });
    case 'SET_IMAGE_STATUS': {
      const images = [...state.images];
      try {
        images[action.index].isHidden = action.toState;
      } catch (e) {
        console.log(`Image not found at ${action.index}`);
      }
      return writePassthrough({ ...state, images, update: new Date() });
    }
    case 'SET_TAG_STATUS': {
      const images = [...state.images];
      try {
        const tags = [...state.images[action.imageIndex].tags];
        tags[action.tagIndex].state = action.toState % Object.keys(States).length;
        images[action.imageIndex].tags = tags;
      } catch (e) {
        console.log(`Image not found at ${action.index}`);
      }
      return writePassthrough({ ...state, images, update: new Date() });
    }
    default:
      return state;
  }
};

export default Reducer;
