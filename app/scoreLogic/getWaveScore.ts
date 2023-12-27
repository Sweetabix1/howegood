import { getWaveDirectionScore } from "./WaveDirection/getWaveDirectionScore";
import { getWavePeriodScore } from "./WavePeriod/getWavePeriodScore";
import { getWaveSizeScore } from "./WaveSize/getWaveSizeScore";
import { getWindDirectionScore } from "./WindDirection/getWindDirectionScore";
import { getWindSpeedScore } from "./WindSpeed/getWindSpeedScore";

export const getWaveScore = (
  waveSize: number,
  waveDirection: number,
  wavePeriod: number,
  windDirection: number,
  windSpeed: number
) => {
  let score;
  const waveSizeScore = getWaveSizeScore(waveSize, wavePeriod, waveDirection);
  const wavePeriodScore = getWavePeriodScore(waveSize, wavePeriod, waveDirection);
  const waveDirectionScore = getWaveDirectionScore(waveDirection, wavePeriod);
  const windDirectionScore = getWindDirectionScore(windDirection);
  const windSpeedScore = getWindSpeedScore(windSpeed, windDirection);

  score = waveSizeScore * wavePeriodScore * waveDirectionScore * windDirectionScore * windSpeedScore * 100;

  return Math.round(score);
};
