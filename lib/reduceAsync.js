"use strict";
// tslint:disable:no-unsafe-any
/**
 * Reduces `collection` to a value which is the accumulated result of running
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
 * @see reduceRightAsync
 * @example
 *
 * await reduceAsync([1, 2], async (sum, n) => sum + n, 0)
 * // => 3
 *
 * await reduceAsync({ 'a': 1, 'b': 2, 'c': 1 }, async (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 *   return result
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
Object.defineProperty(exports, "__esModule", { value: true });
async function reduceAsync(array, iteratee, accumulator) {
    const length = array.length;
    let result = accumulator === undefined ? array[0] : accumulator;
    for (var index = 0; index < length; index += 1) {
        result = await iteratee(result, array[index], index, array);
    }
    return result;
}
exports.reduceAsync = reduceAsync;
//# sourceMappingURL=reduceAsync.js.map