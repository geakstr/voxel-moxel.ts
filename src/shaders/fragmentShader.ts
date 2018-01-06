import { SHADER_UNIFORM, SHADER_IN_OUT } from "./types";

// prettier-ignore
export const FRAGMENT_SHADER = `
#version 300 es

precision mediump float;

in vec3 ${SHADER_IN_OUT.POSITION};
in vec2 ${SHADER_IN_OUT.TEX_COORD};
in vec2 ${SHADER_IN_OUT.TEX_OFFSET};

uniform sampler2D ${SHADER_UNIFORM.SAMPLER};

out vec4 FragColor;

void main(void) {  
  FragColor = texture(${SHADER_UNIFORM.SAMPLER}, vec2(${SHADER_IN_OUT.TEX_COORD}.s, ${SHADER_IN_OUT.TEX_COORD}.t));
}
`.trim();
