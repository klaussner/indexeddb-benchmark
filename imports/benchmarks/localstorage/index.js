import Benchmark from '../Benchmark.js'

class LocalStorage extends Benchmark {
  clear() {
    localStorage.clear();
  }

  write(data) {
    data.forEach(doc => {
      localStorage.setItem(doc.id, doc.content);
    });
  }

  read(ids) {
    ids.forEach(id => {
      localStorage.getItem(id);
    });
  }
}

export const localStorageBenchmark = new LocalStorage;
