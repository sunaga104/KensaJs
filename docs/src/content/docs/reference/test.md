---
title: test
description: A reference page in my new Starlight docs site.
---

```typescript
  /**
   * Defines a test case for the Kensa suite.
   *
   * @param {string} title - The title of the test case.
   * @param {any} input - The input to the test case.
   * @param {any} expect - The expected output of the test case.
   * @param {KensaStub<T, K>} [stub] - Optional. An object containing the method to stub and the return value.
   */
  test: <T, K extends keyof T>(params: {
    title: string;
    input: any;
    expect: any;
    stub?: KensaStub<T, K>;
  }) => void;
```