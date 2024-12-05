# Caterfoil - 4D objects rendering on 2D screen

Demo (try with Gamepad) <https://webgpu.art/caterfoil.ts/>. By holding "X" button, there are some controls to change `w` direction.

![Caterfoil](https://cos-sh.tiye.me/cos-up/1866d8bf83bfc6059e654df6d6b79091/pasted-2024-12-02T18:07:31.652Z.png)

Reused some code from <https://github.com/WebGPU-Art/lagopus.ts> .

4D objects to 2D projection is calculated with Geometric Algebra inner product. And `-z` and `w` directions is combined `(-z+w)/√2` as depth direction of screen.

### License

MIT
