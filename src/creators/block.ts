import {
  ATLAS,
  BLOCK_INT_TO_STRING_TYPE,
  SIDE,
  SIDES_MAP,
  TEX_COORDS_MAP,
} from "../constants";
import { getAtlasCoord } from "../textures/atlas";

export const createBlock = (
  type: number,
  x: number,
  y: number,
  z: number,
  sides: SIDE[]
) => {
  const data: number[] = [];
  const texture = (ATLAS as any)[BLOCK_INT_TO_STRING_TYPE[type]] as ATLAS;
  sides.forEach((side) => {
    for (let i = 0, v = 0, t = 0; i < 4; i += 1, v += 3, t += 2) {
      const vertex = SIDES_MAP[side];
      const texCoord = TEX_COORDS_MAP[side];
      const texCoordOffset = getAtlasCoord(getTextureForSide(texture, side));
      data.push(vertex[v] + x);
      data.push(vertex[v + 1] + y);
      data.push(vertex[v + 2] + z);
      data.push(texCoord[t] + texCoordOffset[0]);
      data.push(texCoord[t + 1] + texCoordOffset[1]);
    }
  });
  return data;
};

const getTextureForSide = (texture: ATLAS, side: SIDE) => {
  switch (texture) {
    case ATLAS.DIRT_WITH_GRASS: {
      if (side === SIDE.TOP) {
        return ATLAS.GRASS;
      } else if (side === SIDE.BOTTOM) {
        return ATLAS.DIRT;
      }
      break;
    }
    case ATLAS.DIRT_WITH_SNOW: {
      if (side === SIDE.TOP) {
        return ATLAS.SNOW;
      } else if (side === SIDE.BOTTOM) {
        return ATLAS.DIRT;
      }
      break;
    }
    default: {
      return texture;
    }
  }
  return texture;
};
