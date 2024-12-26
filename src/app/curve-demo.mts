import { object } from "../alias.mjs";
import polylinesWgsl from "../../shaders/polyline.wgsl";
import { qNormalize, qScale, qSub, range } from "../math.mjs";
import { V4 } from "../primes.mjs";

let white = [1, 1, 1, 1] as V4;
let gray = [0.8, 0.8, 0.8, 0.5] as V4;
let red = [0.8, 0, 0, 0.5] as V4;
let green = [0, 0.8, 0, 0.5] as V4;

let calc_point = (idx: number): V4 => {
  let t = (idx / 10) * Math.PI * 2;
  let x = idx * t * 0.01;
  let y = Math.sin(t) * (20 + t * 0.5);
  let z = Math.cos(t) * (20 + t * 0.5);

  return [x, y, z, 0];
};

export let comp_curve_demo = () => {
  let data: { position: V4; color: V4; direction: V4; side: number }[] = [];
  let width = 4;

  range(100 - 1).forEach((idx) => {
    let next = idx + 1;
    let p0 = calc_point(idx);
    let p1 = calc_point(next);
    let direction = qScale(qNormalize(qSub(p1, p0)), width);
    data.push({ position: p0, color: white, direction, side: 0 });
    data.push({ position: p1, color: white, direction, side: 0 });
    data.push({ position: p0, color: white, direction, side: 1 });
    data.push({ position: p0, color: white, direction, side: 1 });
    data.push({ position: p1, color: white, direction, side: 1 });
    data.push({ position: p1, color: white, direction, side: 1 });
  });

  return object({
    label: "triangle",
    shader: polylinesWgsl,
    // topology: "triangle-list",
    topology: "line-list",
    attrsList: [
      { field: "position", format: "float32x4" },
      { field: "color", format: "float32x4" },
      { field: "direction", format: "float32x4" }, // direction with width as length
    ],
    data: data,
  });
};
