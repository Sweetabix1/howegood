import { getOptimalWavePeriod } from "./getOptimalWavePeriod";

export const getWavePeriodScore = (height: number, manipulatedPeriod: number, direction: number) => {
  const [lowerEnd, higherEnd] = getOptimalWavePeriod(height, direction);

  if (manipulatedPeriod >= lowerEnd && manipulatedPeriod <= higherEnd) {
    return 1;
  } else if (manipulatedPeriod >= lowerEnd - 0.5 || manipulatedPeriod <= higherEnd + 0.5) {
    return 0.99;
  } else if (manipulatedPeriod >= lowerEnd - 1 || manipulatedPeriod <= higherEnd + 1) {
    return 0.98;
  } else if (manipulatedPeriod >= lowerEnd - 1.5 || manipulatedPeriod <= higherEnd + 1.5) {
    return 0.97;
  } else if (manipulatedPeriod >= lowerEnd - 2 || manipulatedPeriod <= higherEnd + 2) {
    return 0.96;
  } else if (manipulatedPeriod >= lowerEnd - 2.5 || manipulatedPeriod <= higherEnd + 2.5) {
    return 0.94;
  } else if (manipulatedPeriod >= lowerEnd - 3 || manipulatedPeriod <= higherEnd + 3) {
    return 0.92;
  } else if (manipulatedPeriod >= lowerEnd - 3.5 || manipulatedPeriod <= higherEnd + 3.5) {
    return 0.89;
  } else if (manipulatedPeriod >= lowerEnd - 4 || manipulatedPeriod >= higherEnd + 4) {
    return 0.85;
  } else if (manipulatedPeriod >= lowerEnd - 4.5) {
    return 0.82;
  } else if (manipulatedPeriod >= lowerEnd - 5) {
    return 0.8;
  } else if (manipulatedPeriod >= lowerEnd - 5.5) {
    return 0.75;
  } else if (manipulatedPeriod >= lowerEnd - 6) {
    return 0.7;
  } else if (manipulatedPeriod >= lowerEnd - 6.5) {
    return 0.65;
  } else {
    return 0.6;
  }
};
