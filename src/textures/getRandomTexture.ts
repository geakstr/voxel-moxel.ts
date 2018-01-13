import { ATLAS } from "../constants";
import { prand } from "../utils/rand";

export const getRandomTexture = () => {
  const keys = Object.keys(ATLAS);
  const max = keys.length - 1;
  return keys[prand.nextInRange(0, max)] as ATLAS;
};
