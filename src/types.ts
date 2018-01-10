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
