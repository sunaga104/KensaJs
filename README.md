# KensaJs

KensaJs is a testing library that prioritizes simplicity, lightness, and ease of use.

## Features

- **Simple:** Designed with simplicity in mind, making it easy to write and run tests.
- **Versatile:** Supports testing with regular `.js` and `.ts` files, allowing for runtime testing.
- **Automated:** Automatically handles `.ks.js` test files.Please note that support for `.ks.ts` files is currently under development.


## Installation

```bash
npm install kensajs
```
## Usage

Import and use Kensa from kensajs.

example
```typescript
// Example test file
// require or import
import Kensa from 'kensajs';

// Define your functions
const testFunction = (a, b) => a + b;

// Create a new instance of Kensa
const ks = Kensa();
ks.title('Sample');

// simple message
ks.msg('success');

// Test a simple value
ks.test({
  title: 'Simple Value Test',
  input: testFunction(1, 1),
  expect: 2,
});

// simple message
ks.msg('failure');

// failure
ks.test({
  title: 'failure test Function(1,2) = 2',
  input: testFunction(1,2),
  expect: 2,
});
```

```bash
📄 Sample test
success
✓ Simple Value Test
failure
✗ failure test Function(1,2) = 2  (result: undefined, expected: 2)
```

Supports testing of functions, asynchronous functions, and error handling.

```typescript
import Kensa from 'kensajs';

const testFunction = (a, b) => a + b;

const asyncTestFunction = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve('async result'), 100)
  );
};

const errorTestFunction = () => {
  throw new Error('Test error');
};

const ks = Kensa();
// Test a synchronous function
ks.test({
  title: 'Synchronous Test Example',
  input: () => testFunction(2, 2),
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
```

```bash
✓ Error Expectation Test
✓ Synchronous Test Example
✓ Asynchronous Test Example
```

However, when including asynchronous functions, the order may change, so if you need to maintain order, you must wait with await.

```typescript
import Kensa from 'kensajs';

const testFunction = (a, b) => a + b;

const asyncTestFunction = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve('async result'), 100)
  );
};

const ks = Kensa();
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
testing()
```

```bash
✓ Asynchronous Test Example
✓ Synchronous Test Example
```

### Automated

Add the following to your package.json scripts:

```json
"test": "kensa"
```

Create a .ks.js or .ks.ts file. These files are where you'll write your tests. KensaJs will automatically detect and run these tests when you execute the "test" script.

```typescript
// testFunction.ks.ts
import Kensa from "kensajs";
import {testFunction} from './testFunction.ts'

const ks = Kensa();

ks.title('testFunction test');

// success
ks.test({
  title: 'testFunction(1,1) = 2',
  input: testFunction(1,1),
  expect: 2,
});

// failure
ks.test({
  title: 'testFunction(1,2) = 2',
  input: testFunction(1,2),
  expect: 2,
});
```

```bash
> npm run test

📄 Sample test
✓ testFunction(1,1)
✗ testFunction(1,2)  (result: 3, expected: 2)
```


License

KensaJs is released under the ISC License.

KensaJs is currently in a test release phase. It may contain bugs. 