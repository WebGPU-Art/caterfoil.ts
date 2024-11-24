/** a simpler type for Dispatch */
export type FnDispatch = (op: string, data: any) => void;

/** 3D point */
export type V3 = [number, number, number];

/** 2D point */
export type V2 = [number, number];

export interface CaterfoilAttribute {
  field: string;
  /** Caterfoil has only very limited support for f32 and u32 */
  format: GPUVertexFormat;
}

export interface ComputeOptions {
  particleCount: number;
  initialBuffer: Float32Array;
}

export interface CaterfoilObjectOptions {
  label?: string;
  shader: string;
  topology: GPUPrimitiveTopology;
  attrsList: CaterfoilAttribute[];
  data: Record<string, number | number[]>[];
  hitRegion?: CaterfoilHitRegion;
  indices?: number[];
  getParams?: () => number[];
  textures?: GPUTexture[];
  computeOptions?: ComputeOptions;
}

export interface CaterfoilObjectData {
  type: "object";
  topology: GPUPrimitiveTopology;
  vertexBuffersDescriptors: Iterable<GPUVertexBufferLayout | null>;
  shaderModule: GPUShaderModule;
  vertexBuffers: GPUBuffer[];
  verticesLength: number;
  hitRegion?: CaterfoilHitRegion;
  indices?: GPUBuffer;
  indicesCount?: number;
  getParams?: () => number[];
  textures?: GPUTexture[];
  label: string;
  computeOptions?: ComputeOptions;
}

export interface CaterfoilRenderObject {
  type: "object" | "group";
  renderer?: (t: number, c: GPUCommandEncoder) => void;
  children?: CaterfoilRenderObject[];
  hitRegion?: CaterfoilHitRegion;
}

export interface CaterfoilGroup {
  type: "group";
  children: CaterfoilElement[];
}

export type CaterfoilElement = CaterfoilGroup | CaterfoilObjectData;

/** hitRegion information for object element */
export interface CaterfoilHitRegion {
  radius: number;
  position: V3;
  onHit?: (e: MouseEvent, d: (op: string, data: any) => void) => void;
  onMousedown?: (e: MouseEvent, d: (op: string, data: any) => void) => void;
  onMousemove?: (e: MouseEvent, d: (op: string, data: any) => void) => void;
  onMouseup?: (e: MouseEvent, d: (op: string, data: any) => void) => void;
}

export interface CaterfoilObjectBuffer {
  hitRegion?: CaterfoilHitRegion;
}
