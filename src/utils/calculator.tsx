import { RGB } from '../interfaces/Game.interface';

export const calculateDelta = (rgb1: RGB, rgb2: RGB): number => {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;

  const deltaR = r1 - r2;
  const deltaG = g1 - g2;
  const deltaB = b1 - b2;

  const delta =
    (1 / 255) *
    (1 / Math.sqrt(3)) *
    Math.sqrt(Math.pow(deltaR, 2) + Math.pow(deltaG, 2) + Math.pow(deltaB, 2));

  // Returns the delta value as a percentage with two decimal places
  return Math.round(delta * 100 * 100) / 100;
};

export const calculateRelativeDistance = (
  dimensionSize: number,
  distance: number
): number => {
  return (dimensionSize + 1 - distance) / (dimensionSize + 1);
};

export const adjustRGBByDistance = (
  baseRGB: RGB,
  dimensionSize: number,
  distance: number
): RGB => {
  const relativeDistance = calculateRelativeDistance(dimensionSize, distance);
  const r = Math.round(baseRGB[0] * relativeDistance);
  const g = Math.round(baseRGB[1] * relativeDistance);
  const b = Math.round(baseRGB[2] * relativeDistance);

  return [r, g, b];
};

export const normalizeRGBs = (rgbArray: RGB[]): RGB => {
  let r = 0;
  let g = 0;
  let b = 0;

  for (const rgb of rgbArray) {
    r += rgb[0];
    g += rgb[1];
    b += rgb[2];
  }

  const f = 255 / Math.max(r, g, b, 255);
  const normalizedR = Math.round(r * f);
  const normalizedG = Math.round(g * f);
  const normalizedB = Math.round(b * f);

  return [normalizedR, normalizedG, normalizedB];
};
