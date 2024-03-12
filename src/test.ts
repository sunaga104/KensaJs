import { deepEqual } from './deepEqual';
import { failureLog, successLog } from './message';
import { logStyle } from './style';

export default function test({
  title,
  input,
  expect,
}: {
  title: string;
  input: any;
  expect: any;
}) {
  return async () => {
    try {
      let result;
      if (input instanceof Function) {
        result = await input();
      } else {
        result = input;
      }
      if (expect instanceof Error) {
        failureLog(title, result, expect.message);
        return false;
      } else if (!deepEqual(result, expect)) {
        failureLog(title, result, expect);
        return false;
      } else {
        successLog(title);
        return true;
      }
    } catch (e) {
      if (expect instanceof Error && e instanceof Error) {
        if (e.message === expect.message) {
          successLog(title);
          return true;
        } else {
          failureLog(title, e.message, expect.message);
          return false;
        }
      } else if (e instanceof Error) {
        failureLog(title, e.message, expect);
        return false;
      } else {
        failureLog(title, 'Unknown error', expect);
        console.log(e);
        return false;
      }
    }
  };
}
