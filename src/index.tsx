import { initGL } from "./gl";
import { createShader } from "./shaders";
import { loadTextures } from "./textures";
import * as camera from "./camera";
import { render } from "./renderer";
import { loadWorldBuffers } from "./world";
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
    const buggers = await loadWorldBuffers(gl);
    loadTextures(gl);
    render(gl, canvas, shader, buggers);
  }
});
