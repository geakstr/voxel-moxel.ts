import { vec4 } from "gl-matrix";
import { UNIVERSE_SIZE } from "./constants";
import { Planet } from "./types";
import { createPlanet, renderPlanet } from "./planet";

export interface Universe {
  readonly planets: Planet[];
}

export const createUniverse = (gl: WebGL2RenderingContext): Universe => {
  const planets: Planet[] = [];
  for (let x = 0; x < UNIVERSE_SIZE; x++) {
    for (let y = 0; y < UNIVERSE_SIZE; y++) {
      for (let z = 0; z < UNIVERSE_SIZE; z++) {
        planets.push(createPlanet(gl, x * 300, y * 300, z * 300));
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
    if (planet.ready) {
      renderPlanet(gl, frustumPlanes, planet);
    }
  }
};
