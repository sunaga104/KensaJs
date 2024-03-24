import { testFunction, asyncTestFunction, errorTestFunction } from './example';

export const add = (a: number, b: number) => {
  return testFunction(a, b);
};

export const asyncAdd = async () => {
  return asyncTestFunction();
};

export const throwError = () => {
  return errorTestFunction();
};
