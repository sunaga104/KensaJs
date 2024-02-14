# KensaJs

KensaJs is a testing library that prioritizes simplicity, lightness, and ease of use.

## Features

- **Simple:** Designed with simplicity in mind, making it easy to write and run tests.
- **Versatile:** Supports testing with regular `.js` and `.ts` files, allowing for runtime testing.
- **Automated:** Automatically handles `.ks.ts` test files.


## Installation

```bash
npm install kensajs
```
## Usage

Import and use Kensa from kensajs.

example
```typescript
// testFunction.ts
import Kensa from "kensajs";

const testFunction = (a:number, b:number)=>{
  return a + b
}

const ks = Kensa();

ks.title('testFunction test');

// success
ks.test({
  title: 'testFunction(1,1) = 2',
  func: testFunction(1,1),
  expect: 2,
});

// failure
ks.test({
  title: 'testFunction(1,2) = 2',
  func: testFunction(1,2),
  expect: 2,
});
```

```bash
📄 Sample test
✓ testFunction(1,1)
✗ testFunction(1,2)  (result: 3, expected: 2)
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
  func: testFunction(1,1),
  expect: 2,
});

// failure
ks.test({
  title: 'testFunction(1,2) = 2',
  func: testFunction(1,2),
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