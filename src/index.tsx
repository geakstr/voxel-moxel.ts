import { KEYBOARD } from "./constants";
import { createShader } from "./shaders";
import { loadTextures } from "./textures";
import { createGl } from "./renderer/gl";
import * as camera from "./renderer/camera";
import { render } from "./renderer/render";
import { createUniverse } from "./world/createUniverse";
import "./index.scss";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#app") as HTMLCanvasElement;

  run();

  canvas.addEventListener("click", canvas.requestPointerLock, false);

  document.addEventListener(
    "pointerlockchange",
    (event: PointerEvent) => {
      if (document.pointerLockElement === canvas) {
        camera.resume();
      } else {
        camera.pause();
      }
    },
    false
  );

  document.addEventListener(
    "keydown",
    (event: KeyboardEvent) => {
      if (event.keyCode === KEYBOARD.ENTER) {
        const element = canvas as any;
        if (element.requestFullScreen) {
          element.requestFullScreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        }
      }
    },
    false
  );

  async function run() {
    const gl = createGl(canvas);
    const shader = createShader(gl);
    loadTextures(gl);
    const universe = createUniverse(gl);
    render(gl, canvas, shader, universe);
  }
});
