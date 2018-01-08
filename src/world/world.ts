import { Chunk, createChunk, renderChunk, CHUNK_SIZE } from "./chunk";

export const createWorld = (gl: WebGL2RenderingContext) => {
  const chunks: Chunk[] = [];
  for (let xOffset = 0; xOffset < 5; xOffset += 1) {
    for (let yOffset = 0; yOffset < 2; yOffset += 1) {
      for (let zOffset = 0; zOffset < 5; zOffset += 1) {
        chunks.push(
          createChunk(
            gl,
            xOffset * CHUNK_SIZE,
            yOffset * CHUNK_SIZE,
            zOffset * CHUNK_SIZE
          )
        );
      }
    }
  }
  return chunks;
};

export const renderWorld = (gl: WebGL2RenderingContext, chunks: Chunk[]) => {
  const count = chunks.length;
  for (let i = 0; i < count; i += 1) {
    renderChunk(gl, chunks[i]);
  }
};
