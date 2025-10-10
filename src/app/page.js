"use client";
import LocationSelector from "@/components/LocationSelector";
import { useEffect, useState } from "react";
import { getWeather } from "@/components/WeatherService";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import WeatherSummary from "@/components/WeatherSummary";
import { getWeatherBackground } from "@/components/WeatherUtils";

export default function Page() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastDays, setForecastDays] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getWeather(
          selectedCity.lat,
          selectedCity.lon,
          forecastDays
        );
        setWeather(data);
      } catch (err) {
        setError(err.message || "Unable to fetch weather data.");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity, forecastDays]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-teal-900 to-black text-white p-6 flex flex-col items-center">
      {/* Top Controls */}
      <div className="w-full mb-8">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 bg-white/10 p-6 rounded-md border border-white/20">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Weather Forecast</h1>
            <p className="text-white/80 text-sm">
              Get data for any city worldwide.
            </p>
          </div>
          <div className="flex-grow">
            <LocationSelector onCityFound={setSelectedCity} />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="forecast-range" className="text-white text-sm">
              Forecast Range:
            </label>
            <select
              id="forecast-range"
              value={forecastDays}
              onChange={(e) => setForecastDays(Number(e.target.value))}
              className="bg-white/10 text-white p-2 rounded border border-white/20 focus:outline-none"
            >
              <option value={7}>7 Days</option>
              <option value={14}>14 Days</option>
              <option value={30}>30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <p className="text-center text-white/70 animate-pulse">
          Loading weather data...
        </p>
      )}
      {error && <p className="text-red-400 text-center">{error}</p>}

      {selectedCity && weather && (
        <>
          <HourlyForecast hourly={weather.hourly} />

          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Left: Current Weather */}
            <div
              className="md:w-2/3 p-6 rounded-lg border border-white/20 flex flex-col justify-between bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${getWeatherBackground(
                  weather.current_weather?.weathercode
                )})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg z-0"></div>
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
                <p className="mb-1">
                  City: {selectedCity.name}, {selectedCity.country}
                </p>
                <p className="mb-1">
                  Temperature:{" "}
                  {weather.current_weather?.temperature !== undefined
                    ? `${weather.current_weather.temperature}°C`
                    : "Unavailable"}
                </p>
                <p className="mb-1">
                  Wind Speed:{" "}
                  {weather.current_weather?.windspeed !== undefined
                    ? `${weather.current_weather.windspeed} km/h`
                    : "Unavailable"}
                </p>
                <p className="mb-4">
                  Time:{" "}
                  {weather.current_weather?.time
                    ? new Date(weather.current_weather.time).toLocaleString()
                    : "Unavailable"}
                </p>

                <WeatherSummary code={weather.current_weather?.weathercode} />
              </div>
            </div>

            {/* Right: Daily Forecast */}
            <DailyForecast daily={weather.daily} forecastDays={forecastDays} />
          </div>
        </>
      )}
    </main>
  );
}
