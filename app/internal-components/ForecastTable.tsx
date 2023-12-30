import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { manipulatePeriod } from "../scoreLogic/WavePeriod/manipulatePeriod";
import { Arrow } from "./Arrow";

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
      <TableHeader className="sticky top-0 bg-stone-900 z-10">
        <TableRow>
          <TableHead className="text-stone-400">Time:</TableHead>
          <TableHead className="text-stone-400">Wave:</TableHead>
          <TableHead className="text-stone-400">Wind:</TableHead>
          <TableHead className="text-stone-400">Score:</TableHead>
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

          console.log(specificHr);
          return (
            <>
              {specificHr === 24 && (
                <TableRow key={i} className={"h-10"}>
                  <TableCell className="text-stone-400 sticky min-w-20">Tomorrow</TableCell>
                </TableRow>
              )}
              <TableRow key={i} className={"h-10"}>
                <TableCell className="text-stone-400 sticky min-w-20">{displayTime}</TableCell>
                <TableCell className="text-stone-400 flex gap-6 text-xs items-center">
                  <div className="flex gap-2 items-center">
                    <Arrow angle={wave_direction[specificHr]} />
                    {wave_direction[specificHr]}°
                  </div>
                  <div className="text-stone-400 flex gap-2 items-baseline">
                    <span className="text-stone-100 font-bold text-base">
                      {(wave_height[specificHr] * 3.2808).toFixed(1)}
                      <span className="text-stone-400 text-xs font-normal">{"ft"}</span>
                    </span>
                    @
                    <span className="text-stone-100 font-bold text-base">
                      {manipulatePeriod(wave_period[specificHr])}
                      <span className="text-stone-400 text-xs font-normal">{"s"}</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-stone-400 flex gap-6 text-xs items-center">
                    <div className="flex gap-2 items-center">
                      <Arrow angle={wind_direction_10m[specificHr]} />
                      {wind_direction_10m[specificHr]}°
                    </div>
                    <div className="text-stone-400 flex gap-2 items-baseline">
                      <span className="text-stone-100 font-bold text-base">
                        {wind_speed_10m[specificHr]}
                        <span className="text-stone-400 text-xs font-normal">{"kmph"}</span>
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-stone-100">
                  <span
                    style={{
                      color: `hsl(${(getScore(specificHr)! * 1.15).toFixed(0)}, 60%, 62%)`,
                    }}
                    className="font-bold text-base">
                    {getScore(specificHr)}
                  </span>
                  <span className="text-stone-400 text-xs font-normal">{"%"}</span>
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ForecastTable;
