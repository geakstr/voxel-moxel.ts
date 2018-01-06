import { vec2 } from "gl-matrix";
import { ATLAS } from "./constants";

export const atlas: { [key: string]: vec2 } = {
  [ATLAS.GRASS]: vec2.fromValues(0, 0),
  [ATLAS.STONE]: vec2.fromValues(1, 0),
  [ATLAS.DIRT]: vec2.fromValues(2, 0),
  [ATLAS.DIRT_WITH_GRASS]: vec2.fromValues(3, 0),
  [ATLAS.WOOD_0]: vec2.fromValues(4, 0),

  [ATLAS.COBBLESTONE]: vec2.fromValues(0, 1),
  [ATLAS.BEDROCK]: vec2.fromValues(1, 1),
  [ATLAS.SAND]: vec2.fromValues(2, 1),
  [ATLAS.GRAVEL]: vec2.fromValues(3, 1),
  [ATLAS.WOOD]: vec2.fromValues(4, 1),

  [ATLAS.GOLD_ORE]: vec2.fromValues(0, 2),
  [ATLAS.IRON_ORE]: vec2.fromValues(1, 2),
  [ATLAS.COAL_ORE]: vec2.fromValues(2, 2),
  [ATLAS.BOOKSHELF]: vec2.fromValues(3, 2),
  [ATLAS.MOSS_STONE]: vec2.fromValues(4, 2),

  [ATLAS.SPONGE]: vec2.fromValues(0, 3),
  [ATLAS.GLASS]: vec2.fromValues(1, 3),
  [ATLAS.DIAMOND_ORE]: vec2.fromValues(2, 3),
  [ATLAS.REDSTONE_ORE]: vec2.fromValues(3, 3),
  [ATLAS.LEAVES]: vec2.fromValues(4, 3),

  [ATLAS.WOOL]: vec2.fromValues(0, 4),
  [ATLAS.MONSTER_SPAWNER]: vec2.fromValues(1, 4),
  [ATLAS.SNOW]: vec2.fromValues(2, 4),
  [ATLAS.ICE]: vec2.fromValues(3, 4),
  [ATLAS.DIRT_WITH_SNOW]: vec2.fromValues(4, 4)
};
