import { vec4 } from "gl-matrix";
import * as frustum from "../frustum";
import { createVertexArray } from "./common";
import { renderChunk } from "./chunk";
import { Planet } from "./types";

const worker = new Worker("/assets/planet.worker.js");

export const createPlanet = (
  gl: WebGL2RenderingContext,
  x: number,
  y: number,
  z: number
): Planet => {
  const planet: Planet = {
    x,
    y,
    z,
    chunks: [],
    blocks: [],
    ready: false
  };

  const reqid = Math.random();
  worker.addEventListener(
    "message",
    e => {
      const { resid, action, data } = e.data;
      switch (action) {
        case "BUILD_PLANET": {
          if (resid === reqid) {
            const newPlanet = data as Planet;
            planet.chunks = newPlanet.chunks;
            planet.chunks.forEach(chunk => {
              chunk.vao = createVertexArray(
                gl,
                chunk.data!,
                chunk.indicesCount
              );
            });
            planet.blocks = newPlanet.blocks;
            planet.ready = true;
          }
          break;
        }
        default:
          break;
      }
    },
    false
  );

  worker.postMessage({
    reqid,
    action: "BUILD_PLANET",
    data: planet
  });

  return planet;
};

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
