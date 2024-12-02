import triangleWgsl from "../../shaders/triangle.wgsl";
import imageWgsl from "../../shaders/image.wgsl";
import blinkWgsl from "../../shaders/blink.wgsl";
import triangleComputeWgsl from "../../shaders/triangle-compute.wgsl";

import { flattenData, group, object } from "../alias.mjs";
import { CaterfoilElement, CaterfoilRenderObject, V4 } from "../primes.mjs";
import { compButton, compSlider, compDragPoint, compFlatButton } from "../comp/button.mjs";
import { makeAlignedFloat32Array } from "../util.mjs";

export let compContainer = (store: { position: V4 }, resources: Record<string, GPUTexture>): CaterfoilRenderObject => {
  let unit = 20;
  let p1 = [-unit, -unit, -unit, -unit];
  let p2 = [unit, -unit, -unit, -unit];
  let p3 = [unit, -unit, unit, -unit];
  let p4 = [-unit, -unit, unit, -unit];
  let p5 = [-unit, unit, -unit, -unit];
  let p6 = [unit, unit, -unit, -unit];
  let p7 = [unit, unit, unit, -unit];
  let p8 = [-unit, unit, unit, -unit];
  let p11 = [-unit, -unit, -unit, unit];
  let p12 = [unit, -unit, -unit, unit];
  let p13 = [unit, -unit, unit, unit];
  let p14 = [-unit, -unit, unit, unit];
  let p15 = [-unit, unit, -unit, unit];
  let p16 = [unit, unit, -unit, unit];
  let p17 = [unit, unit, unit, unit];
  let p18 = [-unit, unit, unit, unit];
  let white = [1, 1, 1, 1];
  let gray = [0.8, 0.8, 0.8, 0.5];
  let red = [0.8, 0, 0, 0.5];
  let green = [0, 0.8, 0, 0.5];

  return group(
    null,

    object({
      label: "triangle",
      shader: triangleWgsl,
      // topology: "triangle-list",
      topology: "line-list",
      attrsList: [
        { field: "position", format: "float32x4" },
        { field: "color", format: "float32x4" },
      ],
      data: [
        { position: [-100, 0, 0, 0], color: gray },
        { position: [100, 0, 0, 0], color: gray },
        { position: [0, -100, 0, 0], color: gray },
        { position: [0, 100, 0, 0], color: green },
        { position: [0, 0, -100, 0], color: green },
        { position: [0, 0, 100, 0], color: red },
        { position: [0, 0, 0, -100], color: red },
        { position: [0, 0, 0, 100], color: red },
      ],
    }),
    object({
      label: "triangle",
      shader: triangleWgsl,
      // topology: "triangle-list",
      topology: "line-list",
      attrsList: [
        { field: "position", format: "float32x4" },
        { field: "color", format: "float32x4" },
      ],
      data: [
        { position: p1, color: white },
        { position: p2, color: white },
        { position: p2, color: white },
        { position: p3, color: white },
        { position: p3, color: white },
        { position: p4, color: white },
        { position: p4, color: white },
        { position: p1, color: white },

        { position: p5, color: white },
        { position: p6, color: white },
        { position: p6, color: white },
        { position: p7, color: white },
        { position: p7, color: white },
        { position: p8, color: white },
        { position: p8, color: white },
        { position: p5, color: white },

        { position: p1, color: white },
        { position: p5, color: white },
        { position: p2, color: white },
        { position: p6, color: white },
        { position: p3, color: white },
        { position: p7, color: white },
        { position: p4, color: white },
        { position: p8, color: white },

        // upper

        { position: p11, color: white },
        { position: p12, color: white },
        { position: p12, color: white },
        { position: p13, color: white },
        { position: p13, color: white },
        { position: p14, color: white },
        { position: p14, color: white },
        { position: p11, color: white },

        { position: p15, color: white },
        { position: p16, color: white },
        { position: p16, color: white },
        { position: p17, color: white },
        { position: p17, color: white },
        { position: p18, color: white },
        { position: p18, color: white },
        { position: p15, color: white },

        { position: p11, color: white },
        { position: p15, color: white },
        { position: p12, color: white },
        { position: p16, color: white },
        { position: p13, color: white },
        { position: p17, color: white },
        { position: p14, color: white },
        { position: p18, color: white },

        // connect
        { position: p1, color: white },
        { position: p11, color: white },
        { position: p2, color: white },
        { position: p12, color: white },
        { position: p3, color: white },
        { position: p13, color: white },
        { position: p4, color: white },
        { position: p14, color: white },

        { position: p5, color: white },
        { position: p15, color: white },
        { position: p6, color: white },
        { position: p16, color: white },
        { position: p7, color: white },
        { position: p17, color: white },
        { position: p8, color: white },
        { position: p18, color: white },
      ],
    }),
    // comp_hyper_triangle(),
    null
    // object({
    //   label: "triangle",
    //   shader: triangleWgsl,
    //   topology: "triangle-list",
    //   attrsList: [
    //     { field: "position", format: "float32x4" },
    //     { field: "color", format: "float32x4" },
    //   ],
    //   data: flattenData([
    //     [
    //       { position: [-100.0, 100.0, 0.4, 1], color: [1, 0, 0, 1] },
    //       { position: [-0.0, -100.0, 0.4, 1], color: [1, 1, 0, 1] },
    //       { position: [100.0, 100.0, 0.4, 1], color: [0, 0, 1, 1] },
    //     ],
    //     [
    //       { position: [-300.0, 100.0, 0.4, 1], color: [1, 0, 0, 1] },
    //       { position: [-300.0, -100.0, 0.4, 1], color: [1, 1, 0, 1] },
    //       { position: [-100.0, 100.0, 0.4, 1], color: [0, 0, 1, 1] },
    //     ],
    //   ]),
    //   // indices: [0, 1, 2],
    //   // indices: [3, 4, 5],
    //   // indices: [0, 1, 2, 3, 4, 5],
    // })
    // object({
    //   label: "triangle",
    //   shader: triangleWgsl,
    //   topology: "triangle-list",
    //   attrsList: [
    //     { field: "position", format: "float32x4" },
    //     { field: "color", format: "float32x4" },
    //   ],
    //   data: [
    //     { position: [100.0, 180.0, 0, 1], color: [1, 0, 0, 1] },
    //     { position: [108.0, 180.0, 0, 1], color: [0, 1, 0, 1] },
    //     { position: [100.0, 188.0, 8, 1], color: [0, 0, 1, 1] },
    //   ],
    //   hitRegion: {
    //     radius: 4,
    //     position: [124, 123, 34],
    //     onHit: (e, d) => {
    //       console.log("hit", e);
    //       d("hit", { x: e.clientX, y: e.clientY });
    //     },
    //   },
    // }),

    // object({
    //   label: "blink",
    //   shader: blinkWgsl,
    //   topology: "triangle-list",
    //   attrsList: [{ field: "position", format: "float32x4" }],
    //   data: [{ position: [140.0, 0.0, 30, 1] }, { position: [120.0, 20.0, 30, 1] }, { position: [140.0, 40.0, 30, 1] }],
    //   getParams: () => {
    //     return [(Date.now() / 400) % 1, 0, 0, 0];
    //   },
    // }),
    // compButton(
    //   {
    //     position: [100, -40, 0] as V3,
    //     size: 10,
    //   },
    //   (e, d) => {
    //     console.log("clicked", e, d);
    //   }
    // ),
    // compFlatButton(
    //   {
    //     position: [240, 0, 0] as V3,
    //     size: 10,
    //   },
    //   (e, d) => {
    //     console.log("clicked", e, d);
    //   }
    // ),
    // compSlider(
    //   {
    //     position: [140, -40, 0] as V3,
    //     size: 10,
    //   },
    //   (e, d) => {
    //     console.log("slide", e, d);
    //   }
    // ),
    // compDragPoint(
    //   {
    //     position: store.position as V3,
    //     size: 10,
    //   },
    //   (newPos, d) => {
    //     d("drag", newPos);
    //   }
    // )

    // object({
    //   label: "image",
    //   shader: imageWgsl,
    //   topology: "triangle-list",
    //   attrsList: [
    //     { field: "position", format: "float32x4" },
    //     { field: "uv", format: "float32x2" },
    //   ],
    //   textures: [resources["tiye"]],
    //   data: [
    //     { position: [120.0, 80.0, 30, 1], uv: [0, 1] },
    //     { position: [200.0, 80.0, 30, 1], uv: [1, 1] },
    //     { position: [120.0, 160.0, 30, 1], uv: [0, 0] },
    //     { position: [200.0, 80.0, 30, 1], uv: [1, 1] },
    //     { position: [120.0, 160.0, 30, 1], uv: [0, 0] },
    //     { position: [200.0, 160.0, 30, 1], uv: [1, 0] },
    //   ],
    // }),
    // // compute shader example
    // object({
    //   label: "triangle-compute",
    //   shader: triangleComputeWgsl,
    //   topology: "triangle-list",
    //   attrsList: [
    //     { field: "position", format: "float32x4" },
    //     { field: "color", format: "float32x4" },
    //     { field: "pointer", format: "uint32" },
    //   ],
    //   data: [
    //     { position: [60.0, -200.0, 0, 1], color: [1, 0, 0, 1], pointer: 0 },
    //     { position: [68.0, -200.0, 0, 1], color: [0, 1, 0, 1], pointer: 0 },
    //     { position: [60.0, -208.0, 8, 1], color: [0, 0, 1, 1], pointer: 0 },
    //     // another triangle
    //     { position: [100.0, -200.0, 0, 1], color: [1, 0, 0, 1], pointer: 1 },
    //     { position: [108.0, -200.0, 0, 1], color: [0, 1, 0, 1], pointer: 1 },
    //     { position: [100.0, -208.0, 8, 1], color: [0, 0, 1, 1], pointer: 1 },
    //   ],
    //   computeOptions: {
    //     particleCount: 2,
    //     initialBuffer: makeAlignedFloat32Array(
    //       // item 1, position, velocity
    //       [0, 0, 0],
    //       [1, 0, 0],
    //       // item 2, position, velocity
    //       [0, 0, 0],
    //       [0, 1, 0]
    //     ),
    //   },
    // })
  );
};

