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
  } else if (withinWaveLowerLimit(0.5) || withinWaveHigherLimit(0.5)) {
    return 0.99;
  } else if (withinWaveLowerLimit(1) || withinWaveHigherLimit(1)) {
    return 0.98;
  } else if (withinWaveLowerLimit(1.5) || withinWaveHigherLimit(1.5)) {
    return 0.97;
  } else if (withinWaveLowerLimit(2) || withinWaveHigherLimit(2)) {
    return 0.96;
  } else if (withinWaveLowerLimit(2.5) || withinWaveHigherLimit(2.5)) {
    return 0.95;
  } else if (withinWaveLowerLimit(3) || withinWaveHigherLimit(3)) {
    return 0.94;
  } else if (withinWaveLowerLimit(3.5) || withinWaveHigherLimit(3.5)) {
    return 0.92;
  } else if (withinWaveLowerLimit(4) || withinWaveHigherLimit(4)) {
    return 0.9;
  } else if (withinWaveLowerLimit(4.5) || withinWaveHigherLimit(4.5)) {
    return 0.85;
  } else if (withinWaveLowerLimit(5) || withinWaveHigherLimit(5)) {
    return 0.76;
  } else if (withinWaveLowerLimit(5.5) || withinWaveHigherLimit(5.5)) {
    return 0.68;
  } else if (withinWaveLowerLimit(6) || withinWaveHigherLimit(6)) {
    return 0.6;
  } else if (withinWaveLowerLimit(6.5) || withinWaveHigherLimit(6.5)) {
    return 0.53;
  } else if (withinWaveLowerLimit(7) || withinWaveHigherLimit(7)) {
    return 0.45;
  } else if (withinWaveLowerLimit(7.5) || withinWaveHigherLimit(7.5)) {
    return 0.38;
  } else {
    return 0.3;
  }
};
