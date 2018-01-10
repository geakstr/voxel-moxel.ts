import { ATLAS, TEXTURE, TEXTURE_SRC } from "./constants";
import { getAtlasCoord } from "./atlas";

export {
  ATLAS,
  ATLAS_SIZE,
  CROP_SIZE,
  GL_PIXEL_SIZE,
  GL_CROP_SIZE
} from "./constants";
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

export const getTexture = (name: TEXTURE) => texturesMap[name];
export { getRandomTexture } from "./getRandomTexture";
export const getAtlas = () => getTexture(TEXTURE.ATLAS);

export const loadTextures = (gl: WebGL2RenderingContext) => {
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
