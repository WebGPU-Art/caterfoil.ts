import { V2, V4 } from "./primes.mjs";

export let square = (x: number): number => {
  return x * x;
};

export let sumSquares = (...xs: number[]): number => {
  return xs.map(square).reduce((a, b) => a + b, 0);
};

/** distance of complex numbers */
export let cDistance = (x: V2, y: V2): number => {
  return Math.sqrt(sumSquares(x[0] - y[0], x[1] - y[1]));
};

/** a helper function for range */
export let range = (n: number): number[] => {
  let ret = [];
  for (let idx = 0; idx < n; idx++) {
    ret.push(idx);
  }
  return ret;
};

/** adds V4 */
export let qAdd = (x: V4, y: V4): V4 => {
  return [x[0] + y[0], x[1] + y[1], x[2] + y[2], x[3] + y[3]];
};

export let qAddMany = (...xs: V4[]): V4 => {
  return xs.reduce(qAdd);
};

export let qSub = (x: V4, y: V4): V4 => {
  return [x[0] - y[0], x[1] - y[1], x[2] - y[2], x[3] - y[3]];
};

export let qScale = (x: V4, s: number): V4 => {
  return [x[0] * s, x[1] * s, x[2] * s, x[3] * s];
};

export let qLength = (x: V4): number => {
  return Math.sqrt(sumSquares(...x));
};

export let cAdd = (x: V2, y: V2): V2 => {
  return [x[0] + y[0], x[1] + y[1]];
};

export let cSub = (x: V2, y: V2): V2 => {
  return [x[0] - y[0], x[1] - y[1]];
};

export let cMultiply = (x: V2, y: V2): V2 => {
  return [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
};

export let cDivide = (x: V2, y: V2): V2 => {
  let d = sumSquares(...y);
  return [(x[0] * y[0] + x[1] * y[1]) / d, (x[1] * y[0] - x[0] * y[1]) / d];
};

export let cLength = (x: V2): number => {
  return Math.sqrt(sumSquares(...x));
};

export let cScale = (x: V2, s: number): V2 => {
  return [x[0] * s, x[1] * s];
};

export let qNormalize = (x: V4): V4 => {
  return qScale(x, 1 / qLength(x));
};
