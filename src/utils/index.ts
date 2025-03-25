export function hexToNormalizedRGB(hex: string): {
  r: number;
  g: number;
  b: number;
} {
  // Remove # if present
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  // Parse the hex values to integers
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Normalize to 0-1 range
  return {
    r: r / 255,
    g: g / 255,
    b: b / 255,
  };
}
