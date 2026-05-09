# Caterfoil - 4D objects rendering on 2D screen

Demo (try with Gamepad) <https://webgpu.art/caterfoil.ts/>. Hold `△` (face4) to switch from regular view controls to the fourth-dimension movement and rotation controls.

![Caterfoil](https://cos-sh.tiye.me/cos-up/1866d8bf83bfc6059e654df6d6b79091/pasted-2024-12-02T18:07:31.652Z.png)

Reused some code from <https://github.com/WebGPU-Art/lagopus.ts> .

4D objects to 2D projection is calculated with Geometric Algebra inner product. The screen depth direction is a normalized mix of forward and `w` directions,
`cos(phi) * forward + sin(phi) * w_direction`, with `phi` defaulting to `π/4`.

You can tweak the view mix from the query string, for example `?phi=0` for a pure forward depth direction or `?phi=1.57079632679` for a pure `w` depth direction.

### License

MIT
