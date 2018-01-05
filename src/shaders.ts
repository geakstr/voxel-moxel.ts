export const getUniform = (name: keyof Uniforms) => uniforms[name];
export const getAttrib = (name: keyof Attribs) => attribs[name];

export const createShader = (gl: WebGLRenderingContext) => {
  const fragmentShader = compileShader(gl, "shader-fs");
  const vertexShader = compileShader(gl, "shader-vs");

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

  attribs.vertexPosition = attrib(gl, shader, "aVertexPosition");
  attribs.textureCoord = attrib(gl, shader, "aTextureCoord");
  // attribs.vertexNormal = attrib(gl, shader, "aVertexNormal");

  uniforms.mvpMatrix = uniform(gl, shader, "uMVPMatrix");
  // uniforms.nMatrix = uniform(gl, shader, "uNMatrix");
  uniforms.sampler = uniform(gl, shader, "uSampler");
  // uniforms.useLighting = uniform(gl, shader, "uUseLighting");
  // uniforms.ambientColor = uniform(gl, shader, "uAmbientColor");
  // uniforms.lightingDirection = uniform(gl, shader, "uLightingDirection");
  // uniforms.directionalColor = uniform(gl, shader, "uDirectionalColor");

  return shader;
};

interface Uniforms {
  mvpMatrix: WebGLUniformLocation;
  nMatrix: WebGLUniformLocation;
  sampler: WebGLUniformLocation;
  useLighting: WebGLUniformLocation;
  ambientColor: WebGLUniformLocation;
  lightingDirection: WebGLUniformLocation;
  directionalColor: WebGLUniformLocation;
}

interface Attribs {
  vertexPosition: number;
  vertexNormal: number;
  textureCoord: number;
}

const uniforms = {} as Uniforms;
const attribs = {} as Attribs;

const attrib = (
  gl: WebGLRenderingContext,
  shader: WebGLProgram,
  attribName: string
) => {
  const attribLocation = gl.getAttribLocation(shader, attribName);
  gl.enableVertexAttribArray(attribLocation);
  return attribLocation;
};

const uniform = (
  gl: WebGLRenderingContext,
  shader: WebGLProgram,
  name: string
) => {
  const uniform = gl.getUniformLocation(shader, name);
  if (!uniform) {
    throw new Error(`Could not get ${name} uniform location`);
  }
  return uniform;
};

const compileShader = (gl: WebGLRenderingContext, id: string) => {
  const shaderScript = document.getElementById(id) as HTMLScriptElement;
  if (!shaderScript) {
    return null;
  }

  let str = "";
  let k = shaderScript.firstChild;
  while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
  }

  let shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(shader);
  }

  return shader;
};
