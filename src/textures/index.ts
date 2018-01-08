import { ATLAS, TEXTURE, TEXTURE_SRC } from "./constants";
import { fillAtlas, getAtlasCoord } from "./atlas";

export { ATLAS, ATLAS_SIZE, CROP_SIZE } from "./constants";
export { getAtlasCoord } from "./atlas";

const texturesMap: { [key: string]: WebGLTextureExtended } = {};

export class WebGLTextureExtended extends WebGLTexture {
  public image: HTMLImageElement;
}

export const addTexture = (
  gl: WebGL2RenderingContext,
  name: TEXTURE,
  src: TEXTURE_SRC
) => {
  const texture = createTexture(gl, src);
  texturesMap[name] = texture;
  return texture;
};

const rnd = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from + 1)) + from;

export const getTexture = (name: TEXTURE) => texturesMap[name];
export const getRandomTexture = () => {
  const keys = Object.keys(ATLAS);
  const max = keys.length - 1;
  return keys[rnd(0, max)] as ATLAS;
};
export const getAtlas = () => getTexture(TEXTURE.ATLAS);

export const loadTextures = (gl: WebGL2RenderingContext) => {
  fillAtlas();
  addTexture(gl, TEXTURE.ATLAS, TEXTURE_SRC.ATLAS);
};

const createTexture = (gl: WebGL2RenderingContext, src: string) => {
  const texture = gl.createTexture() as WebGLTextureExtended;
  if (!texture) {
    throw new Error("Could not load texture");
  }
  texture.image = new Image();
  texture.image.onload = handleLoadedTexture.bind(null, gl, texture);
  texture.image.src = src;
  return texture;
};

const handleLoadedTexture = (
  gl: WebGL2RenderingContext,
  texture: WebGLTextureExtended
) => {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texture.image
  );
  gl.bindTexture(gl.TEXTURE_2D, null);
};

const isPowerOf2 = (value: number) => (value & (value - 1)) == 0;
