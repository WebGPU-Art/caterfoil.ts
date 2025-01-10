import { ComputeOptions, CaterfoilAttribute, CaterfoilHitRegion, CaterfoilRenderObject } from "./primes.mjs";

import { createBuffer, readFormatSize } from "./util.mjs";
import { atomDevice, atomProxiedDispatch, atomCaterfoilTree } from "./global.mjs";
import { makePainter } from "./paint.mjs";
import ga4Shader from "../shaders/ga4.wgsl";

/** prepare vertex buffer from object */
export let createRenderer = (options: {
  shader: string;
  topology: GPUPrimitiveTopology;
  attrsList: CaterfoilAttribute[];
  verticesLength: number;
  vertices: (Float32Array | Uint32Array | Int32Array)[];
  hitRegion: CaterfoilHitRegion;
  indices: Uint32Array;
  getParams: () => number[];
  textures: GPUTexture[];
  label: string;
  computeOptions?: ComputeOptions;
}): CaterfoilRenderObject => {
  // load shared device
  let device = atomDevice.deref();

  let vertexBuffers = options.vertices.map((v) => createBuffer(v, GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST, "vertex"));
  let indicesBuffer = options.indices ? createBuffer(options.indices, GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST, "index") : null;

  const vertexBuffersDescriptors = options.attrsList.map((info, idx) => {
    let stride = readFormatSize(info.format);
    return {
      attributes: [{ shaderLocation: idx, offset: 0, format: info.format }],
      arrayStride: stride,
      stepMode: "vertex" as GPUVertexStepMode,
    } as GPUVertexBufferLayout;
  });

  let combinedShader = options.shader.replace("#import caterfoil::ga4", ga4Shader);

  // ~~ DEFINE BASIC SHADERS ~~
  const shaderModule = device.createShaderModule({
    label: options.label,
    code: combinedShader,
  });

  shaderModule.getCompilationInfo().then((e) => {
    // a dirty hook to expose build messages
    globalThis.__caterfoilHandleCompilationInfo?.(e, combinedShader);
  });

  return {
    type: "object",
    hitRegion: options.hitRegion,
    renderer: makePainter({
      type: "object",
      topology: options.topology,
      shaderModule: shaderModule,
      vertexBuffersDescriptors,
      vertexBuffers,
      verticesLength: options.verticesLength,
      hitRegion: options.hitRegion,
      indices: indicesBuffer,
      indicesCount: options.indices ? options.indices.length : 0,
      getParams: options.getParams,
      textures: options.textures,
      label: options.label,
      computeOptions: options.computeOptions,
    }),
  };
};

/** track tree, internally it calls `paintCaterfoilTree` to render */
export function renderCaterfoilTree(tree: CaterfoilRenderObject, dispatch: (op: any, data: any) => void) {
  atomProxiedDispatch.reset(dispatch);
  atomCaterfoilTree.reset(tree);
}

export function resetCanvasSize(canvas: HTMLCanvasElement) {
  // canvas height not accurate on Android Pad, use innerHeight
  canvas.style.height = `${window.innerHeight}px`;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.width = window.innerWidth * devicePixelRatio;
}
