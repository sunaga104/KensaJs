import Kensa from '../dist/index.js';

const ks = Kensa();

const testFunction = (a: number, b: number) => a + b;

ks.title('testFunction test');

// success
ks.test({
  title: 'testFunction(1,1) = 2',
  input: testFunction(1, 1),
  expect: 2,
});

// failure
ks.test({
  title: 'testFunction(1,2) = 2',
  input: testFunction(1, 2),
  expect: 2,
});
