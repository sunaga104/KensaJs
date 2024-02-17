const Kensa = require('../dist/src/index').default;
const {
  testFunction,
  asyncTestFunction,
  errorTestFunction,
} = require('./example.js');

const ks = Kensa('.ks.js test');

// Test with a simple value
ks.test({
  title: '1,Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

// Test a synchronous function
ks.test({
  title: '2,Synchronous Test Example',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

// Test an asynchronous function
ks.test({
  title: '3,Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

// Test expecting an error to be thrown
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
// Test a synchronous function
ks.test({
  title: '6,Synchronous Test Example',
  input: () => testFunction(2, 2),
  expect: 4,
});

ks.test({
  title: '7,failure test Function(1,2) = 2',
  input: testFunction(1, 2),
  expect: 2,
});

exports.result1 = ks.builder();
