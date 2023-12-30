import { getOptimalWindSpeed } from "./getOptimalWindSpeed";

export const getWindSpeedScore = (kmph: number, direction: number) => {
  const optimalWindSpeed = getOptimalWindSpeed(direction);

  if (kmph <= optimalWindSpeed) {
    return 1;
  } else if (kmph <= optimalWindSpeed + 2) {
    return 0.99;
  } else if (kmph <= optimalWindSpeed + 4) {
    return 0.98;
  } else if (kmph <= optimalWindSpeed + 6) {
    return 0.975;
  } else if (kmph <= optimalWindSpeed + 8) {
    return 0.97;
  } else if (kmph <= optimalWindSpeed + 10) {
    return 0.96;
  } else if (kmph <= optimalWindSpeed + 12) {
    return 0.95;
  } else if (kmph <= optimalWindSpeed + 16) {
    return 0.935;
  } else if (kmph <= optimalWindSpeed + 20) {
    return 0.92;
  } else if (kmph <= optimalWindSpeed + 24) {
    return 0.89;
  } else if (kmph <= optimalWindSpeed + 28) {
    return 0.86;
  } else if (kmph <= optimalWindSpeed + 30.5) {
    return 0.83;
  } else if (kmph <= optimalWindSpeed + 33) {
    return 0.8;
  } else if (kmph <= optimalWindSpeed + 35.5) {
    return 0.76;
  } else if (kmph <= optimalWindSpeed + 38) {
    return 0.72;
  } else if (kmph <= optimalWindSpeed + 40.5) {
    return 0.68;
  } else if (kmph <= optimalWindSpeed + 43) {
    return 0.64;
  } else if (kmph <= optimalWindSpeed + 45.5) {
    return 0.58;
  } else if (kmph <= optimalWindSpeed + 48) {
    return 0.52;
  } else {
    return 0.4;
  }
};
