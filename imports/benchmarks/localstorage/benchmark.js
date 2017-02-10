import Benchmark from '../Benchmark.js'

class LocalStorageBenchmark extends Benchmark {
  clear() {
    localStorage.clear();
  }

  write(data) {
    for (let doc of data) {
      localStorage.setItem(doc.id, doc.content);
    }
  }

  read(ids) {
    for (let id of ids) {
      localStorage.getItem(id);
    }
  }
}

export const localStorageBenchmark = new LocalStorageBenchmark;
