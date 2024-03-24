# KensaJs

KensaJs is a testing library that prioritizes simplicity, lightness, and ease of use, aiming to provide an optimal tool for JavaScript and TypeScript developers looking to efficiently conduct unit tests.

## Features

- **Simple:** Designed to be simple to implement.
- **Ease of Use:** Uses .js and .ts files, enabling testing during development.
- **Automated:** By creating .ks.js or .ks.ts files, testing can be automated.

## Installation

```sh
npm install kensajs --save-dev
```

## Usage

Below is the simplest way to use it:

```typescript
import Kensa from 'kensajs';
import { testFunction } from './testFunction';

const ks = Kensa();

ks.mainTitle('Test Title');

ks.test({
  title: 'Test Item',
  input: testFunction(1, 1),
  expect: 2,
});

ks.run();
```

1. Import Kensa using import Kensa from 'kensajs';.
1. Use test() to add tests.
1. Execute the tests using run().

###### Execution Result
```bash
📄 Test Title
  ✓  Test Item

TOTAL: 1, PASS: 1, FAIL: 0
```


## Automation

By creating a .ks.js or .ks.ts file, you can automate the tests.
Below is an example of automation:

1. Add a script to package.json.

```json
"test": "kensa"
```

2. Create a .ks.js or .ks.ts file. If you are executing a .ks.ts file, please install ts-node.

```sh
npm install ts-node --save-dev
```

The creation method is as follows:

```typescript
import Kensa from 'kensajs';

let ks = Kensa('Test Title');

ks.test({
  title: 'Test Item',
  input: testFunction(2, 4),
  expect: 6,
});

ks.run();
```

1. Import Kensa using import Kensa from 'kensajs';.
1. Use test() to add tests.
1. Execute the tests using run().

###### Test Execution
```sh
npm run test
```
###### Execution Result

```bash
📄 Test Title
  ✓  Test Item

TOTAL: 1, PASS: 1, FAIL: 0
```

### License
KensaJs is open source software released under the ISC License. For the full license text, please see the [LICENSE](https://github.com/sunaga104/KensaJs/blob/main/LICENSE) file in our GitHub repository.