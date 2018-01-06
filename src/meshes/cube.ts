import { getAtlas } from "~/textures";
import { TEXTURE, ATLAS_SIZE, CROP_SIZE } from "~/textures";
import { getUniform, SHADER_UNIFORM } from "~/shaders";
import { createVertexArray } from "./common";

export const createCube = (
  gl: WebGL2RenderingContext,
  xOffset: number,
  yOffset: number,
  zOffset: number,
  texture: TEXTURE
): WebGLVertexArrayObject => {
  const vertices = translate(VERTICES, xOffset, yOffset, zOffset);
  const texCoords = TEX_COORDS;
  return createVertexArray(gl, vertices, texCoords, texture);
};

export const renderCube = (
  gl: WebGL2RenderingContext,
  vao: WebGLVertexArrayObject
) => {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, getAtlas());
  gl.uniform1i(getUniform(SHADER_UNIFORM.SAMPLER), 0);
  gl.uniform2f(getUniform(SHADER_UNIFORM.TEX_INFO), ATLAS_SIZE, CROP_SIZE);

  gl.bindVertexArray(vao);
  gl.drawElements(gl.TRIANGLES, INDICES_COUNT, gl.UNSIGNED_INT, 0);
  gl.bindVertexArray(null);
};

const translate = (
  vertices: number[],
  xOffset: number,
  yOffset: number,
  zOffset: number
) => {
  const count = vertices.length;
  const translatedVertices = [];
  for (let i = 0; i < count; i += 3) {
    translatedVertices.push(vertices[i] + xOffset);
    translatedVertices.push(vertices[i + 1] + yOffset);
    translatedVertices.push(vertices[i + 2] + zOffset);
  }
  return translatedVertices;
};

// prettier-ignore
const VERTICES = [
  // front
  0, 0, 1, // v1
  1, 0, 1, // v2
  0, 1, 1, // v0
  1, 1, 1, // v3

  // back
  1, 0, 0, // v6
  0, 0, 0, // v7
  1, 1, 0, // v5
  0, 1, 0, // v4

  // left
  0, 0, 0, // v7
  0, 0, 1, // v1
  0, 1, 0, // v4
  0, 1, 1, // v0

  // right
  1, 0, 1, // v2
  1, 0, 0, // v6
  1, 1, 1, // v3
  1, 1, 0, // v5

  // top
  0, 1, 1, // v0
  1, 1, 1, // v3
  0, 1, 0, // v4
  1, 1, 0, // v5

  // bottom
  0, 0, 0, // v7
  1, 0, 0, // v6
  0, 0, 1, // v1
  1, 0, 1, // v2
];

// prettier-ignore
const TEX_COORDS = [
  // front
  0, 1, 1, 1, 0, 0, 1, 0,
  // back
  0, 1, 1, 1, 0, 0, 1, 0,
  // left
  1, 1, 0, 1, 1, 0, 0, 0,
  // right
  1, 1, 0, 1, 1, 0, 0, 0,
  // top
  0, 1, 1, 1, 0, 0, 1, 0,
  // bottom
  0, 1, 1, 1, 0, 0, 1, 0
];

const INDICES_COUNT = VERTICES.length / 2;
