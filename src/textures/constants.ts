export enum TEXTURE {
  ATLAS = "atlas"
}

export enum ATLAS {
  COBBLESTONE = "cobblestone",
  GRASS = "grass",
  STONE = "stone",
  DIRT = "dirt",
  DIRT_WITH_GRASS = "dirt_with_grass",
  WOOD_0 = "wood_0",
  BEDROCK = "bedrock",
  SAND = "sand",
  GRAVEL = "gravel",
  WOOD = "wood",
  GOLD_ORE = "gold_ore",
  IRON_ORE = "iron_ore",
  COAL_ORE = "coal_ore",
  BOOKSHELF = "bookshelf",
  MOSS_STONE = "moss_stone",
  SPONGE = "sponge",
  GLASS = "glass",
  DIAMOND_ORE = "diamond_ore",
  REDSTONE_ORE = "redstone_ore",
  LEAVES = "leaves",
  WOOL = "wool",
  MONSTER_SPAWNER = "monster_spawner",
  SNOW = "snow",
  ICE = "ice",
  DIRT_WITH_SNOW = "dirt_with_snow"
}

export enum TEXTURE_SRC {
  ATLAS = "./assets/atlas.png"
}

export const ATLAS_SIZE = 80;
export const CROP_SIZE = 16;

export const GL_PIXEL_SIZE = 1.0 / ATLAS_SIZE;
export const GL_CROP_SIZE = GL_PIXEL_SIZE * CROP_SIZE;
