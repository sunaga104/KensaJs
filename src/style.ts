// Helper functions for styling console logs
export function bold(msg: string): string {
  return `\x1b[1m${msg}\x1b[22m`;
}
export function green(msg: string): string {
  return `\x1b[32m${msg}\x1b[39m`;
}
export function red(msg: string): string {
  return `\x1b[31m${msg}\x1b[39m`;
}
export function yellow(msg: string): string {
  return `\x1b[33m${msg}\x1b[39m`;
}
