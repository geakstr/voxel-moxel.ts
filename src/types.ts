import * as ndarray from "ndarray";

export interface Universe {
  readonly planets: Planet[];
  readonly planetsCoords: PlanetCoordToIndex;
}

export interface ChunkBase {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly data: Float32Array;
  readonly blocks: ndarray;
  readonly indicesCount: number;
}

export interface Chunk {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly indicesCount: number;
  readonly blocks: ndarray;
  readonly vao: WebGLVertexArrayObject;
}

export interface Planet {
  readonly chunks: Chunk[];
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly coord: string;
}

export type PlanetCoordToIndex = { [key: string]: number };
