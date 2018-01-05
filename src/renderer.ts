import { mat3, mat4, vec3 } from "gl-matrix";
import { degToRad } from "./utils/math";
import { WorldBuffers } from "./world";
import { getTexture } from "./textures";
import { getUniform, getAttrib } from "./shaders";
import * as camera from "./camera";

const fpsNode = document.querySelector("#fps")!;
let elapsedTime = 0;
let fps = 0;
let lastTime = performance.now();

export const render = (
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  shaders: WebGLProgram,
  buffers: WorldBuffers
) => {
  requestAnimationFrame(timeNow => {
    render(gl, canvas, shaders, buffers);

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
  tick(gl, canvas, shaders, buffers);
};

const tick = (
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  shader: WebGLProgram,
  buffers: WorldBuffers
) => {
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  camera.update(canvas.width / canvas.height);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    getAttrib("vertexPosition"),
    buffers.position.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, getTexture("cobblestone"));
  gl.uniform1i(getUniform("sampler"), 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texture);
  gl.vertexAttribPointer(
    getAttrib("textureCoord"),
    buffers.texture.itemSize,
    gl.FLOAT,
    false,
    0,
    0
  );

  setMatrixUniforms(gl, shader, camera.mvp);
  gl.drawArrays(gl.TRIANGLES, 0, buffers.position.numItems);

  // mat4.translate(mvMatrix, mvMatrix, [0.0, 0.0, getZ()]);

  // mat4.rotate(mvMatrix, mvMatrix, degToRad(getXRot()), [1, 0, 0]);
  // mat4.rotate(mvMatrix, mvMatrix, degToRad(getYRot()), [0, 1, 0]);

  // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  // gl.vertexAttribPointer(
  //   getAttrib("vertexPosition"),
  //   buffers.position.itemSize,
  //   gl.FLOAT,
  //   false,
  //   0,
  //   0
  // );

  // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
  // gl.vertexAttribPointer(
  //   getAttrib("vertexNormal"),
  //   buffers.normal.itemSize,
  //   gl.FLOAT,
  //   false,
  //   0,
  //   0
  // );

  // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texture);
  // gl.vertexAttribPointer(
  //   getAttrib("textureCoord"),
  //   buffers.texture.itemSize,
  //   gl.FLOAT,
  //   false,
  //   0,
  //   0
  // );

  // gl.activeTexture(gl.TEXTURE0);
  // gl.bindTexture(gl.TEXTURE_2D, getTexture("cobblestone"));
  // gl.uniform1i(getUniform("sampler"), 0);
  // gl.uniform1i(getUniform("useLighting"), 1);
  // gl.uniform3f(getUniform("ambientColor"), 0.2, 0.2, 0.2);
  // const lightingDirection = vec3.fromValues(-0.25, -0.25, -1.0);
  // const adjustedLD = vec3.create();
  // vec3.normalize(adjustedLD, lightingDirection);
  // vec3.scale(adjustedLD, adjustedLD, -1);
  // gl.uniform3fv(getUniform("lightingDirection"), adjustedLD);
  // gl.uniform3f(getUniform("directionalColor"), 0.8, 0.8, 0.8);

  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
  // setMatrixUniforms(gl, shader, pMatrix, mvMatrix);
  // gl.drawElements(gl.TRIANGLES, buffers.index.numItems, gl.UNSIGNED_SHORT, 0);
};

const setMatrixUniforms = (
  gl: WebGLRenderingContext,
  shader: WebGLProgram,
  mvp: mat4
) => {
  gl.uniformMatrix4fv(getUniform("mvpMatrix"), false, mvp);

  // const normalMatrix = mat3.create();
  // mat3.fromMat4(normalMatrix, mvMatrix);
  // mat3.invert(normalMatrix, normalMatrix);
  // mat3.transpose(normalMatrix, normalMatrix);
  // gl.uniformMatrix3fv(getUniform("nMatrix"), false, normalMatrix);
};
