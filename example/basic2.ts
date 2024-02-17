// basic2.ts
import Kensa from 'kensajs';

const testFunction = () => 4;

const asyncTestFunction = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve('async result'), 100)
  );
};

const errorTestFunction = () => {
  throw new Error('Test error');
};

const ks = Kensa('Basic2 Test');

// Test a synchronous function
ks.test({
  title: 'Synchronous Test',
  input: testFunction,
  expect: 4,
});

// Test an asynchronous function
ks.test({
  title: 'Asynchronous Test',
  input: asyncTestFunction,
  expect: 'async result',
});

// Test expecting an error to be thrown
ks.test({
  title: 'Error Expectation Test',
  input: errorTestFunction,
  expect: new Error('Test error'),
});

ks.run();