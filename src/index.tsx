import { createUniverse } from "./creators/universe";
import "./index.module.scss";
import * as camera from "./renderer/camera";
import { createGl } from "./renderer/gl";
import { render } from "./renderer/render";
import { createShader } from "./shaders";
import { loadTextures } from "./textures";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#app") as HTMLCanvasElement;

  run();

  canvas.addEventListener("click", canvas.requestPointerLock, false);

  document.addEventListener(
    "pointerlockchange",
    () => {
      if (document.pointerLockElement === canvas) {
        camera.resume();
      } else {
        camera.pause();
      }
    },
    false
  );

  async function run() {
    const gl = createGl(canvas);
    createShader(gl);
    loadTextures(gl);
    const universe = createUniverse();
    render(gl, canvas, universe);
  }
});
