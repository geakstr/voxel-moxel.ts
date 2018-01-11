import { UNIVERSE_SIZE } from "../constants";
import { Planet, Universe } from "../types";
import { createPlanet } from "./planet";

export const createUniverse = (gl: WebGL2RenderingContext): Universe => {
  const planets: Planet[] = [];
  for (let x = 0, planetId = 0; x < UNIVERSE_SIZE; x++) {
    for (let y = 0; y < UNIVERSE_SIZE; y++) {
      for (let z = 0; z < UNIVERSE_SIZE; z++) {
        const planet: Planet = {
          id: planetId++,
          x: x * 300,
          y: y * 300,
          z: z * 300,
          chunks: []
        };
        planets.push(createPlanet(gl, planet));
      }
    }
  }

  const universe: Universe = {
    planets
  };

  return universe;
};
