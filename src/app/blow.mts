import { flattenData, group, object } from "../alias.mjs";
import triangleWgsl from "../../shaders/triangle.wgsl";
import { range } from "../math.mts";
import { V4 } from "../primes.mts";

let gray = [0.8, 0.8, 0.8, 0.5];
let red = [0.8, 0, 0, 0.5];
let green = [0, 0.8, 0, 0.5];

export let comp_blow = () => {
  /// get a list of random 4D points, normalize them, and scale them to 100
  let points = range(400).map(() => {
    // random around origin point
    let v = range(4).map(() => Math.random() - 0.5) as V4;
    let norm = Math.sqrt(v.reduce((acc, cur) => acc + cur * cur, 0));
    return v.map((x) => (x / norm) * 100) as V4;
  });

  let vertices: {
    position: V4;
    color: number[];
  }[] = [];
  // for each point, create a line from the origin to the point
  for (let i = 0; i < points.length; i++) {
    vertices.push({ position: [0, 0, 0, 0], color: gray });
    vertices.push({ position: points[i], color: gray });
  }

  return object({
    label: "triangle",
    shader: triangleWgsl,
    // topology: "triangle-list",
    topology: "line-list",
    attrsList: [
      { field: "position", format: "float32x4" },
      { field: "color", format: "float32x4" },
    ],
    data: vertices,
  });
};
