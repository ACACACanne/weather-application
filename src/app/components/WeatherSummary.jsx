'use client';

import { WiRain, WiCloudy, WiDaySunny, WiFog } from "react-icons/wi";

function getIcon(condition) {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return <WiRain size={64} className="animate-bounce" />;
  if (lower.includes("cloud")) return <WiCloudy size={64} className="animate-float" />;
  if (lower.includes("fog")) return <WiFog size={64} className="animate-float" />;
  return <WiDaySunny size={64} className="animate-float" />;
}

export default function WeatherSummary({ weather }) {
  const current = weather.list[0];
  const temp = Math.round(current.main.temp);
  const condition = current.weather[0].description;
  const wind = current.wind.speed;

  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold">
        {weather.city.name}, {weather.city.country}
      </h1>
      <div className="flex justify-center items-center gap-2">
        {getIcon(condition)}
        <p className="text-xl capitalize">{condition}</p>
      </div>
      <p className="text-6xl font-semibold">{temp}°C</p>
      <p className="text-sm mt-2">Wind: {wind} km/h</p>
    </div>
  );
}

