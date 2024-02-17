const Kensa = require('../dist/index').default;

// normal function
const testFunction = (a, b) => a + b;
// async function
const asyncTestFunction = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve('async result'), 100)
  );
};
// throw Error function
const errorTestFunction = () => {
  throw new Error('Test error');
};

const ks = Kensa();
ks.title('.js test');


ks.msg('failure');

ks.test({
  title: 'failure test Function(1,2) = 2',
  input: testFunction(1, 2),
  expect: 2,
});


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
