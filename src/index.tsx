import { init as initGL } from "./gl";
import { createShader } from "./shaders";
import { loadTextures, ATLAS } from "./textures";
import * as camera from "./camera";
import { KEYS } from "./keyboard";
import { render } from "./renderer";
import { createCube } from "./meshes/cube";
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
      if (event.keyCode === KEYS.ENTER) {
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
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  async function run() {
    const gl = initGL(canvas);
    const shader = createShader(gl);
    loadTextures(gl);
    const cubes = [
      createCube(gl, 0, 0, 0, ATLAS.REDSTONE_ORE),
      createCube(gl, 1, 0, 0, ATLAS.GOLD_ORE),
      createCube(gl, 2, 0, 0, ATLAS.DIAMOND_ORE)
    ];
    render(gl, canvas, shader, cubes);
  }
});
