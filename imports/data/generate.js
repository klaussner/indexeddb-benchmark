import Chance from 'chance';

const chance = new Chance;

export default function (size, count) {
  const result = {};

  for (let i = 0; i < count; i++) {
    const document = {
      id: chance.string({ length: 20 }),
      content: chance.string({ length: size * 1024 })
    };

    result[document.id] = document;
  }

  return result;
}
