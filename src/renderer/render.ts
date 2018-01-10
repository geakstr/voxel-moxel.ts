import { getUniform, SHADER_UNIFORM } from "../shaders";
import * as camera from "./camera";
import * as frustum from "./frustum";
import { Universe } from "../types";
import { renderUniverse } from "./universe";

const fpsNode = document.querySelector("#fps")!;
let elapsedTime = 0;
let fps = 0;
let lastTime = performance.now();

export const render = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shaders: WebGLProgram,
  universe: Universe
) => {
  const onAnimationFrame = (now: number) => {
    fps++;
    elapsedTime += now - lastTime;
    lastTime = now;
    if (elapsedTime >= 1000) {
      fpsNode.textContent = `${fps} FPS`;
      fps = 0;
      elapsedTime -= 1000;
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const mvp = camera.update(canvas.width / canvas.height);
    const frustumPlanes = frustum.update(mvp);
    gl.uniformMatrix4fv(getUniform(SHADER_UNIFORM.MVP_MATRIX), false, mvp);

    renderUniverse(gl, frustumPlanes, universe);
    requestAnimationFrame(onAnimationFrame);
  };
  requestAnimationFrame(onAnimationFrame);
};
