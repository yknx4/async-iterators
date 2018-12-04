/**
 * Iterates over elements of `array` and invokes `iteratee` for each element in reverse order.
 * The iteratee is invoked with three arguments: (value, index|key, collection), and it is awaited if it is async.
 *
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration. (It may be async function).
 * @return Returns a Promise that resolves when all the calls have been done or rejects when the first one fails.
 * @see eachAsync
 * @example
 *
 * async function asyncFn(value) { return value * 2 }
 *
 * await eachRightAsync([1, 2], value => {
 *   const result = await asyncFn(value)
 *   console.log(result)
 * })
 * // => Logs `4` then `2`.
 */
declare function eachRightAsync<T = any>(array: T[], iteratee: (input: T, index: number, array: T[]) => Promise<any> | any): Promise<void>;
export { eachRightAsync };
