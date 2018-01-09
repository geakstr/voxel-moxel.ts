import { ATLAS } from "~/textures";

export const CHUNK_SIZE = 32;
export const HALF_CHUNK_SIZE = CHUNK_SIZE / 2;
export const PLANET_HEIGHT = 3;
export const PLANET_SIZE = 3;
export const PLANET_BORDER = PLANET_SIZE * CHUNK_SIZE - 1;
export const PLANET_SKY = PLANET_HEIGHT * CHUNK_SIZE - 1;

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
