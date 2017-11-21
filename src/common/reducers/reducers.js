const Reducer = (state = {
  url: '', username: '', password: '', images: [],
}, action) => {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.url };
    case 'SET_USERNAME':
      return { ...state, username: action.username };
    case 'SET_PASSWORD':
      return { ...state, password: action.password };
    case 'LIST_IMAGES':
      return { ...state, images: [...action.images] };
    default:
      return state;
  }
};

export default Reducer;