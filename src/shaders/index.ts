import { FRAGMENT_SHADER } from "./fragment.shader";
import { SHADER_ATTR, SHADER_UNIFORM } from "./types";
import { VERTEX_SHADER } from "./vertex.shader";

export { SHADER_ATTR, SHADER_IN_OUT, SHADER_UNIFORM } from "./types";

export const getUniform = (name: SHADER_UNIFORM) => uniforms[name];
export const getAttr = (name: SHADER_ATTR) => attrs[name];

export const createShader = (gl: WebGL2RenderingContext) => {
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);

  const shader = gl.createProgram();
  if (!shader || !vertexShader || !fragmentShader) {
    throw new Error("Can't create shader");
  }

  gl.attachShader(shader, vertexShader);
  gl.attachShader(shader, fragmentShader);
  gl.linkProgram(shader);
  if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
    throw new Error("Can't init shaders");
  }
  gl.useProgram(shader);

  attr(gl, shader, SHADER_ATTR.POSITION);
  attr(gl, shader, SHADER_ATTR.TEX_COORD);

  uniform(gl, shader, SHADER_UNIFORM.MVP_MATRIX);
  uniform(gl, shader, SHADER_UNIFORM.SAMPLER);

  return shader;
};

const uniforms = {} as { [key: string]: WebGLUniformLocation };
const attrs = {} as { [key: string]: number };

const attr = (
  gl: WebGL2RenderingContext,
  shader: WebGLProgram,
  name: SHADER_ATTR
) => {
  const attribLocation = gl.getAttribLocation(shader, name);
  attrs[name] = attribLocation;
  return attribLocation;
};

const uniform = (
  gl: WebGL2RenderingContext,
  shader: WebGLProgram,
  name: SHADER_UNIFORM
) => {
  const uniform = gl.getUniformLocation(shader, name);
  if (!uniform) {
    throw new Error(`Could not get ${name} uniform location`);
  }
  uniforms[name] = uniform;
  return uniform;
};

const compileShader = (
  gl: WebGL2RenderingContext,
  shaderType: number,
  shaderBody: string
) => {
  const shader = gl.createShader(shaderType);
  if (!shader) return null;
  gl.shaderSource(shader, shaderBody);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }
  return shader;
};
