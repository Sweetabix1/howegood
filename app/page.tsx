"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetchWeather } from "./hooks/useFetchWeather";
import ForecastTable from "./internal-components/ForecastTable";
import { getWaveScore as calculateWaveScore } from "./scoreLogic/getWaveScore";
import { manipulatePeriod } from "./scoreLogic/WavePeriod/manipulatePeriod";

export default function Home() {
  const waveURL = `https://marine-api.open-meteo.com/v1/marine?latitude=51.51&longitude=-8.646815&hourly=wave_direction,wave_height,wave_period`;
  const waveData = useFetchWeather(waveURL);
  const windURL = `https://api.open-meteo.com/v1/forecast?latitude=51.562010&longitude=-8.646815&hourly=wind_speed_10m,wind_direction_10m`;
  const windData = useFetchWeather(windURL);

  const currentTime = new Date();
  currentTime.setMinutes(0, 0, 0);
  const hrs = currentTime.getHours();
  const getScore = (hour: number = hrs) => {
    console.log("hour in getscore", hour);
    if (waveData && windData) {
      const { wave_height: height, wave_period: period, wave_direction: direction } = waveData.hourly;
      const { wind_direction_10m: windDirection, wind_speed_10m: windSpeed } = windData.hourly;
      return calculateWaveScore(
        height[hour],
        direction[hour],
        manipulatePeriod(period[hour]),
        windDirection[hour],
        windSpeed[hour]
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start gap-12 p-8 sm:p-12 md:p-16 lg:p-24 bg-stone-950">
      {waveData && windData ? (
        <div className="flex flex-col gap-3">
          <p className="font-light text-stone-400 text-xs">Coordinates: 51.63, -8.58</p>
          <h1 className="text-2xl font-bold text-stone-100">Current forecast:</h1>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Swell direction:</p>
            <p className="text-stone-100">{waveData?.hourly?.wave_direction[1]} °</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Swell size:</p>
            <p className="text-stone-100">{waveData?.hourly?.wave_height[1]} m</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Swell period:</p>
            <p className="text-stone-100">{manipulatePeriod(waveData?.hourly?.wave_period[1])} s</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Wind direction:</p>
            <p className="text-stone-100">{windData?.hourly?.wind_direction_10m[1]} °</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Wind speed:</p>
            <p className="text-stone-100">{windData?.hourly?.wind_speed_10m[1]} kmph</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Score:</p>
            <p className="text-stone-100">{getScore()}%</p>
          </div>
        </div>
      ) : (
        <p className="text-stone-100">Loading...</p>
      )}
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-xl font-bold">Hourly forecast:</h2>
        {waveData && windData && <ForecastTable waveData={waveData} windData={windData} getScore={getScore} />}
      </div>
    </main>
  );
}
