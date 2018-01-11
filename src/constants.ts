export const UNIVERSE_SIZE = 1;
export const CHUNK_SIZE = 16;
export const HALF_CHUNK_SIZE = CHUNK_SIZE / 2;
export const PLANET_SIZE = 8;
export const PLANET_BORDER = PLANET_SIZE * CHUNK_SIZE - 1;

export const ATLAS_SIZE = 80;
export const CROP_SIZE = 16;

export const GL_PIXEL_SIZE = 1.0 / ATLAS_SIZE;
export const GL_CROP_SIZE = GL_PIXEL_SIZE * CROP_SIZE;

export enum ATLAS {
  COBBLESTONE = "COBBLESTONE",
  GRASS = "GRASS",
  STONE = "STONE",
  DIRT = "DIRT",
  DIRT_WITH_GRASS = "DIRT_WITH_GRASS",
  WOOD_0 = "WOOD_0",
  BEDROCK = "BEDROCK",
  SAND = "SAND",
  GRAVEL = "GRAVEL",
  WOOD = "WOOD",
  GOLD_ORE = "GOLD_ORE",
  IRON_ORE = "IRON_ORE",
  COAL_ORE = "COAL_ORE",
  BOOKSHELF = "BOOKSHELF",
  MOSS_STONE = "MOSS_STONE",
  SPONGE = "SPONGE",
  GLASS = "GLASS",
  DIAMOND_ORE = "DIAMOND_ORE",
  REDSTONE_ORE = "REDSTONE_ORE",
  LEAVES = "LEAVES",
  WOOL = "WOOL",
  MONSTER_SPAWNER = "MONSTER_SPAWNER",
  SNOW = "snSNOWow",
  ICE = "ICE",
  DIRT_WITH_SNOW = "DIRT_WITH_SNOW"
}

export enum TEXTURE {
  ATLAS = "ATLAS"
}

export enum SIDE {
  ALL = "ALL",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  FRONT = "FRONT",
  BACK = "BACK"
}

export const KEYBOARD = {
  W: 87,
  S: 83,
  A: 65,
  D: 68,
  SPACE: 32,
  L_SHIFT: 16,
  ENTER: 13
};

export const ATLAS_MAP: { [key: string]: number[] } = {
  [ATLAS.GRASS]: [0, 0],
  [ATLAS.STONE]: [1, 0],
  [ATLAS.DIRT]: [2, 0],
  [ATLAS.DIRT_WITH_GRASS]: [3, 0],
  [ATLAS.WOOD_0]: [4, 0],

  [ATLAS.COBBLESTONE]: [0, 1],
  [ATLAS.BEDROCK]: [1, 1],
  [ATLAS.SAND]: [2, 1],
  [ATLAS.GRAVEL]: [3, 1],
  [ATLAS.WOOD]: [4, 1],

  [ATLAS.GOLD_ORE]: [0, 2],
  [ATLAS.IRON_ORE]: [1, 2],
  [ATLAS.COAL_ORE]: [2, 2],
  [ATLAS.BOOKSHELF]: [3, 2],
  [ATLAS.MOSS_STONE]: [4, 2],

  [ATLAS.SPONGE]: [0, 3],
  [ATLAS.GLASS]: [1, 3],
  [ATLAS.DIAMOND_ORE]: [2, 3],
  [ATLAS.REDSTONE_ORE]: [3, 3],
  [ATLAS.LEAVES]: [4, 3],

  [ATLAS.WOOL]: [0, 4],
  [ATLAS.MONSTER_SPAWNER]: [1, 4],
  [ATLAS.SNOW]: [2, 4],
  [ATLAS.ICE]: [3, 4],
  [ATLAS.DIRT_WITH_SNOW]: [4, 4]
};

export enum TEXTURE_SRC {
  ATLAS = "./assets/atlas.png"
}

export const BLOCK_STRING_TO_INT_TYPE: {
  [key: string]: number;
} = {};

export const BLOCK_INT_TO_STRING_TYPE: {
  [key: number]: string;
} = {};

Object.keys(ATLAS).forEach((stringType, i) => {
  BLOCK_STRING_TO_INT_TYPE[stringType] = i + 1;
  BLOCK_INT_TO_STRING_TYPE[i + 1] = stringType;
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
