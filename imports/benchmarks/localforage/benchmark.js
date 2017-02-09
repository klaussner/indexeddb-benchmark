import localForage from 'localforage';
import random from 'lodash.random';

import generate from '/imports/data/generate.js';

export default async function ({ size, count, reads }) {
  let time, writeTime, readTime;
  const data = generate(size, count);

  // Store documents
  localForage.clear();
  time = performance.now();

  for (let id in data) {
    await localForage.setItem(id, data[id]);
  }

  writeTime = performance.now() - time;

  // Retrieve documents
  const ids = Object.keys(data);
  time = performance.now();

  for (let i = 0; i < reads; i++) {
    await localForage.getItem(ids[random(0, count - 1)]);
  }

  readTime = performance.now() - time;

  return {
    write: writeTime / count,
    read: readTime / reads
  };
}
