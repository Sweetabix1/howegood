export const getWindSpeedScore = (kmph: number) => {
  console.log("kmph", kmph);
  if (kmph <= 12) {
    return 1;
  } else if (kmph <= 14) {
    return 0.98;
  } else if (kmph <= 18) {
    return 0.97;
  } else if (kmph <= 24) {
    return 0.95;
  } else if (kmph <= 32) {
    return 0.92;
  } else if (kmph <= 40) {
    return 0.86;
  } else if (kmph <= 45) {
    return 0.82;
  } else if (kmph <= 50) {
    return 0.78;
  } else if (kmph <= 55) {
    return 0.72;
  } else if (kmph <= 60) {
    return 0.65;
  } else {
    return 0.5;
  }
};
