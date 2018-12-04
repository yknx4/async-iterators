// tslint:disable:no-unsafe-any
/**
 * Reduces `collection` in reverse order to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee` and awaited, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * @param array The collection to iterate over.
 * @param iteratee The function invoked per iteration. (It may be async function)
 * @param [accumulator] The initial value.
 * @return Returns the accumulated value.
 * @see reduceAsync
 * @example
 *
 * await reduceRightAsync(array, async (flattened, other) => flattened.concat(other), [])
 * // => [4, 5, 2, 3, 0, 1]
 */
async function reduceRightAsync<T, R>(
  array: T[],
  iteratee: (
    acc: Partial<R>,
    input: T,
    index: number,
    array: T[],
  ) => Partial<R> | Promise<Partial<R>>,
  accumulator?: R,
): Promise<R> {
  let result: Partial<R> = accumulator === undefined ? array[0] : accumulator;
  for (var index = array.length - 1; index >= 0; index -= 1) {
    result = await iteratee(result, array[index], index, array);
  }

  return <R>result;
}
export { reduceRightAsync };
