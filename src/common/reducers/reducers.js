import { States } from '../constants/states';

const Reducer = (state = {
  url: '', username: '', password: '', images: [], timestamp: '',
}, action) => {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.url };
    case 'SET_USERNAME':
      return { ...state, username: action.username };
    case 'SET_PASSWORD':
      return { ...state, password: action.password };
    case 'LIST_IMAGES':
      return { ...state, images: [...action.images], timestamp: action.timestamp };
    case 'SET_IMAGE_STATUS': {
      const images = [...state.images];
      try {
        images[action.index].isHidden = action.toState;
      } catch (e) {
        console.log(`Image not found at ${action.index}`);
      }
      return { ...state, images };
    }
    case 'SET_TAG_STATUS': {
      const images = [...state.images];
      try {
        images[action.imageIndex].tags[action.tagIndex] = action.toState % States.length;
      } catch (e) {
        console.log(`Image not found at ${action.index}`);
      }
      return { ...state, images };
    }
    default:
      return state;
  }
};

export default Reducer;
