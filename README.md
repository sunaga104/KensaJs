# KensaJs

KensaJs is a lightweight testing library designed for JavaScript and TypeScript, aimed at simplifying and optimizing the testing process.

## Features

- **Intuitive:** Inspired by frameworks like Jest and Mocha, yet offering a unique, intuitive interface.
- **Efficient:** Streamlines file detection and test execution in Node.js environments.
- **Automated:** Automatically handles `.ks.ts` test files.
- **Flexible:** Provides powerful and flexible assertion tools, with customizable plugins.
- **Beta Release:** Currently offered as a beta version, with plans for future feature expansion.

## Installation

```bash
npm install kensajs
```
Usage

```typescript
import Kensa from "kensajs";

const kensa = Kensa();

kensa.title('Sample test');

kensa.test({
    title: '1+1',
    func: 1 + 1,
    expect: 2,
});

```

License

KensaJs is released under the ISC License.