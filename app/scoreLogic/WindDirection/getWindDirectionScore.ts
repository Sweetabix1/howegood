export const getWindDirectionScore = (s: number) => {
  if (s > 310 || s < 60) {
    return 1;
  } else if (s > 295 || s < 70) {
    return 0.99;
  } else if (s > 280 || s < 80) {
    return 0.98;
  } else if (s > 270 || s < 90) {
    return 0.97;
  } else if (s > 260 || s < 100) {
    return 0.96;
  } else if (s > 252.5 || s < 110) {
    return 0.95;
  } else if (s > 245 || s < 120) {
    return 0.94;
  } else if (s > 240 || s < 135) {
    return 0.93;
  } else if (s > 235 || s < 150) {
    return 0.92;
  } else if (s > 230 || s < 160) {
    return 0.91;
  } else {
    return 0.9;
  }
};
