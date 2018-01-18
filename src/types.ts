import * as ndarray from "ndarray";

export interface Universe {
  readonly planets: Planet[];
  readonly planetsCoords: CoordToIndex;
}

export interface Chunk {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly coord: string;
  readonly indicesCount: number;
  readonly blocks: ndarray;
  readonly vao: WebGLVertexArrayObject | null;
  data: Float32Array | null;
}

export interface Planet {
  readonly chunks: Chunk[];
  readonly chunksCoords: CoordToIndex;
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly coord: string;
}

export type CoordToIndex = { [key: string]: number };
