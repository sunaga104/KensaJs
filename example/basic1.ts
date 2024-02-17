// basic1.ts
import Kensa from 'kensajs';

const testFunction = (a: number, b: number) => a + b;
const ks = Kensa('Basic test');

ks.test({
  title: 'Simple Test (success)',
  input: testFunction(1, 1),
  expect: 2,
});

ks.run();
