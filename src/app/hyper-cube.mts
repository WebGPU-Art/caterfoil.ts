import { flattenData, group, object } from "../alias.mjs";
import triangleWgsl from "../../shaders/triangle.wgsl";

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

export let comp_hyper_cube = () => {
  return object({
    label: "hyper-cube",
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
  });
};
