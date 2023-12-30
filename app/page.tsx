"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetchWeather } from "./hooks/useFetchWeather";
import { Arrow } from "./internal-components/Arrow";
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
    <main className="flex min-h-screen flex-col items-start bg-stone-950">
      {waveData && windData ? (
        <div className="flex flex-col gap-4 p-8 sm:p-12 md:p-16 lg:p-24 pb-8 sm:pb-8 md:pb-0 lg:pb-0">
          <div className="flex flex-col gap-2">
            <p className="text-stone-400 text-xs">Coordinates: 51.56, -8.64</p>
            <h1 className="text-2xl font-bold text-stone-100">Current forecast</h1>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-stone-400 text-xs">Wave:</p>
              <div className="flex gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <Arrow angle={waveData?.hourly?.wave_direction[hrs]} />
                  <p className="text-stone-100 font-bold">
                    {waveData?.hourly?.wave_direction[hrs]}
                    <span className="text-stone-400 font-regular">°</span>
                  </p>
                </div>
                <p className="text-stone-100 font-bold">
                  {(waveData?.hourly?.wave_height[hrs] * 3.2808).toFixed(1)}
                  <span className="text-stone-400 font-regular text-sm">ft</span>
                </p>
                <p className="text-stone-400">@</p>
                <p className="text-stone-100 font-bold">
                  {manipulatePeriod(waveData?.hourly?.wave_period[hrs])}
                  <span className="text-stone-400 font-regular text-sm">s</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-stone-400 text-xs">Wind:</p>
              <div className="flex gap-3 items-center">
                <div className="flex gap-2 items-center">
                  <Arrow angle={windData?.hourly?.wind_direction_10m[hrs]} />
                  <p className="text-stone-100">
                    {windData?.hourly?.wind_direction_10m[hrs]}
                    <span className="text-stone-400 font-regular">°</span>
                  </p>
                </div>
                <p className="text-stone-100 font-bold">
                  {windData?.hourly?.wind_speed_10m[hrs]}
                  <span className="text-stone-400 font-regular text-sm">kmph</span>
                </p>
                <p className="text-stone-100 font-bold"></p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-stone-400 text-xs">Score:</p>
            <p className="text-stone-100 font-bold text-5xl">
              {getScore()}
              <span className="text-stone-400 font-regular text-xl">%</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-stone-100 p-8">Loading...</p>
      )}
      {waveData && windData && (
        <div className="flex flex-col gap-4 w-full p-0 md:p-16 lg:p-24">
          <h2 className="text-lg font-bold text-stone-100 pl-8 sm:pl-12 md:pl-0">Hourly forecast:</h2>
          <ForecastTable waveData={waveData} windData={windData} getScore={getScore} />
        </div>
      )}
    </main>
  );
}
