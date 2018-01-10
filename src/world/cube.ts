import { ATLAS, GL_CROP_SIZE, getAtlasCoord } from "../textures";
import { CUBE_STRING_TO_INT_TYPE } from "./constants";

export enum SIDE {
  ALL = "ALL",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  FRONT = "FRONT",
  BACK = "BACK"
}

export const SIDE_STRING_TO_INT_TYPE: {
  [key: string]: number;
} = {};

export const SIDE_INT_TO_STRING_TYPE: {
  [key: number]: string;
} = {};

Object.keys(SIDE).forEach((stringType, i) => {
  SIDE_STRING_TO_INT_TYPE[stringType] = i + 1;
  SIDE_INT_TO_STRING_TYPE[i + 1] = stringType;
}, {});

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

const VERTEX_0 = [0, 1, 1];
const VERTEX_1 = [0, 0, 1];
const VERTEX_2 = [1, 0, 1];
const VERTEX_3 = [1, 1, 1];
const VERTEX_4 = [0, 1, 0];
const VERTEX_5 = [1, 1, 0];
const VERTEX_6 = [1, 0, 0];
const VERTEX_7 = [0, 0, 0];

export const TEX_COORDS_0 = [0, 0];
export const TEX_COORDS_1 = [0, 1 * GL_CROP_SIZE];
export const TEX_COORDS_2 = [1 * GL_CROP_SIZE, 0];
export const TEX_COORDS_3 = [1 * GL_CROP_SIZE, 1 * GL_CROP_SIZE];

// prettier-ignore
const FRONT_SIDE = [
  ...VERTEX_1,
  ...VERTEX_2,
  ...VERTEX_0,
  ...VERTEX_3,
];

// prettier-ignore
const BACK_SIDE = [
  ...VERTEX_6,
  ...VERTEX_7,
  ...VERTEX_5,
  ...VERTEX_4,
];

// prettier-ignore
const LEFT_SIDE = [
  ...VERTEX_7,
  ...VERTEX_1,
  ...VERTEX_4,
  ...VERTEX_0,
];

// prettier-ignore
const RIGHT_SIDE = [
  ...VERTEX_2,
  ...VERTEX_6,
  ...VERTEX_3,
  ...VERTEX_5,
];

// prettier-ignore
const TOP_SIDE = [
  ...VERTEX_0,
  ...VERTEX_3,
  ...VERTEX_4,
  ...VERTEX_5,
];

// prettier-ignore
const BOTTOM_SIDE = [
  ...VERTEX_7,
  ...VERTEX_6,
  ...VERTEX_1,
  ...VERTEX_2,
];

// prettier-ignore
const ALL_SIDES = [
  ...FRONT_SIDE,
  ...BACK_SIDE,
  ...LEFT_SIDE,
  ...RIGHT_SIDE,
  ...TOP_SIDE,
  ...BOTTOM_SIDE
];

const SIDES_MAP: { [key: string]: number[] } = {
  ALL: ALL_SIDES,
  LEFT: LEFT_SIDE,
  RIGHT: RIGHT_SIDE,
  TOP: TOP_SIDE,
  BOTTOM: BOTTOM_SIDE,
  FRONT: FRONT_SIDE,
  BACK: BACK_SIDE
};

// prettier-ignore
const FRONT_TEX_COORDS = [
  ...TEX_COORDS_1, ...TEX_COORDS_3,
  ...TEX_COORDS_0, ...TEX_COORDS_2
];

// prettier-ignore
const BACK_TEX_COORDS = [
  ...FRONT_TEX_COORDS
];

// prettier-ignore
const LEFT_TEX_COORDS = [  
  ...TEX_COORDS_3, ...TEX_COORDS_1,
  ...TEX_COORDS_2, ...TEX_COORDS_0,  
];

// prettier-ignore
const RIGHT_TEX_COORDS = [
  ...LEFT_TEX_COORDS
];

// prettier-ignore
const TOP_TEX_COORDS = [
  ...TEX_COORDS_1, ...TEX_COORDS_3,
  ...TEX_COORDS_0, ...TEX_COORDS_2
];

// prettier-ignore
const BOTTOM_TEX_COORDS = [
  ...TOP_TEX_COORDS
];

// prettier-ignore
const ALL_TEX_COORDS = [
  ...FRONT_TEX_COORDS,
  ...BACK_TEX_COORDS,
  ...LEFT_TEX_COORDS,
  ...RIGHT_TEX_COORDS,
  ...TOP_TEX_COORDS,
  ...BOTTOM_TEX_COORDS
];

const TEX_COORDS_MAP: { [key: string]: number[] } = {
  ALL: ALL_TEX_COORDS,
  LEFT: LEFT_TEX_COORDS,
  RIGHT: RIGHT_TEX_COORDS,
  FRONT: FRONT_TEX_COORDS,
  BACK: BACK_TEX_COORDS,
  TOP: TOP_TEX_COORDS,
  BOTTOM: BOTTOM_TEX_COORDS
};
