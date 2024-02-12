console.log('Hello, world! ks');

import { title } from 'process';
import Kensa from '../kensa';

const kensa = Kensa();

kensa.title('Sample test');

kensa.test({
  title : '1+1',
  func: 1 + 1,
  expect: 2,
});
