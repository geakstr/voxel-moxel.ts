import { vec2 } from "gl-matrix";
import { ATLAS, GL_CROP_SIZE } from "./constants";
import { atlas } from "./atlas-map";

export const getAtlasCoords = () => coords;
export const getAtlasCoord = (textureName: ATLAS) => coords[textureName];

const coords: { [key: string]: vec2 } = {};

Object.keys(atlas).forEach(textureName => {
  const [u, v] = atlas[textureName];
  coords[textureName] = vec2.fromValues(u * GL_CROP_SIZE, v * GL_CROP_SIZE);
});
