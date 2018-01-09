import { SHADER_ATTR, SHADER_UNIFORM, SHADER_IN_OUT } from "./types";

// prettier-ignore
export const VERTEX_SHADER = `
#version 300 es

in vec3 ${SHADER_ATTR.POSITION};
in vec2 ${SHADER_ATTR.TEX_COORD};

uniform mat4 ${SHADER_UNIFORM.MVP_MATRIX};

out vec2 ${SHADER_IN_OUT.TEX_COORD};

void main(void) {  
  ${SHADER_IN_OUT.TEX_COORD} = ${SHADER_ATTR.TEX_COORD};

  gl_Position = ${SHADER_UNIFORM.MVP_MATRIX} * vec4(${SHADER_ATTR.POSITION}, 1.0);
}
`.trim();
