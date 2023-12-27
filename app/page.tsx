"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "@/node_modules/next/link";
import { useEffect, useState } from "react";
import { getWaveScore } from "./Logic/getWaveScore";
import { manipulatePeriod } from "./Logic/WavePeriod/manipulatePeriod";

export default function Home() {
  const [testData, setTestData] = useState<any>();
  async function fetchMarineWeather() {
    const apiUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=51.51&longitude=-8.646815&hourly=wave_direction,wave_height,wave_period`;

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
    fetchMarineWeather().then((data) => {
      // console.log(data);
    });
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
      console.log(data);
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
    // how I want this to work:
    // FIGURE OUT THE IDEAL SCORE:

    // need different scores for different beaches ideally..
    // maybe start with Howe strand..

    // height: 8ft + > gets full grade (with caveat for huge swells)
    // direction: 170-220* > gets full grade
    // period: 10s + > gets full grade (with caveat for huge periods)
    // wind direction: 350-60* > gets full grade
    // wind strength:  < 15kmph gets full grade (if the direction is good, then strength should have less weighting?)

    // EXTREMES:  there should be some extremes that should heavily impact the score, eg:
    // high wind strength + southerly wind direction
    // very high wind strengths
    // the complete wrong swell direction..
    // a very short period
    // a very small swell

    // how to do this:

    // give everything a score from 0-1, and then multiply them all together, make logarithmic?
    // ie.
    // height: 0.1
    // direction: 1
    // period: 1
    // wind direction: 1
    // wind strength:  1

    // tide: should this be in weighting or not? maybe its purely a swell rating, or a toggle for tide or something..

    // could allow user to tweak what they want to weight.. ie. i'm a learner/intermediate/advanced etc..

    if (testData && testWindData) {
      const { wave_height: height, wave_period: period, wave_direction: direction } = testData.hourly;
      const { wind_direction_10m: windDirection, wind_speed_10m: windSpeed } = testWindData.hourly;

      return getWaveScore(height[1], direction[1], manipulatePeriod(period[1]), windDirection[1], windSpeed[1]);
    }
  };

  console.log("7 >", manipulatePeriod(7));
  console.log("8 >", manipulatePeriod(8));
  console.log("9 >", manipulatePeriod(9));
  console.log("10 >", manipulatePeriod(10));

  return (
    <main className="flex min-h-screen flex-col items-start gap-12 p-24 bg-stone-950">
      <Link className="text-blue-300" href="/validation">
        To validation
      </Link>

      {testData ? (
        <div className="flex flex-col gap-3">
          <p className="font-light text-stone-400 text-xs">Coordinates: 51.63, -8.58</p>
          <h1 className="text-2xl font-bold text-stone-100">Current forecast:</h1>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Swell direction:</p>
            <p className="text-stone-100">{testData?.hourly?.wave_direction[1]} °</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Swell size:</p>
            <p className="text-stone-100">{testData?.hourly?.wave_height[1]} m</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Swell period:</p>
            <p className="text-stone-100">{manipulatePeriod(testData?.hourly?.wave_period[1])} s</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Wind direction:</p>
            <p className="text-stone-100">{testWindData?.hourly?.wind_direction_10m[1]} °</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Wind speed:</p>
            <p className="text-stone-100">{testWindData?.hourly?.wind_speed_10m[1]} kmph</p>
          </div>
          <div className="flex gap-2">
            <p className="font-light text-stone-300">Score:</p>
            <p className="text-stone-100">{getSimpleScore()}%</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-xl font-bold">Hourly forecast:</h2>
        {testData && testWindData && (
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
                const { wave_height, wave_period, wave_direction } = testData?.hourly;
                const { wind_direction_10m, wind_speed_10m } = testWindData?.hourly;

                const specificHr = i + hrs;
                return (
                  <TableRow key={i}>
                    <TableCell className="text-stone-400">{displayTime}</TableCell>
                    <TableCell className="text-stone-100">{(wave_height[specificHr] * 3.2808).toFixed(1)} ft</TableCell>
                    <TableCell className="text-stone-100">{manipulatePeriod(wave_period[specificHr])} s</TableCell>
                    <TableCell className="text-stone-100">{wave_direction[specificHr]} °</TableCell>
                    <TableCell className="text-stone-100">{wind_direction_10m[specificHr]} °</TableCell>
                    <TableCell className="text-stone-100">{wind_speed_10m[specificHr]} kmph</TableCell>
                    <TableCell className="text-stone-100">
                      {getWaveScore(
                        wave_height[specificHr],
                        wave_direction[specificHr],
                        wave_period[specificHr],
                        wind_direction_10m[specificHr],
                        wind_speed_10m[specificHr]
                      )}
                      %
                    </TableCell>
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
