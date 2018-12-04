"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapRightAsync_1 = require("./mapRightAsync");
describe('mapRightAsync', () => {
    const input = [1, 2, 3, 4, 5];
    it('should guarantee order and receive all iteratee params', async () => {
        const fn = jest.fn((i) => Promise.resolve(i));
        const result = await mapRightAsync_1.mapRightAsync(input, fn);
        expect(fn.mock.calls).toEqual([
            [5, 4, [1, 2, 3, 4, 5]],
            [4, 3, [1, 2, 3, 4, 5]],
            [3, 2, [1, 2, 3, 4, 5]],
            [2, 1, [1, 2, 3, 4, 5]],
            [1, 0, [1, 2, 3, 4, 5]],
        ]);
        expect(result).toEqual([5, 4, 3, 2, 1]);
    });
    it('should wait for async functions', async () => {
        const fn = jest.fn(async (i) => i + 1);
        const result = await mapRightAsync_1.mapRightAsync(input, fn);
        expect(result).toEqual([6, 5, 4, 3, 2]);
    });
    it('should work for non-async functions', async () => {
        const fn = jest.fn(async (i) => i * 2);
        const result = await mapRightAsync_1.mapRightAsync(input, fn);
        expect(result).toEqual([10, 8, 6, 4, 2]);
    });
    it('should resolve promises before returning', async () => {
        const fn = jest.fn((i) => {
            if (i % 2 === 0) {
                return Promise.resolve(i * i);
            }
            else {
                return i * i;
            }
        });
        const result = await mapRightAsync_1.mapRightAsync(input, fn);
        expect(result).toEqual([25, 16, 9, 4, 1]);
    });
});
//# sourceMappingURL=mapRightAsync.test.js.map