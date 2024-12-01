
/// struct holding 4D geometric algebra
struct GometricAlgebra4D {
  s: f32,
  x: f32,
  y: f32,
  z: f32,
  w: f32,
  xy: f32,
  yz: f32,
  zw: f32,
  wx: f32,
  zx: f32,
  wy: f32,
  xyz: f32,
  yzw: f32,
  zwx: f32,
  wxy: f32,
  xyzw: f32,
}

fn ga4_from_4(x: f32, y: f32, z: f32, w: f32) -> GometricAlgebra4D {
  return GometricAlgebra4D(0.,
    //
    x, y, z, w,
    //
    0., 0., 0., 0., 0., 0.,
    //
    0., 0., 0., 0.,
    //
    0.);
}

fn ga4_zero() -> GometricAlgebra4D {
  return ga4_from_4(0., 0., 0., 0.);
}

fn ga4_i() -> GometricAlgebra4D {
  var ret = ga4_from_4(0., 0., 0., 0.);
  ret.xyzw = 1.;
  return ret;
}

fn ga4_add(a: GometricAlgebra4D, b: GometricAlgebra4D) -> GometricAlgebra4D {
  return GometricAlgebra4D(
    a.s + b.s,
    a.x + b.x,
    a.y + b.y,
    a.z + b.z,
    a.w + b.w,
    a.xy + b.xy,
    a.yz + b.yz,
    a.zw + b.zw,
    a.wx + b.wx,
    a.zx + b.zx,
    a.wy + b.wy,
    a.xyz + b.xyz,
    a.yzw + b.yzw,
    a.zwx + b.zwx,
    a.wxy + b.wxy,
    a.xyzw + b.xyzw,
  );
}

fn ga4_neg(a: GometricAlgebra4D) -> GometricAlgebra4D {
  return GometricAlgebra4D(
    -a.s,
    -a.x,
    -a.y,
    -a.z,
    -a.w,
    -a.xy,
    -a.yz,
    -a.zw,
    -a.wx,
    -a.zx,
    -a.wy,
    -a.xyz,
    -a.yzw,
    -a.zwx,
    -a.wxy,
    -a.xyzw,
  );
}

fn ga4_sub(a: GometricAlgebra4D, b: GometricAlgebra4D) -> GometricAlgebra4D {
  return ga4_add(a, ga4_neg(b));
}


