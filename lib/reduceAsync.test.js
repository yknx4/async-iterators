"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduceAsync_1 = require("./reduceAsync");
describe('reduceAsync', () => {
    const input = [1, 2, 3, 4, 5];
    it('should guarantee order and receive all iteratee params', async () => {
        const fn = jest.fn((acc, i) => Promise.resolve(acc + i));
        const result = await reduceAsync_1.reduceAsync(input, fn);
        expect(fn.mock.calls).toEqual([
            [1, 1, 0, [1, 2, 3, 4, 5]],
            [2, 2, 1, [1, 2, 3, 4, 5]],
            [4, 3, 2, [1, 2, 3, 4, 5]],
            [7, 4, 3, [1, 2, 3, 4, 5]],
            [11, 5, 4, [1, 2, 3, 4, 5]],
        ]);
        expect(result).toEqual(16);
    });
    it('should wait for async functions', async () => {
        const fn = jest.fn(async (acc, i) => {
            acc[`${i}`] = i;
            return acc;
        });
        const result = await reduceAsync_1.reduceAsync(input, fn, {});
        expect(result).toEqual({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
    });
    it('should work for non-async functions', async () => {
        const fn = jest.fn((acc, i) => {
            acc[`${i}`] = i;
            return acc;
        });
        const result = await reduceAsync_1.reduceAsync(input, fn, {});
        expect(result).toEqual({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
    });
    it('should resolve promises before returning', async () => {
        const fn = jest.fn((acc, i) => {
            acc[`${i}`] = i * i;
            if (i % 2 === 0) {
                return Promise.resolve(acc);
            }
            else {
                return acc;
            }
        });
        const result = await reduceAsync_1.reduceAsync(input, fn, {});
        expect(result).toEqual({ 1: 1, 2: 4, 3: 9, 4: 16, 5: 25 });
    });
});
//# sourceMappingURL=reduceAsync.test.js.map