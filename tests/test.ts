import Kensa from '../dist/src/index';
import {
  testFunction,
  asyncTestFunction,
  errorTestFunction,
} from './lib/example';

let ks = Kensa();

ks.mainTitle('Test .ts File');

ks.test({
  title: 'Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

ks.test({
  title: 'Synchronous Test Example',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

ks.test({
  title: 'Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: 'Error Expectation Test',
  input: errorTestFunction,
  expect: new Error('Test error'),
});

ks.test({
  title: 'Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: 'Synchronous Test Example',
  input: () => testFunction(2, 2),
  expect: 4,
});

ks.run();

ks.mainTitle('Test .ts File');

ks.test({
  title: 'Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

ks.test({
  title: 'Synchronous Test Example',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

ks.test({
  title: 'Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: 'Error Expectation Test',
  input: errorTestFunction,
  expect: new Error('Test error'),
});

ks.test({
  title: 'Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

ks.test({
  title: 'Synchronous Test Example',
  input: () => testFunction(2, 2),
  expect: 4,
});

ks.run();