/// this is a huge equation of Geometric Algebra 4D multiplication(aka. Clifford product)
/// https://gist.github.com/tiye/c96ceb4345162ca5a4e3b37478e1e0bd#file-result-txt-L1
/// this polynomial contains 256 terms, hard to garantee correctness, will check again and again in future
fn ga4_multiply(a: GometricAlgebra4D, b: GometricAlgebra4D) -> GometricAlgebra4D {
  let s = a.s * b.s + a.w * b.w + a.x * b.x + a.xyzw * b.xyzw + a.y * b.y + a.z * b.z - a.wx * b.wx - a.wxy * b.wxy - a.wy * b.wy - a.xy * b.xy - a.xyz * b.xyz - a.yz * b.yz - a.yzw * b.yzw - a.zw * b.zw - a.zwx * b.zwx - a.zx * b.zx;
  let e1 = (a.s * b.x + a.w * b.wx + a.wxy * b.wy + a.wy * b.wxy + a.x * b.s + a.xy * b.y + a.yzw * b.xyzw + a.z * b.zx - a.wx * b.w - a.xyz * b.yz - a.xyzw * b.yzw - a.y * b.xy - a.yz * b.xyz - a.zw * b.zwx - a.zwx * b.zw - a.zx * b.z);
  let e2 = (a.s * b.y + a.w * b.wy + a.x * b.xy + a.xyzw * b.zwx + a.y * b.s + a.yz * b.z - a.wx * b.wxy - a.wxy * b.wx - a.wy * b.w - a.xy * b.x - a.xyz * b.zx - a.yzw * b.zw - a.z * b.yz - a.zw * b.yzw - a.zwx * b.xyzw - a.zx * b.xyz);
  let e3 = (a.s * b.z + a.wxy * b.xyzw + a.y * b.yz + a.z * b.s + a.zw * b.w + a.zx * b.x - a.w * b.zw - a.wx * b.zwx - a.wy * b.yzw - a.x * b.zx - a.xy * b.xyz - a.xyz * b.xy - a.xyzw * b.wxy - a.yz * b.y - a.yzw * b.wy - a.zwx * b.wx);
  let e4 = (a.s * b.w + a.w * b.s + a.wx * b.x + a.wy * b.y + a.xyzw * b.xyz + a.z * b.zw + a.zwx * b.zx - a.wxy * b.xy - a.x * b.wx - a.xy * b.wxy - a.xyz * b.xyzw - a.y * b.wy - a.yz * b.yzw - a.yzw * b.yz - a.zw * b.z - a.zx * b.zwx);
  let e12 = (a.s * b.xy + a.w * b.wxy + a.wxy * b.w + a.wy * b.wx + a.x * b.y + a.xy * b.s + a.xyz * b.z + a.yzw * b.zwx + a.z * b.xyz - a.wx * b.wy - a.xyzw * b.zw - a.y * b.x - a.yz * b.zx - a.zw * b.xyzw - a.zwx * b.yzw - a.zx * b.yz);
  let e23 = (a.s * b.yz + a.w * b.yzw + a.wx * b.xyzw + a.wy * b.zw + a.x * b.xyz + a.xy * b.zx + a.xyz * b.x + a.xyzw * b.wx + a.y * b.z + a.yz * b.s + a.yzw * b.w + a.zwx * b.wxy - a.wxy * b.zwx - a.z * b.y - a.zw * b.wy - a.zx * b.xy);
  let e34 = (a.s * b.zw + a.wxy * b.xyz + a.x * b.zwx + a.y * b.yzw + a.yz * b.wy + a.yzw * b.y + a.z * b.w + a.zw * b.s + a.zwx * b.x - a.w * b.z - a.wx * b.zx - a.wy * b.yz - a.xy * b.xyzw - a.xyz * b.wxy - a.xyzw * b.xy - a.zx * b.wx);
  let e41 = (a.s * b.wx + a.w * b.x + a.wx * b.s + a.wxy * b.y + a.xy * b.wy + a.xyz * b.yzw + a.xyzw * b.yz + a.y * b.wxy + a.yz * b.xyzw + a.z * b.zwx + a.zwx * b.z - a.wy * b.xy - a.x * b.w - a.yzw * b.xyz - a.zw * b.zx - a.zx * b.zw);
  let e31 = (a.s * b.zx + a.wy * b.xyzw + a.xyz * b.y + a.xyzw * b.wy + a.y * b.xyz + a.yz * b.xy + a.yzw * b.wxy + a.z * b.x + a.zw * b.wx + a.zx * b.s - a.w * b.zwx - a.wx * b.zw - a.wxy * b.yzw - a.x * b.z - a.xy * b.yz - a.zwx * b.w);
  let e42 = (a.s * b.wy + a.w * b.y + a.wx * b.xy + a.wy * b.s + a.xyzw * b.zx + a.yzw * b.z + a.z * b.yzw + a.zw * b.yz + a.zwx * b.xyz + a.zx * b.xyzw - a.wxy * b.x - a.x * b.wxy - a.xy * b.wx - a.xyz * b.zwx - a.y * b.w - a.yz * b.zw);
  let e123 = (a.s * b.xyz + a.wy * b.zwx + a.x * b.yz + a.xy * b.z + a.xyz * b.s + a.xyzw * b.w + a.y * b.zx + a.yz * b.x + a.yzw * b.wx + a.z * b.xy + a.zw * b.wxy + a.zx * b.y - a.w * b.xyzw - a.wx * b.yzw - a.wxy * b.zw - a.zwx * b.wy);
  let e234 = (a.s * b.yzw + a.w * b.yz + a.wx * b.xyz + a.wxy * b.zx + a.wy * b.z + a.x * b.xyzw + a.y * b.zw + a.yz * b.w + a.yzw * b.s + a.z * b.wy + a.zw * b.y + a.zwx * b.xy - a.xy * b.zwx - a.xyz * b.wx - a.xyzw * b.x - a.zx * b.wxy);
  let e341 = (a.s * b.zwx + a.wx * b.z + a.wxy * b.yz + a.x * b.zw + a.xy * b.yzw + a.xyz * b.wy + a.xyzw * b.y + a.z * b.wx + a.zw * b.x + a.zwx * b.s - a.w * b.zx - a.wy * b.xyz - a.y * b.xyzw - a.yz * b.wxy - a.yzw * b.xy - a.zx * b.w);
  let e412 = (a.s * b.wxy + a.w * b.xy + a.wx * b.y + a.wxy * b.s + a.xy * b.w + a.xyz * b.zw + a.y * b.wx + a.yz * b.zwx + a.z * b.xyzw + a.zx * b.yzw - a.wy * b.x - a.x * b.wy - a.xyzw * b.z - a.yzw * b.zx - a.zw * b.xyz - a.zwx * b.yz);
  let e1234 = (a.s * b.xyzw + a.x * b.yzw + a.xy * b.zw + a.xyz * b.w + a.xyzw * b.s + a.z * b.wxy + a.zw * b.xy + a.zwx * b.y - a.w * b.xyz - a.wx * b.yz - a.wxy * b.z - a.wy * b.zx - a.y * b.zwx - a.yz * b.wx - a.yzw * b.x - a.zx * b.wy);
  return GometricAlgebra4D(s, e1, e2, e3, e4, e12, e23, e34, e41, e31, e42, e123, e234, e341, e412, e1234);
}

