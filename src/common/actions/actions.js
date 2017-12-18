import axios from 'axios';

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

export const listImages = (images, timestamp) => ({
  type: 'LIST_IMAGES',
  images,
  timestamp,
});

export const fetchImages = connection => dispatch =>
  axios({
    method: 'get',
    url: `https://${connection.url}/v2/_catalog`,
    auth: connection,
  })
    .then((res) => {
      const { repositories } = res.data;
      const promiseList = repositories.map(async (repo) => {
        const resa = await axios({
          method: 'get',
          url: `https://${connection.url}/v2/${repo}/tags/list`,
          auth: connection,
        });
        const { tags } = resa.data;
        return {
          name: repo,
          tags,
        };
      });

      Promise.all(promiseList)
        .then((values) => {
          dispatch(listImages(values, (new Date()).toLocaleString()));
        })
        .catch(errc => console.error(errc));
    })
    .catch(err => console.error(err));
