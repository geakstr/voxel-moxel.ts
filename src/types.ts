export interface Universe {
  readonly planets: Planet[];
}

export interface ChunkBase {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly data: Float32Array;
  readonly blocks: number[][][];
  readonly indicesCount: number;
}

export interface Chunk {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly indicesCount: number;
  readonly blocks: number[][][];
  readonly vao: WebGLVertexArrayObject;
}

export interface Planet {
  readonly id: number;
  readonly chunks: Chunk[];
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
