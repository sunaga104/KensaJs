
import exampleModuleStub from './lib/example';
import { add } from './lib/add';
import Kensa from '../src/index';

// 1.ts test
let ks = Kensa('.ts test');

// Test with a simple value
ks.test({
  title: '1,Simple Value Test',
  input: exampleModuleStub.testFunction(1, 1),
  expect: 2,
});

let stub = ks.stub(exampleModuleStub, 'testFunction', 5);

// Test with a simple value
ks.test({
  title: '1,Simple Value Test',
  input: () => add(1, 1),
  expect: 5,
  stub,
});

stub = ks.stub(exampleModuleStub, 'testFunction', 6);

// Test with a simple value
ks.test({
  title: '1,Simple Value Test',
  input: () => add(1, 1),
  expect: 6,
  stub,
});

ks.run();

// sinon.replace(exampleModuleStub, "testFunction", fake);
// // sinon.stub(exampleModuleStub,'testFunction').returns(4);

// console.log(add(1, 2));

// const exampleModuleStub = sinon.stub(exampleModule);

// exampleModuleStub.testFunction.returns(5);

// const result = add(2, 3);

// // スタブが一度呼び出されたかを確認します。
// console.log(result);

// sinon.restore();

// const foo = {
//   bar: () => exampleModule.testFunction(2, 2),
// };
// let fakeTestFunction = sinon.fake.returns(6);
// // replace method with a fake one
// const fake = sinon.replace(exampleModule, 'testFunction',fakeTestFunction);

// console.log(foo.bar());
