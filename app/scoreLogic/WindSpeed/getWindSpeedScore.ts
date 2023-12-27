import { getOptimalWindSpeed } from "./getOptimalWindSpeed";

export const getWindSpeedScore = (kmph: number, direction: number) => {
  const optimalWindSpeed = getOptimalWindSpeed(direction);
  console.log("kmph", kmph);
  if (kmph <= optimalWindSpeed) {
    return 1;
    // base 12
  } else if (kmph <= optimalWindSpeed + 4) {
    return 0.98;
  } else if (kmph <= optimalWindSpeed + 8) {
    return 0.97;
  } else if (kmph <= optimalWindSpeed + 12) {
    return 0.95;
  } else if (kmph <= optimalWindSpeed + 20) {
    return 0.92;
  } else if (kmph <= optimalWindSpeed + 28) {
    return 0.86;
  } else if (kmph <= optimalWindSpeed + 33) {
    return 0.82;
  } else if (kmph <= optimalWindSpeed + 38) {
    return 0.78;
  } else if (kmph <= optimalWindSpeed + 43) {
    return 0.72;
  } else if (kmph <= optimalWindSpeed + 48) {
    return 0.65;
  } else {
    return 0.5;
  }
};
