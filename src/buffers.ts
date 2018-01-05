import { WebGLBufferExtended } from "./extendedClasses";

export interface Buffers {
  readonly index: WebGLBufferExtended;
  readonly position: WebGLBufferExtended;
  readonly texture: WebGLBufferExtended;
  readonly normal: WebGLBufferExtended;
}

export const createBuffers = (gl: WebGLRenderingContext) => ({
  position: createPositionBuffer(gl),
  texture: createTextureBuffer(gl),
  normal: createNormalBuffer(gl),
  index: createIndexBuffer(gl)
});

const createPositionBuffer = (gl: WebGLRenderingContext) => {
  const buffer = gl.createBuffer() as WebGLBufferExtended;
  if (!buffer) {
    throw new Error("Can't create position buffer");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // prettier-ignore
  const vertices = [
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

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  buffer.itemSize = 3;
  buffer.numItems = 24;
  return buffer;
};

const createTextureBuffer = (gl: WebGLRenderingContext) => {
  const buffer = gl.createBuffer() as WebGLBufferExtended;
  if (!buffer) {
    throw new Error("Can't create texture buffer");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // prettier-ignore
  const textureCoords = [
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
  ];
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(textureCoords),
    gl.STATIC_DRAW
  );
  buffer.itemSize = 2;
  buffer.numItems = 24;
  return buffer;
};

const createNormalBuffer = (gl: WebGLRenderingContext) => {
  const buffer = gl.createBuffer() as WebGLBufferExtended;
  if (!buffer) {
    throw new Error("Can't create normal buffer");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  // prettier-ignore
  const normals = [
    // Front face
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,
    0.0,  0.0,  1.0,

    // Back face
    0.0,  0.0, -1.0,
    0.0,  0.0, -1.0,
    0.0,  0.0, -1.0,
    0.0,  0.0, -1.0,

    // Top face
    0.0,  1.0,  0.0,
    0.0,  1.0,  0.0,
    0.0,  1.0,  0.0,
    0.0,  1.0,  0.0,

    // Bottom face
    0.0, -1.0,  0.0,
    0.0, -1.0,  0.0,
    0.0, -1.0,  0.0,
    0.0, -1.0,  0.0,

    // Right face
    1.0,  0.0,  0.0,
    1.0,  0.0,  0.0,
    1.0,  0.0,  0.0,
    1.0,  0.0,  0.0,

    // Left face
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  buffer.itemSize = 3;
  buffer.numItems = 24;
  return buffer;
};

const createIndexBuffer = (gl: WebGLRenderingContext) => {
  const buffer = gl.createBuffer() as WebGLBufferExtended;
  if (!buffer) {
    throw new Error("Can't create index buffer");
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  // prettier-ignore
  const indices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ]
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );
  buffer.itemSize = 1;
  buffer.numItems = 36;
  return buffer;
};
