import { bold } from './style';

export function callTitle(msg: string): void {
  console.log('📄', bold(msg));
}

export function msg(msg: string): void {
  console.log(bold(msg));
}
