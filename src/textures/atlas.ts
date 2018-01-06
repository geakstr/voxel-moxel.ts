import { vec2 } from "gl-matrix";
import { TEXTURE, GL_CROP_SIZE } from "./constants";
import { atlas } from "./atlas-map";

const coords: { [key: string]: vec2 } = {};

export const getCoord = (textureName: TEXTURE) => coords[textureName];

export const readAtlas = () => {
  Object.keys(atlas).forEach(textureName => {
    const [u, v] = atlas[textureName];
    coords[textureName] = vec2.fromValues(u * GL_CROP_SIZE, v * GL_CROP_SIZE);
  });
};
