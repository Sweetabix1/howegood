import { getOptimalWaveDirection } from "./getOptimalWaveDirection";

export const getWaveDirectionScore = (waveDirection: number, period: number) => {
  const [lower, higher] = getOptimalWaveDirection(period);

  if (waveDirection < higher && waveDirection >= lower) {
    return 1;
  } else if (
    (waveDirection >= higher && waveDirection <= higher + 5) ||
    (waveDirection <= lower && waveDirection >= lower - 5)
  ) {
    return 0.99;
  } else if (
    (waveDirection >= higher + 5 && waveDirection <= higher + 10) ||
    (waveDirection <= lower - 5 && waveDirection >= lower - 10)
  ) {
    return 0.98;
  } else if (
    (waveDirection >= higher + 10 && waveDirection <= higher + 15) ||
    (waveDirection <= lower - 10 && waveDirection >= lower - 15)
  ) {
    return 0.97;
  } else if (
    (waveDirection >= higher + 15 && waveDirection <= higher + 20) ||
    (waveDirection <= lower - 15 && waveDirection >= lower - 20)
  ) {
    return 0.96;
  } else if (
    (waveDirection >= higher + 20 && waveDirection <= higher + 25) ||
    (waveDirection <= lower - 20 && waveDirection >= lower - 25)
  ) {
    return 0.95;
  } else if (
    (waveDirection >= higher + 25 && waveDirection <= higher + 30) ||
    (waveDirection <= lower - 25 && waveDirection >= lower - 30)
  ) {
    return 0.93;
  } else if (
    (waveDirection >= higher + 30 && waveDirection <= higher + 35) ||
    (waveDirection <= lower - 30 && waveDirection >= lower - 35)
  ) {
    return 0.9;
  } else if (
    (waveDirection >= higher + 35 && waveDirection <= higher + 40) ||
    (waveDirection <= lower - 35 && waveDirection >= lower - 40)
  ) {
    return 0.85;
  } else if (
    (waveDirection >= higher + 40 && waveDirection <= higher + 45) ||
    (waveDirection <= lower - 40 && waveDirection >= lower - 45)
  ) {
    return 0.8;
  } else if (
    (waveDirection >= higher + 45 && waveDirection <= higher + 50) ||
    (waveDirection <= lower - 45 && waveDirection >= lower - 50)
  ) {
    return 0.6;
  } else {
    return 0.4;
  }
};
