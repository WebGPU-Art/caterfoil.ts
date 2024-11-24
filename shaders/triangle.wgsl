struct UBO {
  cone_back_scale: f32,
  viewport_ratio: f32,
  look_distance: f32,
  scale: f32,
  forward: vec3f,
  // direction up overhead, better unit vector
  upward: vec3f,
  rightward: vec3f,
  camera_position: vec4f,
  zw_unit: vec2f,
};

struct Params {
  _pad: f32,
}

@group(0) @binding(0) var<uniform> uniforms: UBO;
@group(0) @binding(1) var<uniform> params: Params;

// perspective

struct PointResult {
  pointPosition: vec3f,
  r: f32,
  s: f32,
};

fn transform_perspective(p: vec4f) -> PointResult {
  let forward = uniforms.forward;
  let upward = uniforms.upward;
  let rightward = uniforms.rightward;
  let look_distance = uniforms.look_distance;
  let camera_position = uniforms.camera_position;

  let moved_point: vec4f = (p - camera_position);
  let relative_v3 = vec3f(moved_point[0], moved_point[1], moved_point[2] * uniforms.zw_unit.x + moved_point[3] * uniforms.zw_unit.y);

  let s: f32 = uniforms.cone_back_scale;

  let r: f32 = dot(relative_v3, forward) / look_distance;

  // if (r < (s * -0.9)) {
  //   // make it disappear with depth test since it's probably behind the camera
  //   return PointResult(vec3(0.0, 0.0, 10000.), r, s);
  // }

  let screen_scale: f32 = (s + 1.0) / (r + s);
  let y_next: f32 = dot(relative_v3, upward) * screen_scale;
  let x_next: f32 = dot(relative_v3, rightward) * screen_scale;
  let z_next: f32 = r;

  return PointResult(
    vec3(x_next, y_next / uniforms.viewport_ratio, z_next) * uniforms.scale,
    r, s
  );
}

// main

struct VertexOut {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
};

@vertex
fn vertex_main(
  @location(0) position: vec4f,
  @location(1) color: vec4f
) -> VertexOut {
  var output: VertexOut;
  let p = transform_perspective(position).pointPosition;
  let scale: f32 = 0.002;
  output.position = vec4(p[0] * scale, p[1] * scale, p[2] * scale, 1.0);
  // output.position = position;
  output.color = color;
  return output;
}

@fragment
fn fragment_main(vtx_out: VertexOut) -> @location(0) vec4f {
  return vtx_out.color;
}
