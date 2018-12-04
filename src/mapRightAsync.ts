// tslint:disable:no-unsafe-any
/**
 * Creates Promise that resolves with an array of values by running each element of `array` thru `iteratee` in reverse order.
 * The iteratee is invoked with three arguments: (value, index, array), and it is awaited if it is async.
 *
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration. (It may be async function)
 * @return Returns a promise that resolves into the new mapped array.
 * @see mapAsync
 * @example
 *
 * async function square(n) {
 *   return n * n
 * }
 *
 * await mapRightAsync([4, 8], square)
 * // => [64, 16]
 */
async function mapRightAsync<T = any, P = any>(
  array: P[],
  iteratee: (input: P, index: number, array: P[]) => Promise<T> | T,
): Promise<T[]> {
  const result: T[] = [];
  const length = array.length;
  for (var index = length - 1; index >= 0; index -= 1) {
    result.push(await iteratee(array[index], index, array));
  }

  return result;
}
export { mapRightAsync };
