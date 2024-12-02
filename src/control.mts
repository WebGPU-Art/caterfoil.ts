import { atomViewerScale, changeScaleBy, moveViewerBy, rotateGlanceBy, rotateGlanceOfWBy, rotateZtoW, spinGlanceBy } from "./perspective.mjs";
import { paintCaterfoilTree } from "./paint.mjs";
import { setupGamepadControl } from "./gamepad";
import { threshold } from "./config.mjs";

/** function to catch shader compilation errors */
export function registerShaderResult(f: (e: GPUCompilationInfo, code: string) => void) {
  window.__caterfoilHandleCompilationInfo = f;
}

/** listen to gamepad events */
export let loadGamepadControl = () => {
  setupGamepadControl((axes, buttons) => {
    let toMove = false;
    let someValue = (x: number) => {
      if (Math.abs(x) > threshold) {
        toMove = true;
        return x;
      } else {
        return 0;
      }
    };
    let someSwitch = (x: boolean): boolean => {
      if (x) {
        toMove = true;
      }
      return x;
    };
    let scale = atomViewerScale.deref();
    let speedy = buttons.l1.value > 0.5 || buttons.r1.value > 0.5 ? 8 : 1;
    let faster = speedy > 4 ? 4 : 1;
    let ss = (10 * speedy) / scale;

    let dx = someValue(axes.rightX) * ss;
    let dy = -someValue(axes.rightY) * ss;
    let dLook = someValue(axes.leftY) * ss;
    let dGlance = 0.1 * faster * someValue(axes.leftX);
    let dElevate = 0.05 * faster * someValue(buttons.up.value - buttons.down.value);
    let dTwist = 0.1 * faster * someValue(buttons.right.value - buttons.left.value);

    if (buttons.face3.pressed) {
      moveViewerBy(dx, dy, 0, -dLook);
      rotateGlanceOfWBy(-dGlance, dElevate);
      // interact z axis with w
      rotateZtoW(dTwist);
    } else {
      // left/right, up/down, front/back
      moveViewerBy(dx, dy, dLook, 0);
      rotateGlanceBy(dGlance, dElevate);
      // rotate on xy plane
      spinGlanceBy(dTwist);
    }

    if (someSwitch(buttons.l2.value > 0.5)) {
      changeScaleBy(0.01 * speedy);
    }
    if (someSwitch(buttons.r2.value > 0.5)) {
      changeScaleBy(-0.01 * speedy);
    }

    if (toMove) {
      paintCaterfoilTree();
    }
  });
  console.info("Gamepad control ready.");
};
