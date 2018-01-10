import { vec2 } from "gl-matrix";
import { ATLAS, GL_CROP_SIZE } from "./constants";
import { atlas } from "./atlas-map";

export const getAtlasCoords = () => coords;
export const getAtlasCoord = (textureName: ATLAS) => coords[textureName];

const coords: { [key: string]: vec2 } = {};

Object.keys(atlas).forEach(textureName => {
  coords[textureName] = vec2.fromValues(
    atlas[textureName][0] * GL_CROP_SIZE,
    atlas[textureName][1] * GL_CROP_SIZE
  );
});
