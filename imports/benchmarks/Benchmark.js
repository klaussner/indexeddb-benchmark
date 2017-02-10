import Chance from 'chance';
import { _ } from 'lodash';

const chance = new Chance;

export default class Benchmark {
  generate(size, count, reads) {
    const data = [];

    for (let i = 0; i < count; i++) {
      const document = {
        id: chance.string({ length: 20 }),
        content: chance.string({ length: size * 1024 })
      };

      data.push(document);
    }

    const ids = _.times(reads, () => {
      return data[_.random(0, count - 1)].id;
    });

    return { data, ids };
  }

  async measure(f) {
    const start = performance.now();
    await f();
    return performance.now() - start;
  }

  async run({ size, count, reads }) {
    let write = 0, read;
    const { data, ids } = this.generate(size, count, reads);

    // Store documents
    this.clear();

    write = await this.measure(async () => {
      await this.write(data);
    });

    // Retrieve documents
    read = await this.measure(async () => {
      await this.read(ids);
    });

    return {
      write: write / count,
      read: read / reads
    };
  }
}
