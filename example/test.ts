console.log('test.js');

import Kensa from '../dist/index.js';

const testFunction = (a: number, b: number) => a + b;
const asyncTestFunction = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve('async result'), 100)
  );
};
const errorTestFunction = () => {
  throw new Error('Test error');
};

const ks = Kensa();
ks.title('Sample');

ks.msg('success');
// Test with a simple value
ks.test({
  title: 'Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

// Test a synchronous function
ks.test({
  title: 'Synchronous Test Example',
  input: () => {
    return testFunction(2, 2);
  },
  expect: 4,
});

// Test an asynchronous function
ks.test({
  title: 'Asynchronous Test Example',
  input: asyncTestFunction,
  expect: 'async result',
});

// Test expecting an error to be thrown
ks.test({
  title: 'Error Expectation Test',
  input: errorTestFunction,
  expect: new Error('Test error'),
});
ks.msg('failure');

ks.test({
  title: 'failure test Function(1,2) = 2',
  input: testFunction(1, 2),
  expect: 2,
});

let title = 'success';
let input = [{ header1: 'value1', header2: 'value2' }];
let expect = [{ header1: 'value1', header2: 'value2' }];
ks.test({
  title,
  input,
  expect,
});

let title2 = 'success2';
let input2 = ['value1', 'value2'];
let expect2 = ['value1', 'value2'];
ks.test({
  title: title2,
  input: input2,
  expect: expect2,
});

const testing = async () => {
  // Test an asynchronous function
  await ks.test({
    title: 'Asynchronous Test Example',
    input: asyncTestFunction,
    expect: 'async result',
  });
  // Test a synchronous function
  ks.test({
    title: 'Synchronous Test Example',
    input: () => testFunction(2, 2),
    expect: 4,
  });
};

testing();
