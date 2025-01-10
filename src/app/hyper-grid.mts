import { flattenData, group, object } from "../alias.mjs";
import triangleWgsl from "../../shaders/triangle.wgsl";
import { range } from "../math.mjs";
import { V4 } from "../primes.mjs";

let gray = [0.8, 0.8, 0.8, 0.5];
let red = [0.8, 0, 0, 0.5];
let green = [0, 0.8, 0, 0.5];

type Line = { from: V4; to: V4 };

let v4_add = (a: V4, b: V4): V4 => {
  return a.map((x, i) => x + b[i]) as V4;
};

let v4_sub = (a: V4, b: V4): V4 => {
  return a.map((x, i) => x - b[i]) as V4;
};

let line_add = (line: Line, v: V4): Line => {
  return { from: v4_add(line.from, v), to: v4_add(line.to, v) };
};

export let comp_hyper_grid = () => {
  let unit = 20;
  let grid1: Line[] = [{ from: [0, 0, 0, 0], to: [4 * unit, 0, 0, 0] }];

  // TODO

  return object({
    label: "hyper-grid",
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
