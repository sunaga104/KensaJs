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

let ks = Kensa('Advanced Test1');

ks.test({
  title: 'Synchronous Test1',
  input: testFunction,
  expect: 4,
});
ks.test({
  title: 'Asynchronous Test1',
  input: asyncTestFunction,
  expect: 'async result',
});

const runner1 = ks.getRunner();

ks = Kensa('Advanced Test2');

ks.test({
    title: 'Synchronous Test2',
    input: testFunction,
    expect: 4,
  });
  ks.test({
    title: 'Asynchronous Test2',
    input: asyncTestFunction,
    expect: 'async result',
  });

const runner2 = ks.getRunner();

ks.run([runner1, runner2]);
