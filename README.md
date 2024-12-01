## Caterfoil - 4D objects rendering on 2D screen

Demo(try with Gamepad) <https://webgpu.art/caterfoil.ts/>. By holding "X" button, there are some controls to change `w` direction.

![Caterfoil](https://pbs.twimg.com/media/Gdu7Ql8XsAAm0OA?format=png&name=large)

Reused some code from <https://github.com/WebGPU-Art/lagopus.ts> .

4D objects to 2D projection is calculated with Geometric Algebra inner product. And `-z` and `w` directions is combined `(-z+w)/√2` as depth direction of screen.

### License

MIT
