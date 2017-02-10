import localForage from 'localforage';
import Benchmark from '../Benchmark.js'

class LocalForage extends Benchmark {
  clear() {
    localForage.clear();
  }

  write(data) {
    return Promise.all(data.map(doc => {
      return localForage.setItem(doc.id, doc.content);
    }));
  }

  read(ids) {
    return Promise.all(ids.map(id => {
      return localForage.getItem(id);
    }));
  }
}

export const localForageBenchmark = new LocalForage;
