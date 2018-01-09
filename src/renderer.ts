import { getUniform, SHADER_UNIFORM } from "./shaders";
import * as camera from "./camera";
import * as frustum from "./frustum";
import { Chunk } from "./world/chunk";
import { renderPlanet } from "./world/planet";

const fpsNode = document.querySelector("#fps")!;
let now = 0;
let elapsedTime = 0;
let fps = 0;
let lastTime = performance.now();

export const render = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shaders: WebGLProgram,
  chunks: Chunk[]
) => {
  requestAnimationFrame(timeNow => {
    render(gl, canvas, shaders, chunks);
    now = performance.now();
    fps++;
    elapsedTime += now - lastTime;
    lastTime = now;
    if (elapsedTime >= 1000) {
      fpsNode.textContent = `${fps} FPS`;
      fps = 0;
      elapsedTime -= 1000;
    }
  });
  tick(gl, canvas, shaders, chunks);
};

const tick = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shader: WebGLProgram,
  chunks: Chunk[]
) => {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const mvp = camera.update(canvas.width / canvas.height);
  const frustumPlanes = frustum.update(mvp);
  gl.uniformMatrix4fv(getUniform(SHADER_UNIFORM.MVP_MATRIX), false, mvp);
  renderPlanet(gl, frustumPlanes, chunks);
};
