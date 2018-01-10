import { vec4 } from "gl-matrix";
import { Universe } from "../types";
import { renderPlanet } from "./planet";

export const renderUniverse = (
  gl: WebGL2RenderingContext,
  frustumPlanes: vec4[],
  universe: Universe
) => {
  const count = universe.planets.length;
  for (let i = 0; i < count; i += 1) {
    const planet = universe.planets[i];
    if (planet.ready) {
      renderPlanet(gl, frustumPlanes, planet);
    }
  }
};
