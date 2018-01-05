import { mat3, mat4, vec3 } from "gl-matrix";
import { degToRad } from "./utils/math";
import { WorldBuffers } from "./world";
import { getTexture, TEXTURE } from "./textures";
import { getUniform, getAttr, ATTR, UNIFORM } from "./shaders";
import * as camera from "./camera";
import { Mesh } from "./meshes/Mesh";

const fpsNode = document.querySelector("#fps")!;
let elapsedTime = 0;
let fps = 0;
let lastTime = performance.now();

export const render = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shaders: WebGLProgram,
  mesh: Mesh
) => {
  requestAnimationFrame(timeNow => {
    render(gl, canvas, shaders, mesh);

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
  tick(gl, canvas, shaders, mesh);
};

const tick = (
  gl: WebGL2RenderingContext,
  canvas: HTMLCanvasElement,
  shader: WebGLProgram,
  mesh: Mesh
) => {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  camera.update(canvas.width / canvas.height);
  gl.uniformMatrix4fv(getUniform(UNIFORM.MVP_MATRIX), false, camera.mvp);
  mesh();
};

const setMatrixUniforms = (gl: WebGL2RenderingContext, mvp: mat4) => {
  gl.uniformMatrix4fv(getUniform(UNIFORM.MVP_MATRIX), false, mvp);
};
