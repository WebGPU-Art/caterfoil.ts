import { CaterfoilObjectBuffer, CaterfoilRenderObject } from "./primes.mjs";
import { Atom } from "@triadica/touch-control";

export var atomDevice: Atom<GPUDevice> = new Atom(null);
export var atomContext: Atom<GPUCanvasContext> = new Atom(null);

/** TODO depth texture is shared by now, not sure which is better */
export var atomDepthTexture: Atom<GPUTexture> = new Atom(null);
/** as the fake canvas */
export let atomCanvasTexture = new Atom(undefined as GPUTexture);

export var atomBufferNeedClear: Atom<boolean> = new Atom(true);

export var atomClearColor: Atom<{ r: number; g: number; b: number; a: number }> = new Atom(undefined);

export let atomCaterfoilTree = new Atom<CaterfoilRenderObject>(null);

// proxy it for hot reloading
export let atomProxiedDispatch = new Atom<(op: string, data: any) => void>(null);

// touch events

export var atomMouseHoldingPaths = new Atom<number[][]>([]);

export let atomObjectsBuffer = new Atom<CaterfoilObjectBuffer[]>([]);

export function wLog<T extends any>(message: string, a: T): T {
  console.warn(message, a);
  return a;
}
