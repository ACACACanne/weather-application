"use client";
import { format } from "date-fns";

export default function DayCard({ day }) {
  const date = format(new Date(day.dt_txt), "EEEE");
  const temp = Math.round(day.main.temp);
  const condition = day.weather[0].main;

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-center hover:scale-105 transition-transform">
      <p className="text-sm">{date}</p>
      <p className="text-xl font-bold">{temp}°C</p>
      <p className="text-sm">{condition}</p>
    </div>
  );
}


