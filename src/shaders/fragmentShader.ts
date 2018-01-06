import { SHADER_UNIFORM, SHADER_IN_OUT } from "./types";

// prettier-ignore
export const FRAGMENT_SHADER = `
#version 300 es

precision highp float;

in vec3 ${SHADER_IN_OUT.POSITION};
in vec2 ${SHADER_IN_OUT.TEX_COORD};
in vec2 ${SHADER_IN_OUT.TEX_OFFSET};
in vec2 ${SHADER_IN_OUT.TEX_INFO};

uniform sampler2D ${SHADER_UNIFORM.SAMPLER};

out vec4 FragColor;

void main(void) {  
  vec2 tex_coord = ${SHADER_IN_OUT.TEX_COORD}.xy;
  vec4 tex_color, color;

  float pixel_size = 1.0 / ${SHADER_IN_OUT.TEX_INFO}.x;
  float crop_size = pixel_size * ${SHADER_IN_OUT.TEX_INFO}.y;

  tex_coord.x = fract(tex_coord.x) * crop_size + ${SHADER_IN_OUT.TEX_OFFSET}.x;
  tex_coord.y = fract(tex_coord.y) * crop_size + ${SHADER_IN_OUT.TEX_OFFSET}.y;
  
  tex_color = texture(${SHADER_UNIFORM.SAMPLER}, tex_coord);
  FragColor = tex_color;
}
`.trim();
