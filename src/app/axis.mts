import { flattenData, group, object } from "../alias.mjs";
import triangleWgsl from "../../shaders/triangle.wgsl";

let gray = [0.8, 0.8, 0.8, 0.5];
let red = [0.8, 0, 0, 0.5];
let green = [0, 0.8, 0, 0.5];

export let comp_axis = () => {
  return object({
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
  });
};
