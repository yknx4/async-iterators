"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eachAsync_1 = require("./eachAsync");
describe('eachAsync', () => {
    const input = [1, 2, 3, 4, 5];
    it('should guarantee order and receive all iteratee params', async () => {
        const fn = jest.fn((i) => Promise.resolve(i).then(console.log));
        await eachAsync_1.eachAsync(input, fn);
        expect(fn.mock.calls).toEqual([
            [1, 0, [1, 2, 3, 4, 5]],
            [2, 1, [1, 2, 3, 4, 5]],
            [3, 2, [1, 2, 3, 4, 5]],
            [4, 3, [1, 2, 3, 4, 5]],
            [5, 4, [1, 2, 3, 4, 5]],
        ]);
    });
    it('should wait for async functions', async () => {
        const fn = jest.fn(async (i) => console.log(i));
        await eachAsync_1.eachAsync(input, fn);
        expect(fn.mock.calls).toEqual([
            [1, 0, [1, 2, 3, 4, 5]],
            [2, 1, [1, 2, 3, 4, 5]],
            [3, 2, [1, 2, 3, 4, 5]],
            [4, 3, [1, 2, 3, 4, 5]],
            [5, 4, [1, 2, 3, 4, 5]],
        ]);
    });
    it('should work for non-async functions', async () => {
        const fn = jest.fn(async (i) => console.log(i));
        await eachAsync_1.eachAsync(input, fn);
        expect(fn.mock.calls).toEqual([
            [1, 0, [1, 2, 3, 4, 5]],
            [2, 1, [1, 2, 3, 4, 5]],
            [3, 2, [1, 2, 3, 4, 5]],
            [4, 3, [1, 2, 3, 4, 5]],
            [5, 4, [1, 2, 3, 4, 5]],
        ]);
    });
    it('should resolve promises before returning', async () => {
        const fn = jest.fn((i) => {
            if (i % 2 === 0) {
                return Promise.resolve(i).then(console.log);
            }
            else {
                return console.log(i);
            }
        });
        await eachAsync_1.eachAsync(input, fn);
        expect(fn.mock.calls).toEqual([
            [1, 0, [1, 2, 3, 4, 5]],
            [2, 1, [1, 2, 3, 4, 5]],
            [3, 2, [1, 2, 3, 4, 5]],
            [4, 3, [1, 2, 3, 4, 5]],
            [5, 4, [1, 2, 3, 4, 5]],
        ]);
    });
});
//# sourceMappingURL=eachAsync.test.js.map