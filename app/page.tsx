"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useFetchWeather } from "./hooks/useFetchWeather";
import { getWaveScore as calculateWaveScore } from "./scoreLogic/getWaveScore";
import { manipulatePeriod } from "./scoreLogic/WavePeriod/manipulatePeriod";

export default function Home() {
  const waveURL = `https://marine-api.open-meteo.com/v1/marine?latitude=51.51&longitude=-8.646815&hourly=wave_direction,wave_height,wave_period`;
  const waveData = useFetchWeather(waveURL);
  const windURL = `https://api.open-meteo.com/v1/forecast?latitude=51.562010&longitude=-8.646815&hourly=wind_speed_10m,wind_direction_10m`;
  const windData = useFetchWeather(windURL);

  const getScore = () => {
    if (waveData && windData) {
      const { wave_height: height, wave_period: period, wave_direction: direction } = waveData.hourly;
      const { wind_direction_10m: windDirection, wind_speed_10m: windSpeed } = windData.hourly;
      return calculateWaveScore(height[1], direction[1], manipulatePeriod(period[1]), windDirection[1], windSpeed[1]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start gap-12 p-24 bg-stone-950">
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
        <p>Loading...</p>
      )}
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-xl font-bold">Hourly forecast:</h2>
        {waveData && windData && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-stone-400">Time</TableHead>
                <TableHead className="text-stone-400">Wave Height</TableHead>
                <TableHead className="text-stone-400">Wave Period</TableHead>
                <TableHead className="text-stone-400">Wave Direction</TableHead>
                <TableHead className="text-stone-400">Wind Direction</TableHead>
                <TableHead className="text-stone-400">Wind Speed</TableHead>
                <TableHead className="text-stone-400">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {new Array(20).fill("whatev").map((cur, i) => {
                const currentTime = new Date();
                // Set minutes and seconds to 0 to get the next full hour
                currentTime.setMinutes(0, 0, 0);
                const hrs = currentTime.getHours();
                // Add i hours to the current time
                currentTime.setHours(hrs + i);
                const formattedHour = currentTime.getHours() % 12 || 12; // Convert 24-hour time to 12-hour format
                const amPm = currentTime.getHours() >= 12 ? " pm" : " am";
                const displayTime = `${formattedHour}${amPm}`;
                const { wave_height, wave_period, wave_direction } = waveData?.hourly;
                const { wind_direction_10m, wind_speed_10m } = windData?.hourly;

                const specificHr = i + hrs;
                return (
                  <TableRow key={i}>
                    <TableCell className="text-stone-400">{displayTime}</TableCell>
                    <TableCell className="text-stone-100">{(wave_height[specificHr] * 3.2808).toFixed(1)} ft</TableCell>
                    <TableCell className="text-stone-100">{manipulatePeriod(wave_period[specificHr])} s</TableCell>
                    <TableCell className="text-stone-100">{wave_direction[specificHr]} °</TableCell>
                    <TableCell className="text-stone-100">{wind_direction_10m[specificHr]} °</TableCell>
                    <TableCell className="text-stone-100">{wind_speed_10m[specificHr]} kmph</TableCell>
                    <TableCell className="text-stone-100">{getScore()}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  );
}
