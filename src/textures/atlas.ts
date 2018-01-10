import { ATLAS, ATLAS_MAP, GL_CROP_SIZE } from "../constants";

export const getAtlasCoords = () => coords;
export const getAtlasCoord = (textureName: ATLAS) => coords[textureName];

const coords: { [key: string]: number[] } = {};

Object.keys(ATLAS_MAP).forEach(textureName => {
  coords[textureName] = [
    ATLAS_MAP[textureName][0] * GL_CROP_SIZE,
    ATLAS_MAP[textureName][1] * GL_CROP_SIZE
  ];
});
