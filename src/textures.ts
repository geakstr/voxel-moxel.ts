import { WebGLTextureExtended } from "./extendedClasses";

const texturesMap: { [key: string]: WebGLTextureExtended } = {};

export const addTexture = (
  gl: WebGLRenderingContext,
  name: string,
  src: string
) => {
  const texture = createTexture(gl, src);
  texturesMap[name] = texture;
  return texture;
};

export const getTexture = (name: string) => texturesMap[name];

export const loadTextures = (gl: WebGLRenderingContext) => {
  addTexture(gl, "cobblestone", "./assets/cobblestone.png");
};

const createTexture = (gl: WebGLRenderingContext, src: string) => {
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
  gl: WebGLRenderingContext,
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
  if (isPowerOf2(texture.image.width) && isPowerOf2(texture.image.height)) {
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
};

const isPowerOf2 = (value: number) => (value & (value - 1)) == 0;
