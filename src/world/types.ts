export interface Universe {
  readonly planets: Planet[];
}

export interface Chunk {
  x: number;
  y: number;
  z: number;
  indicesCount: number;
  data?: Float32Array;
  vao?: WebGLVertexArrayObject;
}

export interface Planet {
  chunks: Chunk[];
  blocks: number[][][];
  x: number;
  y: number;
  z: number;
  ready: boolean;
}

export enum SIDE {
  ALL = "ALL",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  FRONT = "FRONT",
  BACK = "BACK"
}
