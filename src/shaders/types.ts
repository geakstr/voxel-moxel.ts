export enum SHADER_ATTR {
  POSITION = "a_pos",
  TEX_COORD = "a_tex_coord",
  TEX_OFFSET = "a_tex_offset",
  COLOR = "a_color"
}

export enum SHADER_UNIFORM {
  MVP_MATRIX = "u_mvp_matrix",
  SAMPLER = "u_sampler"
}

export enum SHADER_IN_OUT {
  POSITION = "v_pos",
  TEX_COORD = "v_tex_coord",
  TEX_OFFSET = "v_tex_offset",
  COLOR = "v_color"
}
