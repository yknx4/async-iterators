import { mapAsync } from './mapAsync';

describe('mapAsync', () => {
  const input = [1, 2, 3, 4, 5];
  it('should guarantee order and receive all iteratee params', async () => {
    const fn = jest.fn((i: number) => Promise.resolve(i));
    const result = await mapAsync(input, fn);
    expect(fn.mock.calls).toEqual([
      [1, 0, [1, 2, 3, 4, 5]],
      [2, 1, [1, 2, 3, 4, 5]],
      [3, 2, [1, 2, 3, 4, 5]],
      [4, 3, [1, 2, 3, 4, 5]],
      [5, 4, [1, 2, 3, 4, 5]],
    ]);
    expect(result).toEqual(input);
  });
  it('should wait for async functions', async () => {
    const fn = jest.fn(async (i: number) => i + 1);
    const result = await mapAsync(input, fn);
    expect(result).toEqual([2, 3, 4, 5, 6]);
  });
  it('should work for non-async functions', async () => {
    const fn = jest.fn(async (i: number) => i * 2);
    const result = await mapAsync(input, fn);
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });
  it('should resolve promises before returning', async () => {
    const fn = jest.fn((i: number) => {
      if (i % 2 === 0) {
        return Promise.resolve(i * i);
      } else {
        return i * i;
      }
    });

    const result = await mapAsync(input, fn);
    expect(result).toEqual([1, 4, 9, 16, 25]);
  });
});
