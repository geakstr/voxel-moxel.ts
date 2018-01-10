import { ATLAS, GL_CROP_SIZE } from "./constants";
import { atlas } from "./atlas-map";

export const getAtlasCoords = () => coords;
export const getAtlasCoord = (textureName: ATLAS) => coords[textureName];

const coords: { [key: string]: number[] } = {};

Object.keys(atlas).forEach(textureName => {
  coords[textureName] = [
    atlas[textureName][0] * GL_CROP_SIZE,
    atlas[textureName][1] * GL_CROP_SIZE
  ];
});
