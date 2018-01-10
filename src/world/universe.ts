import { vec4 } from "gl-matrix";
import { UNIVERSE_SIZE } from "./constants";
import { Planet, createPlanet, renderPlanet } from "./planet";

export interface Universe {
  readonly planets: Planet[];
}

export const createUniverse = (gl: WebGL2RenderingContext): Universe => {
  const planets: Planet[] = [];
  for (let x = 0; x < UNIVERSE_SIZE; x++) {
    for (let y = 0; y < UNIVERSE_SIZE; y++) {
      for (let z = 0; z < UNIVERSE_SIZE; z++) {
        planets.push(createPlanet(gl, x * 1000, y * 1000, z * 1000));
      }
    }
  }
  return {
    planets
  };
};

export const renderUniverse = (
  gl: WebGL2RenderingContext,
  frustumPlanes: vec4[],
  universe: Universe
) => {
  const count = universe.planets.length;
  for (let i = 0; i < count; i += 1) {
    const planet = universe.planets[i];
    renderPlanet(gl, frustumPlanes, planet);
  }
};
