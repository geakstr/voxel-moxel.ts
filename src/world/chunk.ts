import { getAtlas } from "../textures";
import { getUniform, SHADER_UNIFORM } from "../shaders";
import { Chunk } from "./types";

export { createChunk } from "./createChunk";

export const renderChunk = (gl: WebGL2RenderingContext, chunk: Chunk) => {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, getAtlas());
  gl.uniform1i(getUniform(SHADER_UNIFORM.SAMPLER), 0);

  gl.bindVertexArray(chunk.vao!);
  gl.drawElements(gl.TRIANGLES, chunk.indicesCount, gl.UNSIGNED_INT, 0);
  gl.bindVertexArray(null);
};
