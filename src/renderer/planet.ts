import { vec4, vec3 } from "gl-matrix";
import { Planet } from "../types";
import { getChunkByPosition, createChunk } from "../creators/planet";
import * as frustum from "./frustum";
import { renderChunk } from "./chunk";

export const renderPlanet = (
  gl: WebGL2RenderingContext,
  position: vec3,
  frustumPlanes: vec4[],
  planet: Planet
) => {
  if (!getChunkByPosition(planet, position)) {
    console.log("CREATE");
    createChunk(gl, position, planet);
  }
  planet.chunks.forEach(chunk => {
    if (frustum.isChunkInFrustum(frustumPlanes, chunk)) {
      renderChunk(gl, chunk);
    }
  });
};
