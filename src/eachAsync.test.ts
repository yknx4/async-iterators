import { eachAsync } from './eachAsync';

describe('eachAsync', () => {
  const input = [1, 2, 3, 4, 5];
  it('should guarantee order and receive all iteratee params', async () => {
    const fn = jest.fn((i: number) => Promise.resolve(i).then(console.log));
    await eachAsync(input, fn);
    expect(fn.mock.calls).toEqual([
      [1, 0, [1, 2, 3, 4, 5]],
      [2, 1, [1, 2, 3, 4, 5]],
      [3, 2, [1, 2, 3, 4, 5]],
      [4, 3, [1, 2, 3, 4, 5]],
      [5, 4, [1, 2, 3, 4, 5]],
    ]);
  });
  it('should wait for async functions', async () => {
    const fn = jest.fn(async (i: number) => console.log(i));
    await eachAsync(input, fn);
    expect(fn.mock.calls).toEqual([
      [1, 0, [1, 2, 3, 4, 5]],
      [2, 1, [1, 2, 3, 4, 5]],
      [3, 2, [1, 2, 3, 4, 5]],
      [4, 3, [1, 2, 3, 4, 5]],
      [5, 4, [1, 2, 3, 4, 5]],
    ]);
  });
  it('should work for non-async functions', async () => {
    const fn = jest.fn(async (i: number) => console.log(i));
    await eachAsync(input, fn);
    expect(fn.mock.calls).toEqual([
      [1, 0, [1, 2, 3, 4, 5]],
      [2, 1, [1, 2, 3, 4, 5]],
      [3, 2, [1, 2, 3, 4, 5]],
      [4, 3, [1, 2, 3, 4, 5]],
      [5, 4, [1, 2, 3, 4, 5]],
    ]);
  });
  it('should resolve promises before returning', async () => {
    const fn = jest.fn((i: number) => {
      if (i % 2 === 0) {
        return Promise.resolve(i).then(console.log);
      } else {
        return console.log(i);
      }
    });

    await eachAsync(input, fn);
    expect(fn.mock.calls).toEqual([
      [1, 0, [1, 2, 3, 4, 5]],
      [2, 1, [1, 2, 3, 4, 5]],
      [3, 2, [1, 2, 3, 4, 5]],
      [4, 3, [1, 2, 3, 4, 5]],
      [5, 4, [1, 2, 3, 4, 5]],
    ]);
  });
});
