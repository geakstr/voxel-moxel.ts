import { init as initGL } from "./gl";
import { createShader } from "./shaders";
import { loadTextures, ATLAS } from "./textures";
import * as camera from "./camera";
import { render } from "./renderer";
import { createCube } from "./meshes/cube";
import "./index.scss";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#app") as HTMLCanvasElement;

  run();

  const pointerlockchange = (event: Event) => {
    if (document.pointerLockElement === canvas) {
      camera.resume();
    } else {
      camera.pause();
    }
  };

  canvas.addEventListener("click", canvas.requestPointerLock, false);
  document.addEventListener("pointerlockchange", pointerlockchange, false);

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