fn ga4_conjugate(a: GometricAlgebra4D) -> GometricAlgebra4D {
  return GometricAlgebra4D(
    a.s,
    a.x,
    a.y,
    a.z,
    a.w,
    -a.xy,
    -a.yz,
    -a.zw,
    -a.wx,
    -a.zx,
    -a.wy,
    a.xyz,
    a.yzw,
    a.zwx,
    a.wxy,
    -a.xyzw,
  );
}

fn ga4_length2(a: GometricAlgebra4D) -> f32 {
  return a.s * a.s + a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w + a.xy * a.xy + a.yz * a.yz + a.zw * a.zw + a.wx * a.wx + a.zx * a.zx + a.wy * a.wy + a.xyz * a.xyz + a.yzw * a.yzw + a.zwx * a.zwx + a.wxy * a.wxy + a.xyzw * a.xyzw;
}

fn ga4_length(a: GometricAlgebra4D) -> f32 {
  let length = ga4_length2(a);
  if length == 0. {
    return 0.;
  } else {
    return sqrt(length);
  }
}

fn ga4_scale(a: GometricAlgebra4D, f: f32) -> GometricAlgebra4D {
  return GometricAlgebra4D(
    a.s * f,
    a.x * f,
    a.y * f,
    a.z * f,
    a.w * f,
    a.xy * f,
    a.yz * f,
    a.zw * f,
    a.wx * f,
    a.zx * f,
    a.wy * f,
    a.xyz * f,
    a.yzw * f,
    a.zwx * f,
    a.wxy * f,
    a.xyzw * f,
  );
}

fn ga4_normalize(a: GometricAlgebra4D) -> GometricAlgebra4D {
  let length = ga4_length(a);
  if length == 0. {
    var ret = ga4_zero();
    ret.s = 1.;
    return ret;
  } else {
    return ga4_scale(a, 1.0 / length);
  }
}

fn ga4_reflect(a: GometricAlgebra4D, b: GometricAlgebra4D) -> GometricAlgebra4D {
  let r0 = ga4_normalize(b);
  return ga4_scale(ga4_multiply(ga4_multiply(ga4_conjugate(r0), a), r0), -1.);
}