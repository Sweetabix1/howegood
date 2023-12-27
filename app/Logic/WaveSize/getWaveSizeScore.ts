import { getOptimalWaveSize } from "./getOptimalWaveSize";

export const getWaveSizeScore = (waveSize: number, wavePeriod: number, waveDirection: number) => {
  const waveSizeft = waveSize * 3.2808;
  const [lower, higher] = getOptimalWaveSize(wavePeriod, waveDirection, waveSize);

  const withinWaveLowerLimit = (limit: number = 0) => {
    return waveSizeft < lower && waveSizeft >= lower - limit;
  };
  const withinWaveHigherLimit = (limit: number = 0) => {
    return waveSizeft > higher && waveSizeft <= higher + limit;
  };

  if (waveSizeft >= lower && waveSizeft <= higher) {
    return 1;
  } else if (withinWaveLowerLimit(1) || withinWaveHigherLimit(1)) {
    return 0.98;
  } else if (withinWaveLowerLimit(2) || withinWaveHigherLimit(2)) {
    return 0.96;
  } else if (withinWaveLowerLimit(3) || withinWaveHigherLimit(3)) {
    return 0.94;
  } else if (withinWaveLowerLimit(4) || withinWaveHigherLimit(4)) {
    return 0.9;
  } else if (withinWaveLowerLimit(5) || withinWaveHigherLimit(5)) {
    return 0.8;
  } else if (withinWaveLowerLimit(6) || withinWaveHigherLimit(6)) {
    return 0.6;
  } else if (withinWaveLowerLimit(7) || withinWaveHigherLimit(7)) {
    return 0.5;
  } else {
    return 0.3;
  }
};
