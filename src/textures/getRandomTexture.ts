import { ATLAS } from "./constants";

export const getRandomTexture = () => {
  const keys = Object.keys(ATLAS);
  const max = keys.length - 1;
  return keys[rnd(0, max)] as ATLAS;
};

const rnd = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from + 1)) + from;
