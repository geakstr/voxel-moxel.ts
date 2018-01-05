import { mat4 } from "gl-matrix";
import { hasAttr, getAttr, getUniform, ATTR, UNIFORM } from "../shaders";
import { TEXTURE, getTexture } from "../textures";

export type Mesh = () => WebGLVertexArrayObject;

export const createMesh = (gl: WebGL2RenderingContext): Mesh => {
  const vertices = new Float32Array(VERTICES);
  const texCoords = new Float32Array(TEX_COORD);
  const indices = new Uint16Array(INDICES);
  const vao = createVertexArray(gl, vertices, texCoords, indices);

  return () => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, getTexture(TEXTURE.COBBLESTONE));
    gl.uniform1i(getUniform(UNIFORM.SAMPLER), 0);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
    gl.bindVertexArray(null);

    return vao;
  };
};

const createBuffer = (gl: WebGL2RenderingContext, name: string) => {
  const buffer = gl.createBuffer();
  if (!buffer) {
    throw new Error(`Can't create ${name}`);
  }
  return buffer;
};

const createVertexArray = (
  gl: WebGL2RenderingContext,
  vertices: Float32Array,
  texCoords: Float32Array,
  indices: Uint16Array
) => {
  const vao = gl.createVertexArray();
  if (!vao) {
    throw new Error("Can't create vao");
  }
  gl.bindVertexArray(vao);

  gl.bindBuffer(gl.ARRAY_BUFFER, createBuffer(gl, "vbo"));
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(getAttr(ATTR.POSITION));
  gl.vertexAttribPointer(getAttr(ATTR.POSITION), 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, createBuffer(gl, "tbo"));
  gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(getAttr(ATTR.TEX_COORD));
  gl.vertexAttribPointer(getAttr(ATTR.TEX_COORD), 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, createBuffer(gl, "ibo"));
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.DYNAMIC_DRAW);

  gl.bindVertexArray(null);

  return vao;
};

// prettier-ignore
const VERTICES = [
  // Front face
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,

  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0, -1.0, -1.0,

  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0, -1.0,

  // Bottom face
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,

  // Right face
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,
   1.0, -1.0,  1.0,

  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
];

// prettier-ignore
const TEX_COORD = [
  // Front face
  0.0, 0.0,
  1.0, 0.0,
  1.0, 1.0,
  0.0, 1.0,
  // Back face
  1.0, 0.0,
  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  // Top face
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0,
  1.0, 1.0,
  // Bottom face
  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  1.0, 0.0,
  // Right face
  1.0, 0.0,
  1.0, 1.0,
  0.0, 1.0,
  0.0, 0.0,
  // Left face
  0.0, 0.0,
  1.0, 0.0,
  1.0, 1.0,
  0.0, 1.0,
]

// prettier-ignore
const INDICES = [
  0, 1, 2,      0, 2, 3,    // Front face
  4, 5, 6,      4, 6, 7,    // Back face
  8, 9, 10,     8, 10, 11,  // Top face
  12, 13, 14,   12, 14, 15, // Bottom face
  16, 17, 18,   16, 18, 19, // Right face
  20, 21, 22,   20, 22, 23  // Left face
]
