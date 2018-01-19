export const setUrl = url => ({
  type: 'SET_URL',
  url,
});

export const setUsername = username => ({
  type: 'SET_USERNAME',
  username,
});

export const setPassword = password => ({
  type: 'SET_PASSWORD',
  password,
});

export const setImageDisplay = toState => ({
  type: 'SET_IMAGE_DISPLAY',
  toState,
});

export const setImageStatus = (index, toState) => ({
  type: 'SET_IMAGE_STATUS',
  index,
  toState,
});

export const setTagStatus = (imageIndex, tagIndex, toState) => ({
  type: 'SET_TAG_STATUS',
  imageIndex,
  tagIndex,
  toState,
});
