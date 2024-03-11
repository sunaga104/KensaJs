---
title: Get Started
---

## Installation

```bash
npm install kensajs --save-dev
```

## Usage

```typescript
// Import Kensa from kensajs
import Kensa from 'kensajs';
// Import test function
import { testFunction } from './testFunction';

// Create a new instance of Kensa with a title.
const ks = Kensa('Basic1 test');

// Use ks.test() to test your functions.
ks.test({
  title: 'Simple Test (success)',
  input: testFunction(1, 1),
  expect: 2,
});

// Run the tests
ks.run();
```

Import and use Kensa from kensajs.

1. Import Kensa from kensajs, and create a new instance with a title.
1. Use ks.test() to test your functions.
1. Use ks.run() to execute your tests.

#### result
```bash
📄 Basic1 test
  ✓  Simple Test (success)

TOTAL: 1, PASS: 1, FAIL: 0
```


more information about the test function [test](/reference/test)

## Automated

Add the following to your package.json scripts:

```json
"test": "kensa"
```

Create  `.ks.js ` or  `.ks.ts ` files, where you'll write your tests. KensaJs will automatically detect and run these tests when you execute the "test" script. To run TypeScript files directly, you will need to install `ts-node`:

```bash
npm install ts-node --save-dev
```

create a `.ks.ts` file and write your tests:
```typescript
import Kensa from 'kensajs';

let ks = Kensa('automated Test1');

ks.test({
  title: 'Simple Test',
  input: testFunction(2, 4),
  expect: 6,
});

const runner = ks.getRunner();
export { runner };
```

run the tests:
```bash
> npm run test
```


#### result

```bash
📄 automated Test1
  ✓  Simple Test

TOTAL: 1, PASS: 1, FAIL: 0
```