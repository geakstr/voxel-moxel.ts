import { mat4, vec3, vec4 } from "gl-matrix";
import { Chunk } from "./world/types";
import { HALF_CHUNK_SIZE, CHUNK_SIZE } from "./world/constants";

const matrix: mat4 = mat4.create();

export const update = (mvp: mat4) => {
  mat4.copy(matrix, mvp);

  const planes: vec4[] = [];
  // right
  planes[0] = vec4.fromValues(
    matrix[3] - matrix[0],
    matrix[7] - matrix[4],
    matrix[11] - matrix[8],
    matrix[15] - matrix[12]
  );
  // left
  planes[1] = vec4.fromValues(
    matrix[3] + matrix[0],
    matrix[7] + matrix[4],
    matrix[11] + matrix[8],
    matrix[15] + matrix[12]
  );
  // bottom
  planes[2] = vec4.fromValues(
    matrix[3] + matrix[1],
    matrix[7] + matrix[5],
    matrix[11] + matrix[9],
    matrix[15] + matrix[13]
  );
  // top
  planes[3] = vec4.fromValues(
    matrix[3] - matrix[1],
    matrix[7] - matrix[5],
    matrix[11] - matrix[9],
    matrix[15] - matrix[13]
  );
  // far
  planes[4] = vec4.fromValues(
    matrix[3] - matrix[2],
    matrix[7] - matrix[6],
    matrix[11] - matrix[10],
    matrix[15] - matrix[14]
  );
  // near
  planes[5] = vec4.fromValues(
    matrix[3] + matrix[2],
    matrix[7] + matrix[6],
    matrix[11] + matrix[10],
    matrix[15] + matrix[14]
  );

  for (let i = 0; i < 6; i++) {
    const plane = planes[i];
    const norm = Math.sqrt(
      plane[0] * plane[0] + plane[1] * plane[1] + plane[2] * plane[2]
    );
    plane[0] /= norm;
    plane[1] /= norm;
    plane[2] /= norm;
    plane[3] /= norm;
  }

  return planes;
};

export const isChunkInFrustum = (planes: vec4[], chunk: Chunk) => {
  const center = vec3.fromValues(
    chunk.position[0] + HALF_CHUNK_SIZE + 0.5,
    chunk.position[1] + HALF_CHUNK_SIZE + 0.5,
    chunk.position[2] + HALF_CHUNK_SIZE + 0.5
  );
  for (let i = 0; i < 6; i++) {
    const d =
      planes[i][0] * center[0] +
      planes[i][1] * center[1] +
      planes[i][2] * center[2] +
      planes[i][3];
    if (d <= -CHUNK_SIZE) {
      return false;
    }
  }
  return true;
};
