import { vCross, vDot, vScale, vAdd, vSub } from "@triadica/touch-control";
import { coneBackScale } from "./config.mjs";
import { Atom } from "@triadica/touch-control";
import { V2, V3, V4 } from "./primes.mjs";
import { cAdd, cScale, qAdd, qScale } from "./math.mjs";
import { projectFromV3 } from "./caterfoil.mjs";

// V4 projected to V2, z and w axis are combined into z in V3,
// while it's tricky, it's supposed to be safe to convert back and forth

// forward direction is internally 2d plane, and here use a unit vector
export let atomViewerForwardZWComplex = new Atom<V2>([1, 0]);

/* this is a computed value from q */
export let atomViewerForward = new Atom<V3>([0, 0, -1]);

export let atomViewerPosition = new Atom<V4>([0, 0, 600, 0]);

export let atomViewerUpward = new Atom<V3>([0, 1, 0]);

export let atomViewerScale = new Atom<number>(1);

export let moveViewerBy = (x0: number, y0: number, z0: number, w0: number) => {
  let moveRatio = 1 / atomViewerScale.deref();
  let dv = toViewerAxis(x0, y0, z0);
  let position = atomViewerPosition.deref();
  atomViewerPosition.reset(qAdd(position, qScale(dv, moveRatio)));
};

export let newLookatPoint = (): V3 => {
  return vScale(atomViewerForward.deref(), 600);
};

export let rotateGlanceBy = (x: number, y: number) => {
  let moveRatio = 1 / atomViewerScale.deref();
  if (x !== 0) {
    let da = x * 0.1 * moveRatio;
    let forward = atomViewerForward.deref();
    let upward = atomViewerUpward.deref();
    let rightward = vCross(upward, forward);
    atomViewerForward.reset(vAdd(vScale(forward, Math.cos(da)), vScale(rightward, Math.sin(da))));
  }
  if (y !== 0) {
    let da = y * 0.1 * moveRatio;
    let forward = atomViewerForward.deref();
    let upward = atomViewerUpward.deref();
    atomViewerForward.reset(vAdd(vScale(forward, Math.cos(da)), vScale(upward, Math.sin(da))));
    atomViewerUpward.reset(vAdd(vScale(upward, Math.cos(da)), vScale(forward, -Math.sin(da))));
  }
};

export let spinGlanceBy = (v: number) => {
  if (v !== 0) {
    let moveRatio = 1 / atomViewerScale.deref();
    let da = v * 0.1 * moveRatio;
    let forward = atomViewerForward.deref();
    let upward = atomViewerUpward.deref();
    let rightward = vCross(upward, forward);
    atomViewerUpward.reset(vAdd(vScale(upward, Math.cos(da)), vScale(rightward, Math.sin(da))));
  }
};

export let changeScaleBy = (v: number) => {
  let next = atomViewerScale.deref() + atomViewerScale.deref() * v;
  if (next >= 0.1) {
    atomViewerScale.reset(next);
  }
};

/** rotate complex value in atomViewerForwardZWComplex
 *
 * TODO check if this is correct
 */
export let spinZwBy = (v: number) => {
  let moveRatio = 1 / atomViewerScale.deref();
  let c = atomViewerForwardZWComplex.deref();
  let perp = [c[1], -c[0]] as V2;
  let angle = v * 0.1 * moveRatio;
  let next = cAdd(cScale(c, Math.cos(angle)), cScale(perp, Math.sin(angle)));
  console.log("spinZwBy", next);
  atomViewerForwardZWComplex.reset(next);
};

export let toViewerAxis = (x: number, y: number, z: number): V4 => {
  let forward = atomViewerForward.deref();
  let upward = atomViewerUpward.deref();
  let rightward = vCross(upward, forward);
  let pos3 = vAdd(vAdd(vScale(rightward, -x), vScale(upward, y)), vScale(forward, -z));
  return projectFromV3(pos3, atomViewerForwardZWComplex.deref());
};

/** TODO fix this */
export let transform3d = (p0: V3): V3 => {
  // let point = vSub(p0, atomViewerPosition.deref());
  // let lookDistance = newLookatPoint();
  // let upward = atomViewerUpward.deref();
  // let rightward = vCross(upward, atomViewerForward.deref());
  // let s = coneBackScale;
  // let r = vDot(point, lookDistance) / vSquare(lookDistance);
  // let screenScale = (s + 1) / (r + s);
  // let yp = vDot(point, upward) * screenScale;
  // let xp = -vDot(point, rightward) * screenScale;
  // let zp = r;
  // let scale = atomViewerScale.deref();

  // return [xp * scale, yp * scale, zp * scale];
  return [0, 0, 0];
};

let vSquare = (v: V3): number => {
  return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
};
