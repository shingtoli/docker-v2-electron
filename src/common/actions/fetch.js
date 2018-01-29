import axios from 'axios';
import _ from 'lodash';
import { readDataFile } from '../datastore/controller';

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
    .then(async (res) => {
      const { repositories } = res.data;
      const fromFile = await readDataFile('images');
      const promiseList = repositories.map(async (repo) => {
        const resa = await axios({
          method: 'get',
          url: `https://${connection.url}/v2/${repo}/tags/list`,
          auth: connection,
        });
        const objFromFile = _.find(fromFile, r => r.name === repo);
        const tags = resa.data.tags.map((tag) => {
          const tagValue = parseInt(tag, 10);
          let pretag = {};
          if (objFromFile && objFromFile.tags) {
            pretag = _.find(objFromFile.tags, t => t.name === tag);
          }
          return {
            ...pretag,
            name: tag,
            val: Number.isNaN(tagValue) ? -1 : tagValue,
          };
        }).slice().sort((a, b) => (b.val - a.val));

        return {
          ...objFromFile,
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
