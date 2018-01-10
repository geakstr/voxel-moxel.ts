import { SHADER_UNIFORM, SHADER_IN_OUT } from "./types";

// prettier-ignore
export const FRAGMENT_SHADER = `
#version 300 es

precision highp float;

in vec2 ${SHADER_IN_OUT.TEX_COORD};

uniform sampler2D ${SHADER_UNIFORM.SAMPLER};

out vec4 FragColor;

void main(void) {
  FragColor = texture(${SHADER_UNIFORM.SAMPLER}, ${SHADER_IN_OUT.TEX_COORD});
}
`.trim();
