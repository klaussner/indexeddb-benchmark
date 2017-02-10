import localForage from 'localforage';
import Benchmark from '../Benchmark.js'

class LocalForageBenchmark extends Benchmark {
  clear() {
    localForage.clear();
  }

  write(data) {
    const promises = [];

    for (let doc of data) {
      promises.push(localForage.setItem(doc.id, doc.content));
    }

    return Promise.all(promises);
  }

  read(ids) {
    const promises = [];

    for (let id of ids) {
      promises.push(localForage.getItem(id));
    }

    return Promise.all(promises);
  }
}

export const localForageBenchmark = new LocalForageBenchmark;
