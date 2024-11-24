import { V2, V3, V4 } from "./primes.mjs";

/** map to V3,
 * v.zw turns into v3.z
 * v2Unit is the unit vector of the V2 plane
 */
export let projectToV3 = (v: V4, v2Unit: V2): V3 => {
  let [x, y, z, w] = v;
  let [z1, w1] = v2Unit;
  return [x, y, z * z1 + w * w1];
};

/** get back V4 from v3 and a unit v2 */
export let projectFromV3 = (v: V3, v2Unit: V2): V4 => {
  let [x, y, z] = v;
  let [z1, w1] = v2Unit;
  return [x, y, z * z1, z * w1];
};
