import { testFunction, asyncTestFunction, errorTestFunction } from './example';
import Kensa from '../dist/src/index.js';

let ks = Kensa('.ks.ts test');

ks.test({
  title: '1,Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

ks.test({
  title: '2,Synchronous Test Example',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

ks.test({
  title: '3,Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: '4,Error Expectation Test',
  input: errorTestFunction,
  expect: new Error('Test error'),
});

ks.test({
  title: '5,Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: '6,Synchronous Test Example',
  input: () => testFunction(2, 2),
  expect: 4,
});

const runner1 = ks.getRunner();

ks = Kensa('2.ks.ts test');

ks.test({
  title: '1,Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

ks.test({
  title: '2,Synchronous Test Example',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

ks.test({
  title: '3,Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: '4,Error Expectation Test',
  input: errorTestFunction,
  expect: new Error('Test error'),
});

ks.test({
  title: '5,Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: '6,Synchronous Test Example',
  input: () => testFunction(2, 2),
  expect: 4,
});

const runner2 = ks.getRunner();

export { runner1, runner2 };
