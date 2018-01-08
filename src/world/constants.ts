import { ATLAS } from "~/textures";

export const WORLD_HEIGHT = 6;
export const WORLD_SIZE = 16;
export const CHUNK_SIZE = 16;
export const WORLD_BORDER = WORLD_SIZE * CHUNK_SIZE - 1;
export const WORLD_SKY = WORLD_HEIGHT * CHUNK_SIZE - 1;

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
