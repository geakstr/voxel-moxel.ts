/**
 * Based on https://gist.github.com/blixt/f17b47c62508be59987b
 *
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */
export class PRand {
  constructor(private seed: number) {}

  public next() {
    return (this.seed = (this.seed * 16807) % 2147483647);
  }

  public nextInRange(min: number, max: number) {
    return Math.floor(this.nextFloat() * (max - min + 1)) + min;
  }

  public nextFloat() {
    return (this.next() - 1) / 2147483646;
  }
}

export const prand = new PRand(100500);
