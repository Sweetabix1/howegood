export function manipulatePeriod(number: number) {
  if (number <= 6.5) {
    return +number.toFixed(1);
  } else {
    return +(number + (number - 6.7)).toFixed(1);
  }
}
