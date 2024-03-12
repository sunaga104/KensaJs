const Kensa = require('../dist/src/index').default;
const {
  testFunction,
  asyncTestFunction,
  errorTestFunction,
} = require('./lib/example.js');

const ks = Kensa();

ks.mainTitle('Test .ks.js File');

ks.subTitle('Tests1');

ks.test({
  title: 'Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

ks.test({
  title: 'Synchronous Test',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

ks.test({
  title: 'Asynchronous Test',
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

ks.subTitle('Tests2');

ks.test({
  title: 'Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

ks.test({
  title: 'Synchronous Test',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

ks.test({
  title: 'Asynchronous Test',
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

ks.run();
