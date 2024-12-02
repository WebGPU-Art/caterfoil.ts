import { coneBackScale } from "./config.mjs";
import { Atom } from "@triadica/touch-control";
import { V3, V4 } from "./primes.mjs";
import { qAdd, qAddMany, qScale } from "./math.mjs";

export let atomViewerForward = new Atom<V4>([0, 0, -1, 0]);

export let atomViewerPosition = new Atom<V4>([0, 0, 200, 200]);

export let atomViewerUpward = new Atom<V4>([0, 1, 0, 0]);

export let atomViewerRightward = new Atom<V4>([1, 0, 0, 0]);

/** direction in 4th dimension */
export let atomViewerWDirection = new Atom<V4>([0, 0, 0, 1]);

export let atomViewerScale = new Atom<number>(1);

export let moveViewerBy = (x0: number, y0: number, z0: number, w0: number) => {
  // console.log("moveViewerBy", x0, y0, z0, w0);
  let moveRatio = 1 / atomViewerScale.deref();
  let dv = toViewerAxis(x0, y0, z0, w0);
  let position = atomViewerPosition.deref();
  atomViewerPosition.reset(qAdd(position, qScale(dv, moveRatio)));
};

export let newLookatPoint = (): V4 => {
  return qScale(atomViewerForward.deref(), 600);
};

export let rotateGlanceBy = (x: number, y: number) => {
  let moveRatio = 1 / atomViewerScale.deref();
  if (x !== 0) {
    let da = x * 0.1 * moveRatio;
    let forward = atomViewerForward.deref();
    let rightward = atomViewerRightward.deref();
    atomViewerForward.reset(qAdd(qScale(forward, Math.cos(da)), qScale(rightward, Math.sin(da))));
    atomViewerRightward.reset(qAdd(qScale(rightward, Math.cos(da)), qScale(forward, -Math.sin(da))));
  }
  if (y !== 0) {
    let da = y * 0.1 * moveRatio;
    let forward = atomViewerForward.deref();
    let upward = atomViewerUpward.deref();
    atomViewerForward.reset(qAdd(qScale(forward, Math.cos(da)), qScale(upward, Math.sin(da))));
    atomViewerUpward.reset(qAdd(qScale(upward, Math.cos(da)), qScale(forward, -Math.sin(da))));
  }
};

/** similar to rotateGlanceBy but using wDirection instead of forward */
export let rotateGlanceOfWBy = (x: number, y: number) => {
  let moveRatio = 1 / atomViewerScale.deref();
  if (x !== 0) {
    let da = x * 0.1 * moveRatio;
    let wDirection = atomViewerWDirection.deref();
    let rightward = atomViewerRightward.deref();
    atomViewerWDirection.reset(qAdd(qScale(wDirection, Math.cos(da)), qScale(rightward, Math.sin(da))));
    atomViewerRightward.reset(qAdd(qScale(rightward, Math.cos(da)), qScale(wDirection, -Math.sin(da))));
  }
  if (y !== 0) {
    let da = y * 0.1 * moveRatio;
    let wDirection = atomViewerWDirection.deref();
    let upward = atomViewerUpward.deref();
    atomViewerWDirection.reset(qAdd(qScale(wDirection, Math.cos(da)), qScale(upward, Math.sin(da))));
    atomViewerUpward.reset(qAdd(qScale(upward, Math.cos(da)), qScale(wDirection, -Math.sin(da))));
  }
};

export let spinGlanceBy = (v: number) => {
  if (v !== 0) {
    let moveRatio = 1 / atomViewerScale.deref();
    let da = v * 0.1 * moveRatio;
    let upward = atomViewerUpward.deref();
    let rightward = atomViewerRightward.deref();
    atomViewerUpward.reset(qAdd(qScale(upward, Math.cos(da)), qScale(rightward, Math.sin(da))));
    atomViewerRightward.reset(qAdd(qScale(rightward, Math.cos(da)), qScale(upward, -Math.sin(da))));
  }
};

export let changeScaleBy = (v: number) => {
  let next = atomViewerScale.deref() + atomViewerScale.deref() * v;
  if (next >= 0.1) {
    atomViewerScale.reset(next);
  }
};

export let rotateZtoW = (v: number) => {
  if (v !== 0) {
    let moveRatio = 1 / atomViewerScale.deref();
    let da = v * 0.1 * moveRatio;
    let wDirection = atomViewerWDirection.deref();
    let forward = atomViewerForward.deref();
    atomViewerWDirection.reset(qAdd(qScale(wDirection, Math.cos(da)), qScale(forward, Math.sin(da))));
    atomViewerForward.reset(qAdd(qScale(forward, Math.cos(da)), qScale(wDirection, -Math.sin(da))));
  }
};

export let toViewerAxis = (x: number, y: number, z: number, w: number): V4 => {
  let forward = atomViewerForward.deref();
  let upward = atomViewerUpward.deref();
  let rightward = atomViewerRightward.deref();
  let wDirection = atomViewerWDirection.deref();
  return qAddMany(qScale(rightward, x), qScale(upward, y), qScale(forward, -z), qScale(wDirection, w));
};

/** TODO fix this */
export let transform4d = (p0: V4): V4 => {
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
  return [0, 0, 0, 0];
};
