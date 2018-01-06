import { init as initGL } from "./gl";
import { createShader } from "./shaders";
import { loadTextures, TEXTURE } from "./textures";
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
      createCube(gl, 0, 0, 0, TEXTURE.COBBLESTONE),
      createCube(gl, 1, 0, 0, TEXTURE.GOLD_ORE),
      createCube(gl, 2, 0, 0, TEXTURE.DIRT)
    ];
    render(gl, canvas, shader, cubes);
  }
});
