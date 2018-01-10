import { vec2 } from "gl-matrix";
import { ATLAS } from "./constants";

export const atlas: { [key: string]: number[] } = {
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
