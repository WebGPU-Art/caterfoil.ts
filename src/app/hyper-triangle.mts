import { flattenData, group, object } from "../alias.mjs";
import triangleWgsl from "../../shaders/triangle.wgsl";

export let comp_hyper_triangle = () => {
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
