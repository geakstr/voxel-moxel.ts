import { vec2 } from "gl-matrix";
import { TEXTURE } from "./constants";

export const atlas: { [key: string]: vec2 } = {
  [TEXTURE.GRASS]: vec2.fromValues(0, 0),
  [TEXTURE.STONE]: vec2.fromValues(1, 0),
  [TEXTURE.DIRT]: vec2.fromValues(2, 0),
  [TEXTURE.DIRT_WITH_GRASS]: vec2.fromValues(3, 0),
  [TEXTURE.WOOD_0]: vec2.fromValues(4, 0),

  [TEXTURE.COBBLESTONE]: vec2.fromValues(0, 1),
  [TEXTURE.BEDROCK]: vec2.fromValues(1, 1),
  [TEXTURE.SAND]: vec2.fromValues(2, 1),
  [TEXTURE.GRAVEL]: vec2.fromValues(3, 1),
  [TEXTURE.WOOD]: vec2.fromValues(4, 1),

  [TEXTURE.GOLD_ORE]: vec2.fromValues(0, 2),
  [TEXTURE.IRON_ORE]: vec2.fromValues(1, 2),
  [TEXTURE.COAL_ORE]: vec2.fromValues(2, 2),
  [TEXTURE.BOOKSHELF]: vec2.fromValues(3, 2),
  [TEXTURE.MOSS_STONE]: vec2.fromValues(4, 2),

  [TEXTURE.SPONGE]: vec2.fromValues(0, 3),
  [TEXTURE.GLASS]: vec2.fromValues(1, 3),
  [TEXTURE.DIAMOND_ORE]: vec2.fromValues(2, 3),
  [TEXTURE.REDSTONE_ORE]: vec2.fromValues(3, 3),
  [TEXTURE.LEAVES]: vec2.fromValues(4, 3),

  [TEXTURE.WOOL]: vec2.fromValues(0, 4),
  [TEXTURE.MONSTER_SPAWNER]: vec2.fromValues(1, 4),
  [TEXTURE.SNOW]: vec2.fromValues(2, 4),
  [TEXTURE.ICE]: vec2.fromValues(3, 4),
  [TEXTURE.DIRT_WITH_SNOW]: vec2.fromValues(4, 4)
};
