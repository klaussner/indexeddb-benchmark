import Benchmark from '../Benchmark.js';

const NAME = 'benchmark';

class IndexedDB extends Benchmark {
  async setup() {
    return new Promise(resolve => {
      const request = window.indexedDB.open(NAME, 3);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = () => {
        this.db = request.result;
        this.db.createObjectStore(NAME, { keyPath: 'id' });
      };
    });
  }

  getStore(write) {
    const tx = this.db.transaction([NAME], write
      ? 'readwrite'
      : 'readonly');

    return tx.objectStore(NAME);
  }

  clear() {
    this.getStore(true).clear();
  }

  write(data) {
    const store = this.getStore(true);

    return Promise.all(data.map(doc => {
      return new Promise(resolve => {
        store.add(doc).onsuccess = () => resolve();
      });
    }));
  }

  read(ids) {
    const store = this.getStore();

    return Promise.all(ids.map(id => {
      return new Promise(resolve => {
        store.get(id).onsuccess = () => resolve();
      });
    }));
  }
}

export const IndexedDBBenchmark = new IndexedDB;
