export const getOptimalWavePeriod = (waveHeight: number, waveDirection: number) => {
  if (waveHeight <= 8 || waveDirection > 240 || waveDirection < 130) {
    return [13, 17];
  }
  if (waveHeight <= 9 || waveDirection > 230 || waveDirection < 140) {
    return [12, 16];
  }
  if (waveHeight <= 10 || waveDirection > 220 || waveDirection < 150) {
    return [11, 15];
  }
  return [10, 14];
};

// waveheight 9 and 230
