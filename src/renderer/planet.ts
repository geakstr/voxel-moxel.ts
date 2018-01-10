import { vec4 } from "gl-matrix";
import { Planet } from "../types";
import * as frustum from "./frustum";
import { renderChunk } from "./chunk";

export const renderPlanet = (
  gl: WebGL2RenderingContext,
  frustumPlanes: vec4[],
  planet: Planet
) => {
  const count = planet.chunks.length;
  for (let i = 0; i < count; i += 1) {
    const chunk = planet.chunks[i];
    if (frustum.isChunkInFrustum(frustumPlanes, chunk)) {
      renderChunk(gl, chunk);
    }
  }
};
