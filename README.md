[![Dev dependencies][dependencies-badge]][dependencies]
[![Node.js version][nodejs-badge]][nodejs]
[![NPM version][npm-badge]][npm]
[![Build Status][travis-badge]][travis-ci]
[![Coverage Status](https://coveralls.io/repos/github/yknx4/async-iterators/badge.svg?branch=master)](https://coveralls.io/github/yknx4/async-iterators?branch=master)

[![Apache-2.0][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]
[![Donate][donate-badge]][donate]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

# async-iterators 

Classic iterators (each, map, reduce) with support for Async functions (or Promise based functions). It automatically waits for functions to resolve if they are asynchronous. They work pretty much the same as lodash ones.

No dependencies! Tested on Node/LTS and Node stable!

## Use case

### Problem
```javascript
  const ids = [1,2,3,4,5...1000]
  /** 
   ** reallyExpensiveFetchFunction is going run as soon as you call the function
   ** about 1000 times at the same, probably crashing/slowing your app, db, etc...
   ** imagine with millions or records
   **/
  const promises = ids.map(id => reallyExpensiveAsyncFunction(id)) 
  const result = await Promise.all(promises)
  // result will contain a 1000 results
```
### Solution
**Vanilla js #1**
```javascript
  const ids = [1,2,3,4,5...1000]
  /** 
   ** It works but it is unredable and looks hackish
   **/
  const result = await ids.reduce((p, id) => {
             return p.then(id => reallyExpensiveAsyncFunction(id));
         }, Promise.resolve())
  // result will contain a 1000 results
```
**Vanilla js #2**
```javascript
  const ids = [1,2,3,4,5...1000]
  /** 
   ** It is readable, but still kind of verbose, and it gets messier when 
   ** simulating a reduce iterator.
   **/
  const result = []
  for(const id of ids) {
    result.push(await reallyExpensiveAsyncFunction(id));
  }
  // result will contain a 1000 results
```

**async-iterators**
```javascript
  const {mapAsync} = require('async-function-iterators')
  const ids = [1,2,3,4,5...1000]
  /** 
   ** same readibility and simplicity as array.map(fn) or lodash's map(array, fn)
   ** runs the reallyExpensiveAsyncFunction in series, thus not overloading your
   ** system 
   **/
  const result = await mapAsync(ids, id => reallyExpensiveAsyncFunction(id))
  // result will contain a 1000 results
```

## Quick start

This project is intended to be used with >=v8 (requires support for async/await) release of [Node.js][nodejs] or newer 

### Install with yarn
```sh
yarn add async-function-iterators
```

### Install with npm 

```sh
npm install --save async-function-iterators
```

## Docs

### Index 

* [eachAsync](#eachasync)
* [eachRightAsync](#eachrightasync)
* [mapAsync](#mapasync)
* [mapRightAsync](#maprightasync)
* [reduceAsync](#reduceasync)
* [reduceRightAsync](#reducerightasync)



---
### Functions
<a id="eachasync"></a>

###  eachAsync

► **eachAsync**(array: *`any`[]*, iteratee: *`Function`*): `Promise`.<`void`>






Iterates over elements of `array` and invokes `iteratee` for each element. The iteratee is invoked with three arguments: (value, index|key, collection), and it is awaited if it is async.
*__see__*: eachRightAsync

*__example__*: async function asyncFn(value) { return value * 2 }

await eachAsync([1, 2], value => { const result = await asyncFn(value) console.log(result) }) // => Logs `2` then `4`.



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| array | `any`[]   |  The array to iterate over. |
| iteratee | `Function`   |  The function invoked per iteration. (It may be async function). |





**Returns:** `Promise`.<`void`>
Returns a Promise that resolves when all the calls have been done or rejects when the first one fails.





___

<a id="eachrightasync"></a>

###  eachRightAsync

► **eachRightAsync**(array: *`any`[]*, iteratee: *`Function`*): `Promise`.<`void`>






Iterates over elements of `array` and invokes `iteratee` for each element in reverse order. The iteratee is invoked with three arguments: (value, index|key, collection), and it is awaited if it is async.
*__see__*: eachAsync

*__example__*: async function asyncFn(value) { return value * 2 }

await eachRightAsync([1, 2], value => { const result = await asyncFn(value) console.log(result) }) // => Logs `4` then `2`.



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| array | `any`[]   |  The array to iterate over. |
| iteratee | `Function`   |  The function invoked per iteration. (It may be async function). |





**Returns:** `Promise`.<`void`>
Returns a Promise that resolves when all the calls have been done or rejects when the first one fails.





___

<a id="mapasync"></a>

###  mapAsync

► **mapAsync**(array: *`any`[]*, iteratee: *`Function`*): `Promise`.<`any`[]>






Creates Promise that resolves with an array of values by running each element of `array` thru `iteratee`. The iteratee is invoked with three arguments: (value, index, array), and it is awaited if it is async.
*__see__*: mapRightAsync

*__example__*: async function square(n) { return n * n }

await mapAsync([4, 8], square) // => [16, 64]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| array | `any`[]   |  The array to iterate over. |
| iteratee | `Function`   |  The function invoked per iteration. (It may be async function) |





**Returns:** `Promise`.<`any`[]>
Returns a promise that resolves into the new mapped array.





___

<a id="maprightasync"></a>

###  mapRightAsync

► **mapRightAsync**(array: *`any`[]*, iteratee: *`Function`*): `Promise`.<`any`[]>






Creates Promise that resolves with an array of values by running each element of `array` thru `iteratee` in reverse order. The iteratee is invoked with three arguments: (value, index, array), and it is awaited if it is async.
*__see__*: mapAsync

*__example__*: async function square(n) { return n * n }

await mapRightAsync([4, 8], square) // => [64, 16]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| array | `any`[]   |  The array to iterate over. |
| iteratee | `Function`   |  The function invoked per iteration. (It may be async function) |





**Returns:** `Promise`.<`any`[]>
Returns a promise that resolves into the new mapped array.





___

<a id="reduceasync"></a>

###  reduceAsync

► **reduceAsync**(array: *`any`[]*, iteratee: *`Function`*, accumulator?: *`any`*): `Promise`.<`any`>






Reduces `collection` to a value which is the accumulated result of running each element in `collection` thru `iteratee` and awaited, where each successive invocation is supplied the return value of the previous. If `accumulator` is not given, the first element of `collection` is used as the initial value. The iteratee is invoked with four arguments: (accumulator, value, index|key, collection).
*__see__*: reduceRightAsync

*__example__*: await reduceAsync([1, 2], async (sum, n) => sum + n, 0) // => 3

await reduceAsync({ 'a': 1, 'b': 2, 'c': 1 }, async (result, value, key) => { (result[value] || (result[value] = [])).push(key) return result }, {}) // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| array | `any`[]   |  The collection to iterate over. |
| iteratee | `Function`   |  The function invoked per iteration. (It may be async function) |
| accumulator | `any`   |  - |





**Returns:** `Promise`.<`any`>
Returns the accumulated value.





___

<a id="reducerightasync"></a>

###  reduceRightAsync

► **reduceRightAsync**(array: *`any`[]*, iteratee: *`Function`*, accumulator?: *`any`*): `Promise`.<`any`>






Reduces `collection` in reverse order to a value which is the accumulated result of running each element in `collection` thru `iteratee` and awaited, where each successive invocation is supplied the return value of the previous. If `accumulator` is not given, the first element of `collection` is used as the initial value. The iteratee is invoked with four arguments: (accumulator, value, index|key, collection).
*__see__*: reduceAsync

*__example__*: await reduceRightAsync(array, async (flattened, other) => flattened.concat(other), []) // => [4, 5, 2, 3, 0, 1]



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| array | `any`[]   |  The collection to iterate over. |
| iteratee | `Function`   |  The function invoked per iteration. (It may be async function) |
| accumulator | `any`   |  - |





**Returns:** `Promise`.<`any`>
Returns the accumulated value.





___






## Available scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `watch` - interactive watch mode to automatically transpile source files, 
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests

## License
Licensed under the Apache-2.0. See the [LICENSE](https://github.com/yknx4/async-iterators/blob/master/LICENSE) file for details.

[dependencies-badge]: https://david-dm.org/yknx4/async-iterators/dev-status.svg
[dependencies]: https://david-dm.org/yknx4/async-iterators?type=dev
[nodejs-badge]: https://img.shields.io/badge/node->=%208.9-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v6.x/docs/api/
[npm-badge]: https://img.shields.io/badge/npm->=%205.5.1-blue.svg
[npm]: https://docs.npmjs.com/
[travis-badge]: https://travis-ci.org/yknx4/async-iterators.svg?branch=master
[travis-ci]: https://travis-ci.org/yknx4/async-iterators
[typescript]: https://www.typescriptlang.org/
[typescript-27]: https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#typescript-27
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/yknx4/async-iterators/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: https://github.com/yknx4/async-iterators/compare
[donate-badge]: https://img.shields.io/badge/$-support-green.svg
[donate]: https://paypal.me/yknx4
[github-watch-badge]: https://img.shields.io/github/watchers/yknx4/async-iterators.svg?style=social
[github-watch]: https://github.com/yknx4/async-iterators/watchers
[github-star-badge]: https://img.shields.io/github/stars/yknx4/async-iterators.svg?style=social
[github-star]: https://github.com/yknx4/async-iterators/stargazers
[jest]: https://facebook.github.io/jest/
[tslint]: https://palantir.github.io/tslint/
[tslint-microsoft-contrib]: https://github.com/Microsoft/tslint-microsoft-contrib
