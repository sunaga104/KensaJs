# KensaJs

KensaJs is a testing library that prioritizes simplicity, lightness, and ease of use, aiming to provide an optimal tool for JavaScript and TypeScript developers looking to efficiently conduct unit tests.
Currently, KensaJs focuses on supporting assertions, offering a straightforward approach to validate the outcomes of your tests with precision and clarity. 

**Note:** KensaJs is currently in a test release phase. Please be aware that it may contain bugs. Feedback is highly welcome. If you encounter any issues, feel free to open an issue.

## Features

- **Simple:** Designed with simplicity in mind, making it easy to write and run tests.
- **Versatile:** Supports testing with regular `.js` and `.ts` files, allowing for runtime testing.
- **Automated:** Automatically handles `.ks.js | .ks.ts` test files.


## Installation

```bash
npm install kensajs
```
## Usage

##### Basic

Import and use Kensa from kensajs.
1. Import Kensa from kensajs, and create a new instance with a title.
2. Use ks.test() to test your functions.
3. Use ks.run() to execute your tests.

example
```typescript
// basic1.ts
import Kensa from 'kensajs';

const testFunction = (a:number, b:number) => a + b;
const ks = Kensa('Basic1 test');

ks.test({
  title: 'Simple Test (success)',
  input: testFunction(1, 1),
  expect: 2,
});

ks.run();
```

```bash
📄 Basic1 test
✓ Simple Test (success)
```

Supports testing of functions, asynchronous functions, and error handling.

```typescript
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
```

```bash
📄 Basic2 Test
✓ Synchronous Test
✓ Asynchronous Test
✓ Error Expectation Test
```

##### Multiple Tests

If you want to run multiple tests in the same file, you can use the ks.getRunner() method to manage your tests. This approach allows you to separately control each test set and then execute them collectively.

```typescript
// multiple.ts
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

// Prepare a second test set
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

// Execute multiple test runners collectively
ks.run([runner1, runner2]);

```
  
```bash
📄 Advanced Test1
✓ Synchronous Test1
✓ Asynchronous Test1

------------------------------------------
📄 Advanced Test2
✓ Synchronous Test2
✓ Asynchronous Test2
```

### Automated

Add the following to your package.json scripts:

```json
"test": "kensa"
```

Create  `.ks.js ` or  `.ks.ts ` files, where you'll write your tests. KensaJs will automatically detect and run these tests when you execute the "test" script. To run TypeScript files directly, you will need to install `ts-node`:

```bash
npm install ts-node --save-dev
```

1. Create a new instance of Kensa and give it a title.
2. ks.test() to test your functions.
3. ks.getRunner() to run your tests.
4. export the runners.

```typescript
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
```

```bash
> npm run test

***************************************************************
test file: path\automated.ks.ts

***************************************************************
📄 automated Test1
✓ Simple Test

------------------------------------------
📄 automated Test2
✓ Simple Test

```

### License
KensaJs is open source software released under the ISC License. For the full license text, please see the [LICENSE](https://github.com/sunaga104/KensaJs/blob/main/LICENSE) file in our GitHub repository.