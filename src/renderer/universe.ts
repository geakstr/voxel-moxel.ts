import { vec3, vec4 } from "gl-matrix";
import { Universe, Planet } from "../types";
import {
  getPlanetByPosition,
  getPlanetCoord,
  getPlanetCoordKey,
  addPlanet
} from "../creators/universe";
import { createPlanet } from "../creators/planet";
import { renderPlanet } from "./planet";

export const renderUniverse = (
  gl: WebGL2RenderingContext,
  position: vec3,
  frustumPlanes: vec4[],
  universe: Universe
) => {
  if (typeof getPlanetByPosition(universe, position) === "undefined") {
    const { x, y, z } = getPlanetCoord(position);
    const coord = getPlanetCoordKey(position);
    const newPlanet: Planet = {
      x,
      y,
      z,
      coord,
      chunks: []
    };
    addPlanet(universe, newPlanet);
    createPlanet(gl, newPlanet);
  }
  universe.planets.forEach(planet => renderPlanet(gl, frustumPlanes, planet));
};
