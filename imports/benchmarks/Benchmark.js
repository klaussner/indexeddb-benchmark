import Chance from 'chance';
import _ from 'lodash';

const chance = new Chance;

export default class Benchmark {
  generate(size, count, reads) {
    const data = [];

    // Generate random documents
    for (let i = 0; i < count; i++) {
      const document = {
        id: chance.string({ length: 20 }),
        content: chance.string({ length: size * 1024 })
      };

      data.push(document);
    }

    // Generate an array of length `reads` with the IDs generated above to
    // simulate a random access pattern
    const ids = _.times(reads, () => {
      return data[_.random(0, count - 1)].id;
    });

    return { data, ids };
  }

  // Measures the execution time of `f` in milliseconds
  async measure(f) {
    const start = performance.now();
    await f();
    return performance.now() - start;
  }

  async run({ size, count, reads }) {
    const { data, ids } = this.generate(size, count, reads);

    this.setup && await this.setup();

    // Store documents
    this.clear();

    const write = await this.measure(async () => {
      await this.write(data);
    });

    // Retrieve documents
    const read = await this.measure(async () => {
      await this.read(ids);
    });

    return {
      write: write / count,
      read: read / reads
    };
  }
}
