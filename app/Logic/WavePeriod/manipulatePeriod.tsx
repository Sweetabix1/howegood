export function manipulatePeriod(number: number) {
  if (number <= 6) {
    return +number.toFixed(1);
  } else {
    return +(number + (number - 6)).toFixed(1);
  }
}
