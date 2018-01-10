import { ATLAS, GL_CROP_SIZE } from "../textures/constants";
import { SIDE } from "./types";

export const UNIVERSE_SIZE = 1;
export const CHUNK_SIZE = 32;
export const HALF_CHUNK_SIZE = CHUNK_SIZE / 2;
export const PLANET_SIZE = 6;
export const PLANET_BORDER = PLANET_SIZE * CHUNK_SIZE - 1;

export const CUBE_STRING_TO_INT_TYPE: {
  [key: string]: number;
} = {};

export const CUBE_INT_TO_STRING_TYPE: {
  [key: number]: string;
} = {};

Object.keys(ATLAS).forEach((stringType, i) => {
  CUBE_STRING_TO_INT_TYPE[stringType] = i + 1;
  CUBE_INT_TO_STRING_TYPE[i + 1] = stringType;
}, {});

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

export const VERTEX_0 = [0, 1, 1];
export const VERTEX_1 = [0, 0, 1];
export const VERTEX_2 = [1, 0, 1];
export const VERTEX_3 = [1, 1, 1];
export const VERTEX_4 = [0, 1, 0];
export const VERTEX_5 = [1, 1, 0];
export const VERTEX_6 = [1, 0, 0];
export const VERTEX_7 = [0, 0, 0];

export const TEX_COORDS_0 = [0, 0];
export const TEX_COORDS_1 = [0, 1 * GL_CROP_SIZE];
export const TEX_COORDS_2 = [1 * GL_CROP_SIZE, 0];
export const TEX_COORDS_3 = [1 * GL_CROP_SIZE, 1 * GL_CROP_SIZE];

// prettier-ignore
export const FRONT_SIDE = [
  ...VERTEX_1,
  ...VERTEX_2,
  ...VERTEX_0,
  ...VERTEX_3,
];

// prettier-ignore
export const BACK_SIDE = [
  ...VERTEX_6,
  ...VERTEX_7,
  ...VERTEX_5,
  ...VERTEX_4,
];

// prettier-ignore
export const LEFT_SIDE = [
  ...VERTEX_7,
  ...VERTEX_1,
  ...VERTEX_4,
  ...VERTEX_0,
];

// prettier-ignore
export const RIGHT_SIDE = [
  ...VERTEX_2,
  ...VERTEX_6,
  ...VERTEX_3,
  ...VERTEX_5,
];

// prettier-ignore
export const TOP_SIDE = [
  ...VERTEX_0,
  ...VERTEX_3,
  ...VERTEX_4,
  ...VERTEX_5,
];

// prettier-ignore
export const BOTTOM_SIDE = [
  ...VERTEX_7,
  ...VERTEX_6,
  ...VERTEX_1,
  ...VERTEX_2,
];

// prettier-ignore
export const ALL_SIDES = [
  ...FRONT_SIDE,
  ...BACK_SIDE,
  ...LEFT_SIDE,
  ...RIGHT_SIDE,
  ...TOP_SIDE,
  ...BOTTOM_SIDE
];

export const SIDES_MAP: { [key: string]: number[] } = {
  ALL: ALL_SIDES,
  LEFT: LEFT_SIDE,
  RIGHT: RIGHT_SIDE,
  TOP: TOP_SIDE,
  BOTTOM: BOTTOM_SIDE,
  FRONT: FRONT_SIDE,
  BACK: BACK_SIDE
};

// prettier-ignore
export const FRONT_TEX_COORDS = [
  ...TEX_COORDS_1, ...TEX_COORDS_3,
  ...TEX_COORDS_0, ...TEX_COORDS_2
];

// prettier-ignore
export const BACK_TEX_COORDS = [
  ...FRONT_TEX_COORDS
];

// prettier-ignore
export const LEFT_TEX_COORDS = [  
  ...TEX_COORDS_3, ...TEX_COORDS_1,
  ...TEX_COORDS_2, ...TEX_COORDS_0,  
];

// prettier-ignore
export const RIGHT_TEX_COORDS = [
  ...LEFT_TEX_COORDS
];

// prettier-ignore
export const TOP_TEX_COORDS = [
  ...TEX_COORDS_1, ...TEX_COORDS_3,
  ...TEX_COORDS_0, ...TEX_COORDS_2
];

// prettier-ignore
export const BOTTOM_TEX_COORDS = [
  ...TOP_TEX_COORDS
];

// prettier-ignore
export const ALL_TEX_COORDS = [
  ...FRONT_TEX_COORDS,
  ...BACK_TEX_COORDS,
  ...LEFT_TEX_COORDS,
  ...RIGHT_TEX_COORDS,
  ...TOP_TEX_COORDS,
  ...BOTTOM_TEX_COORDS
];

export const TEX_COORDS_MAP: { [key: string]: number[] } = {
  ALL: ALL_TEX_COORDS,
  LEFT: LEFT_TEX_COORDS,
  RIGHT: RIGHT_TEX_COORDS,
  FRONT: FRONT_TEX_COORDS,
  BACK: BACK_TEX_COORDS,
  TOP: TOP_TEX_COORDS,
  BOTTOM: BOTTOM_TEX_COORDS
};
