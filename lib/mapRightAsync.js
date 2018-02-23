"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
async function mapRightAsync(array, iteratee) {
    const length = array.length;
    const result = [];
    for (var index = length - 1; index >= 0; index -= 1) {
        result.push(await iteratee(array[index], index, array));
    }
    return result;
}
exports.mapRightAsync = mapRightAsync;
//# sourceMappingURL=mapRightAsync.js.map