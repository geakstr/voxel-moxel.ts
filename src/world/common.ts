import { getAttr, SHADER_ATTR } from "../shaders";

export const createVertexArray = (
  gl: WebGL2RenderingContext,
  data: number[],
  indicesCount: number
) => {
  const vao = gl.createVertexArray();
  if (!vao) {
    throw new Error("Can't create vao");
  }

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, createBuffer(gl, "vbo"));

  let bytes = 0;
  gl.enableVertexAttribArray(getAttr(SHADER_ATTR.POSITION));
  bytes += 12;
  gl.enableVertexAttribArray(getAttr(SHADER_ATTR.TEX_COORD));
  bytes += 8;

  let bytesOffset = 0;
  gl.vertexAttribPointer(
    getAttr(SHADER_ATTR.POSITION),
    3,
    gl.FLOAT,
    false,
    bytes,
    bytesOffset
  );
  bytesOffset += 12;
  gl.vertexAttribPointer(
    getAttr(SHADER_ATTR.TEX_COORD),
    2,
    gl.FLOAT,
    false,
    bytes,
    bytesOffset
  );
  bytesOffset += 8;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, createBuffer(gl, "ibo"));
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint32Array(createIndex(indicesCount)),
    gl.DYNAMIC_DRAW
  );

  gl.bindVertexArray(null);
  return vao;
};

const createBuffer = (gl: WebGL2RenderingContext, name: string) => {
  const buffer = gl.createBuffer();
  if (!buffer) {
    throw new Error(`Can't create ${name}`);
  }
  return buffer;
};

const createIndex = (indicesCount: number) => {
  const indices = [];
  for (let i = 0, bytes = 0; bytes < indicesCount; i += 4, bytes += 6) {
    indices.push(i);
    indices.push(i + 1);
    indices.push(i + 2);

    indices.push(i + 1);
    indices.push(i + 3);
    indices.push(i + 2);
  }
  return indices;
};
