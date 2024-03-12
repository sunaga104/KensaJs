import exampleModuleStub from './lib/example';
import { add } from './lib/add';
import Kensa from '../src/index';

let ks = Kensa();

ks.test({
  title: '1,Simple Value Test',
  input: exampleModuleStub.testFunction(1, 1),
  expect: 2,
});

ks.stub(exampleModuleStub, 'testFunction', 5);

// Test with a simple value
ks.test({
  title: '1,Simple Value Test',
  input: () => add(1, 1),
  expect: 5,
});

ks.clearStub();

ks.stub(exampleModuleStub, 'testFunction', 6);

// Test with a simple value
ks.test({
  title: '1,Simple Value Test',
  input: () => add(1, 1),
  expect: 6,
});

ks.run();
