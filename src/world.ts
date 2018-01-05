import { WebGLBufferExtended } from "./extendedClasses";

import { worldData } from "./world-data";

export interface WorldBuffers {
  position: WebGLBufferExtended;
  texture: WebGLBufferExtended;
}

export const loadWorldBuffers = async (gl: WebGL2RenderingContext) => {
  return handleLoadedWorld(gl, worldData);
};

const handleLoadedWorld = (gl: WebGL2RenderingContext, data: string) => {
  let vertexCount = 0;
  const vertexPositions: number[] = [];
  const vertexTextureCoords: number[] = [];
  data.split("\n").forEach(line => {
    const vals = line.replace(/^\s+/, "").split(/\s+/);
    if (vals.length === 5 && vals[0] !== "//") {
      // It is a line describing a vertex; get X, Y and Z first
      vertexPositions.push(parseFloat(vals[0]));
      vertexPositions.push(parseFloat(vals[1]));
      vertexPositions.push(parseFloat(vals[2]));

      // And then the texture coords
      vertexTextureCoords.push(parseFloat(vals[3]));
      vertexTextureCoords.push(parseFloat(vals[4]));

      vertexCount += 1;
    }
  });

  const positionBuffer = gl.createBuffer() as WebGLBufferExtended;
  if (!positionBuffer) {
    throw new Error("Can't create world vertex position buffer");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexPositions),
    gl.STATIC_DRAW
  );
  positionBuffer.itemSize = 3;
  positionBuffer.numItems = vertexCount;

  const textureBuffer = gl.createBuffer() as WebGLBufferExtended;
  if (!textureBuffer) {
    throw new Error("Can't create world vertex texture coord buffer");
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertexTextureCoords),
    gl.STATIC_DRAW
  );
  textureBuffer.itemSize = 2;
  textureBuffer.numItems = vertexCount;

  return {
    position: positionBuffer,
    texture: textureBuffer
  };
};
