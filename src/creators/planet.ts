import { queue } from "async";
import { position } from "../renderer/camera";
import { ChunkBase, Planet } from "../types";
import { createVertexArray } from "./vao";

const worker = new Worker(
  new URL("../workers/planet.worker.js", import.meta.url),
  {
    name: "planet-worker",
    type: "module",
  }
);

const chunksQ = queue<
  { gl: WebGL2RenderingContext; planet: Planet; chunkBase: ChunkBase },
  {}
>((task, callback) => {
  const { gl, planet, chunkBase } = task;
  planet.chunks.push({
    x: chunkBase.x,
    y: chunkBase.y,
    z: chunkBase.z,
    blocks: chunkBase.blocks,
    indicesCount: chunkBase.indicesCount,
    vao: createVertexArray(gl, chunkBase.data, chunkBase.indicesCount),
  });
  callback();
}, 1);

export const createPlanet = (
  gl: WebGL2RenderingContext,
  planet: Planet
): Planet => {
  const reqid = Math.random();
  worker.addEventListener(
    "message",
    (e) => {
      const { resid, action, data } = e.data;
      switch (action) {
        case "BUILD_CHUNK": {
          if (resid === reqid) {
            chunksQ.push({
              gl,
              planet,
              chunkBase: data as ChunkBase,
            });
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
    data: {
      planet,
      position,
    },
  });

  return planet;
};
