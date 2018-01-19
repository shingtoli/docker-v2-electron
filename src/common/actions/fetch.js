import axios from 'axios';
import { readAndMergeDataFile } from '../datastore/controller';

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
        const tags = resa.data.tags.map((tag) => {
          const tagValue = parseInt(tag, 10);
          return {
            name: tag,
            val: Number.isNaN(tagValue) ? -1 : tagValue,
          };
        }).slice().sort((a, b) => (b.val - a.val));
        return {
          name: repo,
          tags,
        };
      });

      Promise.all(promiseList)
        .then((values) => {
          readAndMergeDataFile(values, 'images')
            .then(mergeDB => dispatch(listImages(mergeDB, (new Date()).toLocaleString())));
        })
        .catch(errc => console.error(errc));
    })
    .catch(err => console.error(err));
