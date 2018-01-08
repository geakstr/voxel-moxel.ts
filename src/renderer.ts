import { getUniform, SHADER_UNIFORM } from "./shaders";
import * as camera from "./camera";
import { Chunk } from "./world/chunk";
import { renderWorld } from "./world/world";

const fpsNode = document.querySelector("#fps")!;
let elapsedTime = 0;
let fps = 0;
let lastTime = performance.now();

export const render = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shaders: WebGLProgram,
  world: Chunk[]
) => {
  requestAnimationFrame(timeNow => {
    render(gl, canvas, shaders, world);

    const now = performance.now();
    fps++;
    elapsedTime += now - lastTime;
    lastTime = now;
    if (elapsedTime >= 1000) {
      fpsNode.textContent = `${fps} FPS`;
      fps = 0;
      elapsedTime -= 1000;
    }
  });
  tick(gl, canvas, shaders, world);
};

const tick = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shader: WebGLProgram,
  world: Chunk[]
) => {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.uniformMatrix4fv(
    getUniform(SHADER_UNIFORM.MVP_MATRIX),
    false,
    camera.update(canvas.width / canvas.height)
  );
  renderWorld(gl, world);
};
