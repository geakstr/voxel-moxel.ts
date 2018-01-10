import { ATLAS } from "../textures/constants";
import { getAtlasCoord } from "../textures/atlas";
import { SIDE } from "./types";
import { SIDES_MAP, TEX_COORDS_MAP } from "./constants";

export const createCube = (
  x: number,
  y: number,
  z: number,
  texture: ATLAS,
  sides: SIDE[]
) => {
  const data: number[] = [];
  sides.forEach(side => {
    for (let i = 0, v = 0, t = 0; i < 4; i += 1, v += 3, t += 2) {
      const vertex = SIDES_MAP[side];
      const texCoord = TEX_COORDS_MAP[side];
      const texCoordOffset = getAtlasCoord(texture);
      data.push(vertex[v] + x);
      data.push(vertex[v + 1] + y);
      data.push(vertex[v + 2] + z);
      data.push(texCoord[t] + texCoordOffset[0]);
      data.push(texCoord[t + 1] + texCoordOffset[1]);
    }
  });
  return data;
};
