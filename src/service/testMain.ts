import { deepEqual } from './utils/deepEqual';
import { failureLog, successLog } from '../infrastructure/log/message';

export default function testMain({
  title,
  input,
  expect,
}: {
  title: string;
  input: any;
  expect: any;
}) {
  return async (paragraph: number) => {
    try {
      let result;
      if (input instanceof Function) {
        result = await input();
      } else {
        result = input;
      }
      if (expect instanceof Error) {
        failureLog(title, result, expect.message, paragraph);
        return false;
      } else if (!deepEqual(result, expect)) {
        failureLog(title, result, expect, paragraph);
        return false;
      } else {
        successLog(title, paragraph);
        return true;
      }
    } catch (e) {
      if (expect instanceof Error && e instanceof Error) {
        if (e.message === expect.message) {
          successLog(title, paragraph);
          return true;
        } else {
          failureLog(title, e.message, expect.message, paragraph);
          return false;
        }
      } else if (e instanceof Error) {
        failureLog(title, e.message, expect, paragraph);
        return false;
      } else {
        failureLog(title, 'Unknown error', expect, paragraph);
        console.log(e);
        return false;
      }
    }
  };
}
