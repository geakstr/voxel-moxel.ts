import { vec3 } from "gl-matrix";
import { CHUNK_SIZE, PLANET_SIZE } from "../constants";
import { Planet, Universe } from "../types";

export const createUniverse = (): Universe => ({
  planets: [],
  planetsCoords: {},
});

export const getPlanetCoord = (position: vec3) => {
  const x = Math.round(position[0] / (PLANET_SIZE * CHUNK_SIZE));
  const y = Math.round(position[1] / (PLANET_SIZE * CHUNK_SIZE));
  const z = Math.round(position[2] / (PLANET_SIZE * CHUNK_SIZE));
  return { x, y, z };
};

export const getPlanetCoordKey = (position: vec3) => {
  const { x, y, z } = getPlanetCoord(position);
  return `${x}:${y}:${z}`;
};

export const getPlanetByPosition = (universe: Universe, position: vec3) =>
  universe.planets[universe.planetsCoords[getPlanetCoordKey(position)]];

export const addPlanet = (universe: Universe, planet: Planet) => {
  universe.planets.push(planet);
  universe.planetsCoords[planet.coord] = universe.planets.length - 1;
};
