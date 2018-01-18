import { queue } from "async";
import * as ndarray from "ndarray";
import { vec3 } from "gl-matrix";
import { CHUNK_SIZE } from "../constants";
import { Planet, Chunk } from "../types";
import { position } from "../renderer/camera";
import {
  getPlanetByPosition,
  getPlanetCoord,
  getPlanetCoordKey,
  addPlanet
} from "./universe";
import { createVertexArray } from "./vao";

const worker = new Worker("/workers/planet.worker.js");

export const createPlanet = (
  gl: WebGL2RenderingContext,
  position: vec3
): Planet => {
  const { x, y, z } = getPlanetCoord(position);
  const coord = getPlanetCoordKey(position);
  const planet: Planet = {
    x,
    y,
    z,
    coord,
    chunks: [],
    chunksCoords: {}
  };
  return planet;
};

const chunksQ = queue<
  { gl: WebGL2RenderingContext; planet: Planet; chunk: Chunk },
  {}
>((task, callback) => {
  const { gl, planet, chunk } = task;
  addChunk(planet, {
    ...chunk,
    vao: createVertexArray(gl, chunk.data!, chunk.indicesCount)
  });
  delete chunk.data;
  callback();
}, 1);

export const createChunk = (
  gl: WebGL2RenderingContext,
  position: vec3,
  planet: Planet
): Chunk => {
  const { x, y, z } = getChunkCoord(position);
  const coord = getChunkCoordKey(position);
  const chunk: Chunk = {
    x,
    y,
    z,
    coord,
    blocks: ndarray([]),
    indicesCount: 0,
    vao: null,
    data: null
  };

  const reqid = Math.random();
  worker.addEventListener(
    "message",
    e => {
      const { resid, action, data } = e.data;
      switch (action) {
        case "BUILD_CHUNK": {
          if (resid === reqid) {
            chunksQ.push({
              gl,
              planet,
              chunk: data as Chunk
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

  const { chunks, ...planetWithoutChunks } = planet;
  worker.postMessage({
    reqid,
    action: "BUILD_CHUNKS_AROUND",
    data: {
      chunk,
      position
    }
  });

  return chunk;
};

export const getChunkCoord = (position: vec3) => {
  const x = Math.round(position[0] / CHUNK_SIZE);
  const y = Math.round(position[1] / CHUNK_SIZE);
  const z = Math.round(position[2] / CHUNK_SIZE);
  return { x, y, z };
};

export const getChunkCoordKey = (position: vec3) => {
  const { x, y, z } = getChunkCoord(position);
  return `${x}:${y}:${z}`;
};

export const getChunkByPosition = (planet: Planet, position: vec3) =>
  planet.chunks[planet.chunksCoords[getChunkCoordKey(position)]];

export const addChunk = (planet: Planet, chunk: Chunk) => {
  planet.chunks.push(chunk);
  planet.chunksCoords[chunk.coord] = planet.chunks.length - 1;
};

export const putChunk = (planet: Planet, coord: string, chunk: Chunk) => {
  planet.chunks[planet.chunksCoords[chunk.coord]] = chunk;
};
