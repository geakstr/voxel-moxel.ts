import * as is from "is";

export const getUniform = (name: UNIFORM) => uniforms[name];
export const getAttr = (name: ATTR) => attrs[name];
export const hasAttr = (name: ATTR) => is.number(attrs[name]);

export enum ATTR {
  POSITION = "a_pos",
  TEX_COORD = "a_tex_coord",
  TEX_OFFSET = "a_tex_offset",
  COLOR = "a_color"
}

export enum UNIFORM {
  MVP_MATRIX = "u_mvp_matrix",
  SAMPLER = "u_sampler"
}

export enum IN_OUT {
  VERTEX_POSITION = "v_pos",
  TEX_COORD = "v_tex_coord",
  TEX_OFFSET = "v_tex_offset",
  COLOR = "v_color"
}

const VERTEX_SHADER = `
#version 300 es

in vec3 ${ATTR.POSITION};
in vec2 ${ATTR.TEX_COORD};
in vec2 ${ATTR.TEX_OFFSET};

uniform mat4 ${UNIFORM.MVP_MATRIX};

out vec3 ${IN_OUT.VERTEX_POSITION};
out vec2 ${IN_OUT.TEX_COORD};
out vec2 ${IN_OUT.TEX_OFFSET};

void main(void) {  
  ${IN_OUT.VERTEX_POSITION} = ${ATTR.POSITION};
  ${IN_OUT.TEX_COORD} = ${ATTR.TEX_COORD};
  ${IN_OUT.TEX_OFFSET} = ${ATTR.TEX_OFFSET};

  gl_Position = ${UNIFORM.MVP_MATRIX} * vec4(${ATTR.POSITION}, 1.0);
}
`.trim();

// prettier-ignore
const FRAGMENT_SHADER = `
#version 300 es

precision mediump float;

in vec3 ${IN_OUT.VERTEX_POSITION};
in vec2 ${IN_OUT.TEX_COORD};
in vec2 ${IN_OUT.TEX_OFFSET};

uniform sampler2D ${UNIFORM.SAMPLER};

out vec4 FragColor;

void main(void) {  
  FragColor = texture(${UNIFORM.SAMPLER}, vec2(${IN_OUT.TEX_COORD}.s, ${IN_OUT.TEX_COORD}.t));
}
`.trim();

export const createShader = (gl: WebGL2RenderingContext) => {
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);

  const shader = gl.createProgram();
  if (!shader) {
    throw new Error("Can't create shader");
  }

  gl.attachShader(shader, vertexShader);
  gl.attachShader(shader, fragmentShader);
  gl.linkProgram(shader);
  if (!gl.getProgramParameter(shader, gl.LINK_STATUS)) {
    throw new Error("Can't init shaders");
  }
  gl.useProgram(shader);

  attr(gl, shader, ATTR.POSITION);
  attr(gl, shader, ATTR.TEX_COORD);
  // attr(gl, shader, ATTR.TEX_OFFSET);
  // attr(gl, shader, ATTR.COLOR);

  uniform(gl, shader, UNIFORM.MVP_MATRIX);
  uniform(gl, shader, UNIFORM.SAMPLER);

  return shader;
};

const uniforms = {} as { [key: string]: WebGLUniformLocation };
const attrs = {} as { [key: string]: number };

const attr = (gl: WebGL2RenderingContext, shader: WebGLProgram, name: ATTR) => {
  const attribLocation = gl.getAttribLocation(shader, name);
  attrs[name] = attribLocation;
  return attribLocation;
};

const uniform = (
  gl: WebGL2RenderingContext,
  shader: WebGLProgram,
  name: UNIFORM
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
  gl.shaderSource(shader, shaderBody);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }
  return shader;
};
