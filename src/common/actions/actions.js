import axios from 'axios';
import { readAndMergeDataFile } from '../datastore/controller';
import { States } from '../constants/states';

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

export const setImageStatus = (index, toState) => ({
  type: 'SET_IMAGE_STATUS',
  index,
  toState,
});

export const setTagStatus = (imageIndex, tagName, toState) => ({
  type: 'SET_TAG_STATUS',
  imageIndex,
  tagName,
  toState,
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
        const tags = resa.data.tags.map((tag) => {
          const tagValue = parseInt(tag, 10);
          return {
            name: tag,
            state: States.NORMAL,
            val: Number.isNaN(tagValue) ? -1 : tagValue,
          };
        });
        return {
          name: repo,
          tags,
        };
      });

      Promise.all(promiseList)
        .then((values) => {
          readAndMergeDataFile(values)
            .then(mergeDB => dispatch(listImages(mergeDB, (new Date()).toLocaleString())));
        })
        .catch(errc => console.error(errc));
    })
    .catch(err => console.error(err));
