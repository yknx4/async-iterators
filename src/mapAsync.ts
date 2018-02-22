// tslint:disable:no-unsafe-any
/**
 * Creates Promise that resolves with an array of values by running each element of `array` thru `iteratee`.
 * The iteratee is invoked with three arguments: (value, index, array), and it is awaited if it is async.
 *
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration. (It may be async function)
 * @return Returns a promise that resolves into the new mapped array.
 * @see mapRightAsync
 * @example
 *
 * async function square(n) {
 *   return n * n
 * }
 *
 * await mapAsync([4, 8], square)
 * // => [16, 64]
 */
async function mapAsync(array: any[], iteratee: Function): Promise<any[]> {
  const result: any[] = [];
  const length = array.length;
  for (var index = 0; index < length; index += 1) {
    result.push(await iteratee(array[index], index, array));
  }

  return result;
}

export { mapAsync };
