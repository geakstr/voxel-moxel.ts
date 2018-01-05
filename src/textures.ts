import { WebGLTextureExtended } from "./extendedClasses";

const texturesMap: { [key: string]: WebGLTextureExtended } = {};

export enum TEXTURE {
  COBBLESTONE
}

export enum TEXTURE_SRC {
  COBBLESTONE = "./assets/cobblestone.png"
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

export const loadTextures = (gl: WebGL2RenderingContext) => {
  addTexture(gl, TEXTURE.COBBLESTONE, TEXTURE_SRC.COBBLESTONE);
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
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    texture.image
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.bindTexture(gl.TEXTURE_2D, null);
};

const isPowerOf2 = (value: number) => (value & (value - 1)) == 0;
