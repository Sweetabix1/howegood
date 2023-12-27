// /// if (s > 310 || s < 60) {
//     return 1;
//   } else if (s > 280 || s <= 80) {
//     return 0.98;
//   } else if (s > 260 || s <= 100) {
//     return 0.96;
//   } else if (s > 245 || s <= 120) {
//     return 0.94;
//   } else if (s > 235 || s <= 150) {
//     return 0.92;
//   } else {
//     return 0.9;
//   }
// };

export const getOptimalWindSpeed = (windDirection: number) => {
  if (
    windDirection > 280 ||
    windDirection <= 80 // offshore
  ) {
    return 24;
  }
  if (
    windDirection > 265 ||
    windDirection <= 100 // crossshore
  ) {
    return 20;
  }
  if (
    windDirection > 250 ||
    windDirection <= 120 // cross-on
  ) {
    return 16;
  }
  if (
    windDirection > 240 ||
    windDirection <= 150 // onshore
  ) {
    return 12;
  } else return 10;
};
