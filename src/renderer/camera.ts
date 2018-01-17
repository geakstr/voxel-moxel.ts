import { mat4, vec3, quat, glMatrix } from "gl-matrix";
import { CHUNK_SIZE, PLANET_SIZE, KEYBOARD } from "../constants";

export const projection: mat4 = mat4.create();
export const view: mat4 = mat4.create();
export const model: mat4 = mat4.create();
export const mvp: mat4 = mat4.create();

export const lookAt: vec3 = vec3.fromValues(0, 0, 2);
export const position: vec3 = vec3.fromValues(
  CHUNK_SIZE * PLANET_SIZE / 2,
  CHUNK_SIZE * PLANET_SIZE + CHUNK_SIZE / 2,
  CHUNK_SIZE * PLANET_SIZE / 2
);
export const direction: vec3 = vec3.fromValues(0, 0, 1);
export const up: vec3 = vec3.fromValues(0, 1, 0);
export const front: vec3 = vec3.fromValues(0, 0, 1);
export const positionDelta: vec3 = vec3.fromValues(0, 0, 0);

let fov: number = 45;
let scale: number = 0.1;
let yaw: number = 0;
let pitch: number = 0;
let maxPitchRate: number = 5;
let maxHeadRate: number = 5;
let isPaused: boolean = true;

const pitchAxis: vec3 = vec3.create();
const tempMove: vec3 = vec3.create();
const pitchMulYawQuat: quat = quat.create();
const pitchQuat: quat = quat.create();
const yawQuat: quat = quat.create();
const zeroDot: vec3 = vec3.create();

let currentlyPressedKeys: { [key: string]: boolean } = {};

/**
 * Calculate `model × view × projection` matrix (mvp)
 * @param {number} aspect Aspect ratio
 * @returns {mat4} mvp
 */
export const update = (aspect: number): { mvp: mat4; position: vec3 } => {
  if (false === isPaused) {
    move();
  }

  mat4.perspective(projection, fov, aspect, 0.1, 1500.0);
  vec3.normalize(direction, vec3.sub(direction, lookAt, position));

  // rotate camera by quaternions
  vec3.transformQuat(
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
        glMatrix.toRadian(pitch)
      ),
      // yawQuat
      quat.setAxisAngle(yawQuat, up, glMatrix.toRadian(yaw))
    )
  );

  vec3.add(position, position, positionDelta);
  vec3.add(lookAt, position, vec3.scale(lookAt, direction, 1.0));

  pitch *= 0.5;
  yaw *= 0.5;

  vec3.scale(positionDelta, positionDelta, 0.8);

  mat4.lookAt(view, position, lookAt, up);

  // calc projection * view * model matrix  (mvp)
  mat4.multiply(mvp, projection, mat4.multiply(mvp, view, model));

  return {
    mvp,
    position
  };
};

export const pause = () => {
  isPaused = true;
  currentlyPressedKeys = {};
};
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
  if (currentlyPressedKeys[KEYBOARD.SPACE]) {
    vec3.copy(tempMove, up);
    vec3.scale(tempMove, tempMove, scale);
    vec3.add(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYBOARD.L_SHIFT]) {
    vec3.copy(tempMove, up);
    vec3.scale(tempMove, tempMove, scale);
    vec3.sub(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYBOARD.A]) {
    vec3.cross(tempMove, direction, up);
    vec3.scale(tempMove, tempMove, scale * 2);
    vec3.sub(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYBOARD.D]) {
    vec3.cross(tempMove, direction, up);
    vec3.scale(tempMove, tempMove, scale * 2);
    vec3.add(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYBOARD.W]) {
    vec3.rotateY(tempMove, zeroDot, direction, glMatrix.toRadian(180));
    vec3.scale(tempMove, tempMove, scale);
    vec3.add(positionDelta, positionDelta, tempMove);
  }
  if (currentlyPressedKeys[KEYBOARD.S]) {
    vec3.rotateY(tempMove, zeroDot, direction, glMatrix.toRadian(180));
    vec3.scale(tempMove, tempMove, scale);
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
