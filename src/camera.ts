import { mat4, vec3, quat } from "gl-matrix";
import { KEYS } from "./keyboard";
import { applyQuaternion, multiplyScalar } from "./utils/math";

let fov: number = 45;
let scale: number = 0.1;
let yaw: number = 0;
let pitch: number = 0;
let maxPitchRate: number = 5;
let maxHeadRate: number = 5;
let isPaused: boolean = true;

const lookAt: vec3 = vec3.fromValues(0, 0, 2);
const position: vec3 = vec3.fromValues(5, 5, 2);
const direction: vec3 = vec3.fromValues(0, 0, 1);
const up: vec3 = vec3.fromValues(0, 1, 0);
const front: vec3 = vec3.fromValues(0, 0, 1);
const positionDelta: vec3 = vec3.fromValues(0, 0, 0);

const projection: mat4 = mat4.create();
const view: mat4 = mat4.create();
const model: mat4 = mat4.create();

const mvp: mat4 = mat4.create();

const pitchAxis: vec3 = vec3.create();
const tempMove: vec3 = vec3.create();
const pitchMulYawQuat: quat = quat.create();
const pitchQuat: quat = quat.create();
const yawQuat: quat = quat.create();
const zeroDot: vec3 = vec3.create();

const currentlyPressedKeys: { [key: string]: boolean } = {};

/**
 * Calculate `model × view × projection` matrix (mvp)
 * @param {number} aspect Aspect ratio
 * @returns {mat4} mvp
 */
export const update = (aspect: number): mat4 => {
  if (false === isPaused) {
    move();
  }

  mat4.perspective(projection, fov, aspect, 0.1, 1000.0);
  vec3.normalize(direction, vec3.sub(direction, lookAt, position));

  // rotate camera by quaternions
  applyQuaternion(
    direction,
    direction,
    // pitchQuat * yawQuat
    quat.multiply(
      pitchMulYawQuat,
      // pitchQuat
      quat.setAxisAngle(
        pitchQuat,
        // axis
        vec3.cross(pitchAxis, direction, up),
        pitch * Math.PI / 180.0
      ),
      // yawQuat
      quat.setAxisAngle(yawQuat, up, yaw * Math.PI / 180.0)
    )
  );

  vec3.add(position, position, positionDelta);
  vec3.add(lookAt, position, multiplyScalar(lookAt, direction, 1.0));

  pitch *= 0.5;
  yaw *= 0.5;

  multiplyScalar(positionDelta, positionDelta, 0.8);

  mat4.lookAt(view, position, lookAt, up);

  // calc projection * view * model matrix  (mvp)
  return mat4.multiply(mvp, projection, mat4.multiply(mvp, view, model));
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
  if (currentlyPressedKeys[KEYS.SPACE]) {
    vec3.copy(tempMove, up);
    multiplyScalar(tempMove, tempMove, scale);
    vec3.add(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYS.L_SHIFT]) {
    vec3.copy(tempMove, up);
    multiplyScalar(tempMove, tempMove, scale);
    vec3.sub(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYS.A]) {
    vec3.cross(tempMove, direction, up);
    multiplyScalar(tempMove, tempMove, scale * 2);
    vec3.sub(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYS.D]) {
    vec3.cross(tempMove, direction, up);
    multiplyScalar(tempMove, tempMove, scale * 2);
    vec3.add(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYS.W]) {
    vec3.rotateY(tempMove, zeroDot, direction, 180 * Math.PI / 180);
    multiplyScalar(tempMove, tempMove, scale);
    vec3.add(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYS.S]) {
    vec3.rotateY(tempMove, zeroDot, direction, 180 * Math.PI / 180);
    multiplyScalar(tempMove, tempMove, scale);
    vec3.sub(positionDelta, positionDelta, tempMove);
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
