import fs from 'fs';

const filepath = './data/store.json';

export const readDataFile = property => new Promise((resolve, reject) => {
  fs.access(filepath, fs.constants.R_OK, (err) => {
    if (err) {
      resolve({});
      return;
    }
    fs.readFile(filepath, (errRead, data) => {
      if (errRead) {
        reject(err.message);
      }
      const datastore = JSON.parse(data);
      const out = property ? datastore[property] : datastore;
      resolve(out);
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
