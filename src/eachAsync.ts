// tslint:disable:no-unsafe-any
/**
 * Iterates over elements of `array` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection), and it is awaited if it is async.
 *
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration. (It may be async function).
 * @return Returns a Promise that resolves when all the calls have been done or rejects when the first one fails.
 * @see eachRightAsync
 * @example
 *
 * async function asyncFn(value) { return value * 2 }
 *
 * await eachAsync([1, 2], value => {
 *   const result = await asyncFn(value)
 *   console.log(result)
 * })
 * // => Logs `2` then `4`.
 */
async function eachAsync(array: any[], fn: Function): Promise<void> {
  const length = array.length;
  for (var index: number = 0; index < length; index += 1) {
    await fn(array[index], index, array);
  }
}
export { eachAsync };
