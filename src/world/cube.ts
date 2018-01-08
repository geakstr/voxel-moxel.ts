import { ATLAS, getAtlasCoord } from "~/textures";
import { createVertexArray } from "./common";

export enum SIDE {
  ALL = "ALL",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  FRONT = "FRONT",
  BACK = "BACK"
}

export const createCube = (
  gl: WebGL2RenderingContext,
  x: number,
  y: number,
  z: number,
  texture: ATLAS,
  sides: SIDE[]
) => {
  const vertices: number[] = [];
  const texCoords: number[] = [];
  const atlasCoord = getAtlasCoord(texture);
  sides.forEach(side => {
    vertices.push(...translate(SIDES[side], x, y, z));
    texCoords.push(...TEX_COORDS[side]);
  });

  const data = [];
  const count = vertices.length;
  for (let v = 0, t = 0, to = 0; v < count; v += 3, t += 2, to += 2) {
    data.push(vertices[v]);
    data.push(vertices[v + 1]);
    data.push(vertices[v + 2]);
    data.push(texCoords[t]);
    data.push(texCoords[t + 1]);
    data.push(atlasCoord[0]);
    data.push(atlasCoord[1]);
  }
  return data;
};

const translate = (
  vertices: number[],
  xOffset: number,
  yOffset: number,
  zOffset: number
) => {
  const count = vertices.length;
  const translatedVertices = [];
  for (let i = 0; i < count; i += 3) {
    translatedVertices.push(vertices[i] + xOffset);
    translatedVertices.push(vertices[i + 1] + yOffset);
    translatedVertices.push(vertices[i + 2] + zOffset);
  }
  return translatedVertices;
};

// prettier-ignore
const FRONT_SIDE = [
  // front
  0, 0, 1, // v1
  1, 0, 1, // v2
  0, 1, 1, // v0
  1, 1, 1, // v3
];

// prettier-ignore
const BACK_SIDE = [
  // back
  1, 0, 0, // v6
  0, 0, 0, // v7
  1, 1, 0, // v5
  0, 1, 0, // v4
];

// prettier-ignore
const LEFT_SIDE = [
  // left
  0, 0, 0, // v7
  0, 0, 1, // v1
  0, 1, 0, // v4
  0, 1, 1, // v0
];

// prettier-ignore
const RIGHT_SIDE = [
  // right
  1, 0, 1, // v2
  1, 0, 0, // v6
  1, 1, 1, // v3
  1, 1, 0, // v5
];

// prettier-ignore
const TOP_SIDE = [
  // top
  0, 1, 1, // v0
  1, 1, 1, // v3
  0, 1, 0, // v4
  1, 1, 0, // v5
];

// prettier-ignore
const BOTTOM_SIDE = [
  // bottom
  0, 0, 0, // v7
  1, 0, 0, // v6
  0, 0, 1, // v1
  1, 0, 1, // v2
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

const SIDES: { [key: string]: number[] } = {
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
  // front
  0, 1, 1, 1,
  0, 0, 1, 0,  
];

// prettier-ignore
const BACK_TEX_COORDS = [
  // back
  0, 1, 1, 1,
  0, 0, 1, 0,  
];

// prettier-ignore
const LEFT_TEX_COORDS = [  
  // left
  1, 1, 0, 1,
  1, 0, 0, 0,  
];

// prettier-ignore
const RIGHT_TEX_COORDS = [
  // right
  1, 1, 0, 1,
  1, 0, 0, 0,
];

// prettier-ignore
const TOP_TEX_COORDS = [
  // top
  0, 1, 1, 1,
  0, 0, 1, 0
];

// prettier-ignore
const BOTTOM_TEX_COORDS = [
  // bottom
  0, 1, 1, 1,
  0, 0, 1, 0
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

const TEX_COORDS: { [key: string]: number[] } = {
  ALL: ALL_TEX_COORDS,
  LEFT: LEFT_TEX_COORDS,
  RIGHT: RIGHT_TEX_COORDS,
  FRONT: FRONT_TEX_COORDS,
  BACK: BACK_TEX_COORDS,
  TOP: TOP_TEX_COORDS,
  BOTTOM: BOTTOM_TEX_COORDS
};
