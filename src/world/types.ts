import { vec3 } from "gl-matrix";

export interface Chunk {
  position: vec3;
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
