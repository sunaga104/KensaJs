// normal function
const testFunction = (a, b) => a + b;
// async function
const asyncTestFunction = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve('async result'), 100)
  );
};
// throw Error function
const errorTestFunction = () => {
  throw new Error('Test error');
};

module.exports = {
  testFunction,
  asyncTestFunction,
  errorTestFunction,
};
