import * as ndarray from "ndarray";
import { ChunkBase } from "../types";
import {
  ATLAS,
  CHUNK_SIZE,
  PLANET_BORDER,
  BLOCK_INT_TO_STRING_TYPE,
  SIDE
} from "../constants";
import { createBlock } from "./block";

export const createChunkBase = (
  blocks: ndarray,
  planetXOffset: number,
  planetYOffset: number,
  planetZOffset: number,
  chunkXOffset: number,
  chunkYOffset: number,
  chunkZOffset: number
): ChunkBase => {
  const data = [];
  for (let blockX = 0; blockX < CHUNK_SIZE; blockX += 1) {
    for (let blockY = 0; blockY < CHUNK_SIZE; blockY += 1) {
      for (let blockZ = 0; blockZ < CHUNK_SIZE; blockZ += 1) {
        const blockType = blocks.get(blockX, blockY, blockZ);
        if (blockType !== 0) {
          data.push(
            ...createBlock(
              blockType,
              blockX + chunkXOffset + planetXOffset,
              blockY + chunkYOffset + planetYOffset,
              blockZ + chunkZOffset + planetZOffset,
              renderableSides(blocks, blockX, blockY, blockZ)
            )
          );
        }
      }
    }
  }
  return {
    blocks,
    x: chunkXOffset + planetXOffset,
    y: chunkYOffset + planetYOffset,
    z: chunkZOffset + planetZOffset,
    indicesCount: data.length / 5 * 3 / 2,
    data: new Float32Array(data)
  };
};

const renderableSides = (
  blocks: ndarray,
  x: number,
  y: number,
  z: number
): SIDE[] => {
  const sides: SIDE[] = [];
  if (x + 1 >= CHUNK_SIZE || blocks.get(x + 1, y, z) === 0) {
    sides.push(SIDE.RIGHT);
  }
  if (x - 1 < 0 || blocks.get(x - 1, y, z) === 0) {
    sides.push(SIDE.LEFT);
  }
  if (z + 1 >= CHUNK_SIZE || blocks.get(x, y, z + 1) === 0) {
    sides.push(SIDE.FRONT);
  }
  if (z - 1 < 0 || blocks.get(x, y, z - 1) === 0) {
    sides.push(SIDE.BACK);
  }
  if (y + 1 >= CHUNK_SIZE || blocks.get(x, y + 1, z) === 0) {
    sides.push(SIDE.TOP);
  }
  if (y - 1 < 0 || blocks.get(x, y - 1, z) === 0) {
    sides.push(SIDE.BOTTOM);
  }
  return sides;
};
