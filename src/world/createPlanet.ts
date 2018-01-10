import { Planet } from "../types";
import { createVertexArray } from "./createVertexArray";

const worker = new Worker("/workers/planet.worker.js");

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
              delete chunk.data;
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
