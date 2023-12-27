import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { manipulatePeriod } from "../ScoreLogic/WavePeriod/manipulatePeriod";

interface HourlyDataProps {
  waveData: {
    hourly: {
      wave_height: number[];
      wave_period: number[];
      wave_direction: number[];
    };
  };
  windData: {
    hourly: {
      wind_direction_10m: number[];
      wind_speed_10m: number[];
    };
  };
  getScore: (hr: number) => number | undefined; // Assuming this is a function you've defined
}

const ForecastTable: React.FC<HourlyDataProps> = ({ waveData, windData, getScore }) => {
  // Assuming waveData and windData have the same length

  return (
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
        {Array.from({ length: 24 }, (_, i) => {
          const currentTime = new Date();
          currentTime.setMinutes(0, 0, 0);
          const hrs = currentTime.getHours();
          currentTime.setHours(hrs + i);
          const formattedHour = currentTime.getHours() % 12 || 12;
          const amPm = currentTime.getHours() >= 12 ? " pm" : " am";
          const displayTime = `${formattedHour}${amPm}`;

          const specificHr = i + hrs;
          const { wave_height, wave_period, wave_direction } = waveData.hourly;
          const { wind_direction_10m, wind_speed_10m } = windData.hourly;

          return (
            <TableRow key={i}>
              <TableCell className="text-stone-400">{displayTime}</TableCell>
              <TableCell className="text-stone-100">{(wave_height[specificHr] * 3.2808).toFixed(1)} ft</TableCell>
              <TableCell className="text-stone-100">{manipulatePeriod(wave_period[specificHr])} s</TableCell>
              <TableCell className="text-stone-100">{wave_direction[specificHr]} °</TableCell>
              <TableCell className="text-stone-100">{wind_direction_10m[specificHr]} °</TableCell>
              <TableCell className="text-stone-100">{wind_speed_10m[specificHr]} kmph</TableCell>
              <TableCell className="text-stone-100">{getScore(specificHr)}%</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ForecastTable;
