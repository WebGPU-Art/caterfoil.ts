
#import caterfoil::ga4


struct UBO {
  cone_back_scale: f32,
  viewport_ratio: f32,
  look_distance: f32,
  scale: f32,
  camera_position: vec4f,
  forward: vec4f,
  // direction up overhead, better unit vector
  upward: vec4f,
  rightward: vec4f,
  w_direction: vec4f,
};

struct Params {
  _pad: f32,
}

@group(0) @binding(0) var<uniform> uniforms: UBO;
@group(0) @binding(1) var<uniform> params: Params;

// perspective

struct PointResult {
  point_position: vec3f,
  distanceRatio: f32,
  scaleFactor: f32,
};

const sqrt2: f32 = 1.41421356237;

fn transform_perspective(p: vec4f) -> PointResult {
  let forward = uniforms.forward;
  let w_direction = uniforms.w_direction;
  let upward = uniforms.upward;
  let rightward = uniforms.rightward;
  let look_distance = uniforms.look_distance;
  let camera_position = uniforms.camera_position;

  let moved_point: vec4f = (p - camera_position);

  let scaleFactor: f32 = uniforms.cone_back_scale;

  /// use a combined direction to sense both forward and w_direction,
  /// it is tricky since we don't know the real sight in 4D space
  let look_direction = (forward + w_direction) / sqrt2;

  let distanceRatio: f32 = ga4_vec4f_inner(moved_point, look_direction) / look_distance;

  // if dz < (s * -0.9) || dw < (s * -0.9) {
  //   // make it disappear with depth test since it's probably behind the camera
  //   return PointResult(vec3(0.0, 0.0, 10000.), r, s);
  // }

  let screen_scale: f32 = (scaleFactor + 1.0) / (distanceRatio + scaleFactor);
  let y_next: f32 = ga4_vec4f_inner(moved_point, upward) * screen_scale;
  let x_next: f32 = ga4_vec4f_inner(moved_point, rightward) * screen_scale;
  let z_next: f32 = distanceRatio + 0.4; // negtive value is behind the camera and will be clipped

  return PointResult(
    vec3(x_next, y_next / uniforms.viewport_ratio, z_next) * uniforms.scale,
    distanceRatio, scaleFactor
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
  @location(1) color: vec4f,
  @location(2) direction: vec4f, // width also encoded in w
  @location(3) side: i32,
) -> VertexOut {
  var output: VertexOut;
  let p = transform_perspective(position).point_position;
  let scale: f32 = 0.002;
  let width = length(direction) * scale;
  let unit_direction = normalize(direction);
  let p_next = transform_perspective(position + unit_direction).point_position;

  // use perpendicular direction to draw the line
  let canvas_direction = (p_next - p).xy;
  let perp = vec2(-canvas_direction.y, canvas_direction.x);
  let brush = vec4f(perp * width * 0.5, 0., 0.);

  output.position = vec4(p.xyz * scale, 1.0);
  if side > 0i {
    output.position += brush;
  } else {
    output.position -= brush;
  }
  output.color = color;
  return output;
}

@fragment
fn fragment_main(vtx_out: VertexOut) -> @location(0) vec4f {
  return vtx_out.color;
}
