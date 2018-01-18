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
  if (!getPlanetByPosition(universe, position)) {
    addPlanet(universe, createPlanet(gl, position));
  }
  universe.planets.forEach(planet =>
    renderPlanet(gl, position, frustumPlanes, planet)
  );
};
