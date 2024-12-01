import { paintCaterfoilTree } from "./paint.mjs";
import { renderCaterfoilTree, resetCanvasSize } from "./renderer.mjs";
import { initializeCanvasTextures, initializeContext } from "./initialize.js";
import { createTextureFromSource } from "./util.mjs";

import { compContainer } from "./app/container.mjs";
import { loadGamepadControl } from "./control.mjs";
import { setupMouseEvents } from "./events.mjs";
import { Atom } from "@triadica/touch-control";
import { V4 } from "./primes.mjs";
import { atomClearColor } from "./global.mjs";

let store = new Atom({
  position: [180, 80, 80, 0] as V4,
});

let resources: Record<string, GPUTexture> = {};

let dispatch = (op: string, data: any) => {
  if (op === "drag") {
    store.deref().position = data;
    renderApp();
  } else {
    console.warn("dispatch", op, data);
  }
};

function renderApp() {
  let tree = compContainer(store.deref(), resources);

  renderCaterfoilTree(tree, dispatch);
  paintCaterfoilTree();
}

let loadTextures = async (device: GPUDevice) => {
  const response = await fetch("https://cdn.tiye.me/logo/tiye.jpg");
  const imageBitmap = await createImageBitmap(await response.blob());
  let texture = createTextureFromSource(device, {
    source: imageBitmap,
    w: imageBitmap.width,
    h: imageBitmap.height,
  });
  resources["tiye"] = texture;
};

window.onload = async () => {
  let context = await initializeContext();

  await loadTextures(context.device);

  initializeCanvasTextures();
  atomClearColor.reset({ r: 0.0, g: 0.0, b: 0.0, a: 0.0 });
  let canvas = document.querySelector("canvas");
  renderApp();
  console.log("loaded");

  window.onresize = () => {
    resetCanvasSize(canvas);
    initializeCanvasTextures();
    paintCaterfoilTree();
  };
  resetCanvasSize(canvas);

  window.__caterfoilHandleCompilationInfo = (e, code) => {
    if (e.messages.length) {
      console.error(e);
    }
  };
  // setupMouseEvents(canvas);

  loadGamepadControl();
  paintCaterfoilTree();
};

declare global {
  /** dirty hook for extracting error messages */
  var __caterfoilHandleCompilationInfo: (info: GPUCompilationInfo, code: string) => void;
}
