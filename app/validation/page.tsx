"use client";

import { getWaveScore } from "@/app/scoreLogic/getWaveScore";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";
import { manipulatePeriod } from "../scoreLogic/WavePeriod/manipulatePeriod";
import { validation_set } from "../Validate/validation-set-1";

export default function Validaton() {
  const [testData, setTestData] = useState<any>();
  async function fetchMarineWeather() {
    const apiUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=51.562010&longitude=-8.646815&hourly=wave_direction,wave_height,wave_period`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTestData(data);
      return data;
    } catch (error) {
      // console.error("Error fetching marine weather data:", error);
    }
  }

  // Usage
  useEffect(() => {
    fetchMarineWeather().then((data) => {});
  }, []);

  const [testWindData, setTestWindData] = useState<any>();
  async function fetchWind() {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=51.562010&longitude=-8.646815&hourly=wind_speed_10m,wind_direction_10m`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTestWindData(data);
      return data;
    } catch (error) {
      // console.error("Error fetching marine weather data:", error);
    }
  }

  // Usage
  useEffect(() => {
    fetchWind().then((data) => {});
  }, []);

  const getSimpleScore = () => {
    if (testData && testWindData) {
      const { wave_height: height, wave_period: period, wave_direction: direction } = testData.hourly;
      const { wind_direction_10m: windDirection, wind_speed_10m: windSpeed } = testWindData.hourly;

      return getWaveScore(height[34], direction[34], period[34], windDirection[34], windSpeed[34]);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-start gap-8 p-24 bg-stone-950">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-stone-100">Validation Set:</h1>
      </div>

      {testData ? (
        <>
          <div className="flex flex-col gap-4">
            <Link href="/">{"< Back"}</Link>

            <h1 className="text-xl font-bold text-stone-100">Test validation:</h1>
            {validation_set.map((forecast: any, i: number) => {
              const {
                descripion,
                wave: { direction, height, period },
                wind: { direction: wind_direction, speed },
              } = forecast;
              return (
                <div key={i} className={"flex flex-col gap-1"}>
                  <div className="flex gap-2 text-stone-100">
                    <p>{descripion}</p>
                  </div>
                  <div className="flex gap-2 text-stone-100">
                    <p className="font-light text-stone-300">Swell direction:</p>
                    <p>{direction}°</p>
                  </div>
                  <div className="flex gap-2 text-stone-100">
                    <p className="font-light text-stone-300">Swell size:</p>
                    <p>{height}m</p>
                  </div>
                  <div className="flex gap-2 text-stone-100">
                    <p className="font-light text-stone-300">Swell period:</p>
                    <p>{manipulatePeriod(period)}s</p>
                  </div>
                  <div className="flex gap-2 text-stone-100">
                    <p className="font-light text-stone-300">Wind direction:</p>
                    <p>{wind_direction}°</p>
                  </div>
                  <div className="flex gap-2 text-stone-100">
                    <p className="font-light text-stone-300">Wind speed:</p>
                    <p>{speed}kmph?</p>
                  </div>
                  <div className="flex gap-2 text-stone-100">
                    <p className="font-light text-stone-300">Score:</p>
                    <p>{getWaveScore(height, direction, period, wind_direction, speed)}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