let comp_hyper_triangle = () => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const normFactor = Math.sqrt(8 / 3) * 20; // 归一化因子

  const vertices = [
    [1 / 2, 1 / 2, 1 / 2, 1 / 2].map((x) => x * normFactor),
    [1 / 2, 1 / 2, -1 / 2, -1 / 2].map((x) => x * normFactor),
    [1 / 2, -1 / 2, 1 / 2, -1 / 2].map((x) => x * normFactor),
    [1 / 2, -1 / 2, -1 / 2, 1 / 2].map((x) => x * normFactor),
    [-phi, 1, 1, 1].map((x) => (x / Math.sqrt(phi * phi + 3)) * normFactor),
  ];
  let p1 = vertices[0];
  let p2 = vertices[1];
  let p3 = vertices[2];
  let p4 = vertices[3];
  let p5 = vertices[4];

  return object({
    label: "hyper-triangle",
    shader: triangleWgsl,
    topology: "line-list",
    attrsList: [
      { field: "position", format: "float32x4" },
      { field: "color", format: "float32x4" },
    ],
    data: [
      { position: p1, color: [1, 1, 1, 1] },
      { position: p2, color: [1, 1, 1, 1] },

      { position: p1, color: [1, 1, 1, 1] },
      { position: p3, color: [1, 1, 1, 1] },

      { position: p1, color: [1, 1, 1, 1] },
      { position: p4, color: [1, 1, 1, 1] },

      { position: p1, color: [1, 1, 1, 1] },
      { position: p5, color: [1, 1, 1, 1] },

      { position: p2, color: [1, 1, 1, 1] },
      { position: p3, color: [1, 1, 1, 1] },

      { position: p2, color: [1, 1, 1, 1] },
      { position: p4, color: [1, 1, 1, 1] },

      { position: p2, color: [1, 1, 1, 1] },
      { position: p5, color: [1, 1, 1, 1] },

      { position: p3, color: [1, 1, 1, 1] },
      { position: p4, color: [1, 1, 1, 1] },

      { position: p3, color: [1, 1, 1, 1] },
      { position: p5, color: [1, 1, 1, 1] },

      { position: p4, color: [1, 1, 1, 1] },
      { position: p5, color: [1, 1, 1, 1] },
    ],
  });
};
