// automated.ks.ts
import Kensa from 'kensajs';

let ks = Kensa('automated Test1');

ks.test({
  title: 'Simple Test',
  input: () => 5,
  expect: 5,
});

const runner1 = ks.getRunner();

ks = Kensa('automated Test2');

ks.test({
  title: 'Simple Test',
  input: () => 5,
  expect: 5,
});

const runner2 = ks.getRunner();

export { runner1, runner2 };