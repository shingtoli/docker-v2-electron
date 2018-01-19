import fs from 'fs';

const filepath = './data/store.json';

export const readAndMergeDataFile = apiData => new Promise((resolve, reject) => {
  fs.access(filepath, fs.constants.R_OK, (err) => {
    if (err) {
      resolve(apiData);
      return;
    }
    fs.readFile(filepath, (errRead, data) => {
      if (errRead) {
        reject(err.message);
      }
      const datastore = JSON.parse(data);
      const merged = Object.assign(datastore, apiData);
      resolve(merged);
    });
  });
});

export const writeDataFile = memData => new Promise((resolve, reject) => {
  const writeOut = JSON.stringify(memData);
  fs.writeFile(filepath, writeOut, (err) => {
    if (err) {
      reject(err.message);
    }
    resolve(true);
  });
});
