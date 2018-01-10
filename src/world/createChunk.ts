import { Chunk } from "../types";
import {
  ATLAS,
  CHUNK_SIZE,
  PLANET_BORDER,
  CUBE_INT_TO_STRING_TYPE,
  SIDE
} from "../constants";
import { createCube } from "./createCube";

export const createChunk = (
  blocks: number[][][],
  planetXOffset: number,
  planetYOffset: number,
  planetZOffset: number,
  chunkXOffset: number,
  chunkYOffset: number,
  chunkZOffset: number
): Chunk => {
  const data = [];
  for (let blockX = 0; blockX < CHUNK_SIZE; blockX += 1) {
    for (let blockY = 0; blockY < CHUNK_SIZE; blockY += 1) {
      for (let blockZ = 0; blockZ < CHUNK_SIZE; blockZ += 1) {
        const cubeType =
          blocks[chunkXOffset + blockX][chunkYOffset + blockY][
            chunkZOffset + blockZ
          ];
        if (typeof cubeType !== "undefined") {
          const xx = blockX + chunkXOffset;
          const yy = blockY + chunkYOffset;
          const zz = blockZ + chunkZOffset;
          const texture = ATLAS[
            CUBE_INT_TO_STRING_TYPE[cubeType] as any
          ] as ATLAS;
          const cube = createCube(
            xx + planetXOffset,
            yy + planetYOffset,
            zz + planetZOffset,
            texture,
            renderableSides(blocks, xx, yy, zz)
          );
          data.push(...cube);
        }
      }
    }
  }
  return {
    x: chunkXOffset + planetXOffset,
    y: chunkYOffset + planetYOffset,
    z: chunkZOffset + planetZOffset,
    indicesCount: data.length / 5 * 3 / 2,
    data: new Float32Array(data)
  };
};

const renderableSides = (
  blocks: number[][][],
  x: number,
  y: number,
  z: number
): SIDE[] => {
  const sides: SIDE[] = [];
  if (x + 1 > PLANET_BORDER || typeof blocks[x + 1][y][z] === "undefined") {
    sides.push(SIDE.RIGHT);
  }
  if (x - 1 < 0 || typeof blocks[x - 1][y][z] === "undefined") {
    sides.push(SIDE.LEFT);
  }
  if (z + 1 > PLANET_BORDER || typeof blocks[x][y][z + 1] === "undefined") {
    sides.push(SIDE.FRONT);
  }
  if (z - 1 < 0 || typeof blocks[x][y][z - 1] === "undefined") {
    sides.push(SIDE.BACK);
  }
  if (y + 1 > PLANET_BORDER || typeof blocks[x][y + 1][z] === "undefined") {
    sides.push(SIDE.TOP);
  }
  if (y - 1 < 0 || typeof blocks[x][y - 1][z] === "undefined") {
    sides.push(SIDE.BOTTOM);
  }
  return sides;
};
