import { vec3, quat } from "gl-matrix";

export const degToRad = (degrees: number) => degrees * Math.PI / 180;

export const applyQuaternion = (out: vec3, a: vec3, b: quat) => {
  const x = a[0];
  const y = a[1];
  const z = a[2];

  const qx = b[0];
  const qy = b[1];
  const qz = b[2];
  const qw = b[3];

  // calculate quat * vector
  const ix = qw * x + qy * z - qz * y;
  const iy = qw * y + qz * x - qx * z;
  const iz = qw * z + qx * y - qy * x;
  const iw = -qx * x - qy * y - qz * z;

  // calculate result * inverse quat
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

  return out;
};

export const multiplyScalar = (out: vec3, a: vec3, scalar: number) => {
  out[0] = a[0] * scalar;
  out[1] = a[1] * scalar;
  out[2] = a[2] * scalar;

  return out;
};
