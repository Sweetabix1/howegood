export const getOptimalWaveDirection = (period: number) => {
  if (period >= 16) return [170, 245];
  if (period >= 15) return [170, 240];
  if (period >= 14) return [170, 235];
  if (period >= 13) return [170, 230];
  if (period >= 12) return [170, 225];
  if (period >= 11) return [170, 220];
  return [170, 210];
};
