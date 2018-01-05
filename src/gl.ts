export const init = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  try {
    const gl = canvas.getContext("webgl");
    if (!gl) {
      throw new Error("Unable to initialize WebGL");
    }
    gl.clearColor(0.8, 0.8, 0.8, 1.0);
    gl.enable(gl.DEPTH_TEST);
    return gl;
  } catch (error) {
    throw error;
  }
};
