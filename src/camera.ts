import { mat4, vec3, quat } from "gl-matrix";
import { KEYS } from "./keyboard";
import { applyQuaternion, multiplyScalar } from "./utils/math";

const currentlyPressedKeys: { [key: string]: boolean } = {};

const lookAt: vec3 = vec3.fromValues(0, 0, 2);
const position: vec3 = vec3.fromValues(0, 0, 0);
const direction: vec3 = vec3.fromValues(0, 0, 1);
const up: vec3 = vec3.fromValues(0, 1, 0);
const positionDelta: vec3 = vec3.fromValues(0, 0, 0);

const projection: mat4 = mat4.create();
const view: mat4 = mat4.create();
const model: mat4 = mat4.create();

const mvp: mat4 = mat4.create();

let fov: number = 45;
let scale: number = 0.01;
let yaw: number = 0;
let pitch: number = 0;
let maxPitchRate: number = 5;
let maxHeadRate: number = 5;
let isPaused: boolean = true;

export const update = (aspect: number) => {
  if (false === isPaused) {
    move();
  }

  mat4.perspective(projection, fov, aspect, 0.1, 100.0);

  vec3.normalize(direction, vec3.sub(direction, lookAt, position));

  const axis = vec3.fromValues(0, 0, 0);
  vec3.cross(axis, direction, up);

  const pitchQuat = quat.fromValues(0, 0, 0, 1);
  quat.setAxisAngle(pitchQuat, axis, pitch * Math.PI / 180.0);

  const headingQuat = quat.fromValues(0, 0, 0, 1);
  quat.setAxisAngle(headingQuat, up, yaw * Math.PI / 180.0);

  const temp = quat.fromValues(0, 0, 0, 1);
  quat.multiply(temp, pitchQuat, headingQuat);
  applyQuaternion(direction, direction, temp);
  vec3.add(position, position, positionDelta);
  vec3.add(lookAt, position, multiplyScalar(vec3.create(), direction, 1.0));

  pitch *= 0.5;
  yaw *= 0.5;

  multiplyScalar(positionDelta, positionDelta, 0.8);

  mat4.lookAt(view, position, lookAt, up);
  mat4.multiply(mvp, projection, mat4.multiply(mvp, view, model));

  return mvp;
};

export const pause = () => (isPaused = true);
export const resume = () => (isPaused = false);

const onMouseMove = (event: MouseEvent) => {
  if (false === isPaused) {
    changeYaw(-event.movementX * 0.1);
    changePitch(-event.movementY * 0.1);
  }
};

const changePitch = (degrees: number) => {
  if (degrees < -maxPitchRate) {
    degrees = -maxPitchRate;
  } else if (degrees > maxPitchRate) {
    degrees = maxPitchRate;
  }
  pitch += degrees;

  // Check bounds for the camera pitch
  if (pitch > 360.0) {
    pitch -= 360.0;
  } else if (pitch < -360.0) {
    pitch += 360.0;
  }
};

const changeYaw = (degrees: number) => {
  // Check bounds with the max heading rate so that we aren't moving too fast
  if (degrees < -maxHeadRate) {
    degrees = -maxHeadRate;
  } else if (degrees > maxHeadRate) {
    degrees = maxHeadRate;
  }
  // This controls how the heading is changed if the camera is pointed straight up or down
  // The heading delta direction changes
  if ((pitch > 90 && pitch < 270) || (pitch < -90 && pitch > -270)) {
    yaw -= degrees;
  } else {
    yaw += degrees;
  }
  // Check bounds for the camera heading
  if (yaw > 360.0) {
    yaw -= 360.0;
  } else if (yaw < -360.0) {
    yaw += 360.0;
  }
};

const move = () => {
  const temp = vec3.fromValues(0, 0, 0);
  if (currentlyPressedKeys[KEYS.SPACE]) {
    vec3.copy(temp, up);
    multiplyScalar(temp, temp, scale);
    vec3.add(positionDelta, positionDelta, temp);
  }
  if (currentlyPressedKeys[KEYS.L_SHIFT]) {
    vec3.copy(temp, up);
    multiplyScalar(temp, temp, scale);
    vec3.sub(positionDelta, positionDelta, temp);
  }
  if (currentlyPressedKeys[KEYS.A]) {
    vec3.cross(temp, direction, up);
    multiplyScalar(temp, temp, scale);
    vec3.sub(positionDelta, positionDelta, temp);
  }
  if (currentlyPressedKeys[KEYS.D]) {
    vec3.cross(temp, direction, up);
    multiplyScalar(temp, temp, scale);
    vec3.add(positionDelta, positionDelta, temp);
  }
  if (currentlyPressedKeys[KEYS.W]) {
    vec3.copy(temp, direction);
    multiplyScalar(temp, temp, scale);
    vec3.add(positionDelta, positionDelta, temp);
  }
  if (currentlyPressedKeys[KEYS.S]) {
    vec3.copy(temp, direction);
    multiplyScalar(temp, temp, scale);
    vec3.sub(positionDelta, positionDelta, temp);
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (false === isPaused) {
    currentlyPressedKeys[event.keyCode] = true;
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (false === isPaused) {
    currentlyPressedKeys[event.keyCode] = false;
  }
};

document.addEventListener("mousemove", onMouseMove, false);
document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);
