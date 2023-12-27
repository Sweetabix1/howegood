import { getOptimalWavePeriod } from "../WavePeriod/getOptimalWavePeriod";

export const getOptimalWaveSize = (wavePeriod: number, waveDirection: number, waveSize: number) => {
  const [periodLower, periodHigher] = getOptimalWavePeriod(waveSize, waveDirection);
  const getWithinPeriodRange = (buffer = 0) => {
    return wavePeriod >= periodLower - buffer && wavePeriod >= periodHigher + buffer;
  };
  if (getWithinPeriodRange()) {
    return [11, 14];
  }
  if (wavePeriod < periodLower && wavePeriod >= periodLower - 2) {
    return [12, 15];
  }
  if (wavePeriod <= periodLower - 3) {
    return [13, 17];
  }
  if (wavePeriod >= periodHigher) {
    return [9, 12];
  } else {
    return [10.5, 13.5];
  }
};
