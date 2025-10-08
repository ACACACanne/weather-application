'use client';

import { useState, useEffect } from "react";
import LocationSelector from "../components/LocationSelector";
import WeatherSummary from "../components/WeatherSummary";
import WeatherService from "../components/WeatherService";
import DayCard from "../components/DayCard";
import { fetchWeather } from "../utils/fetchWeather";

export default function Home() {
  const [city, setCity] = useState("Tbilisi");
  const [weather, setWeather] = useState(null);
  const [view, setView] = useState("hourly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    }
    loadWeather();
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative">
      <img
        src="/silhouette.svg"
        alt="Silhouette"
        className="absolute bottom-0 left-0 w-full opacity-30 pointer-events-none"
      />
      <div className="bg-black bg-opacity-60 min-h-screen text-white px-4 py-6 relative z-10">
        <LocationSelector onSelect={setCity} />
        {loading && <p className="text-center text-white">Loading weather...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && weather && (
          <>
            <WeatherSummary weather={weather} />
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setView("hourly")}
                className={`px-4 py-2 rounded ${
                  view === "hourly" ? "bg-indigo-600" : "bg-gray-700"
                }`}
              >
                Hourly
              </button>
              <button
                onClick={() => setView("daily")}
                className={`px-4 py-2 rounded ${
                  view === "daily" ? "bg-indigo-600" : "bg-gray-700"
                }`}
              >
                Daily
              </button>
            </div>
            <div className="transition-opacity duration-500 ease-in-out">
              {view === "hourly" ? (
                <WeatherService weather={weather} />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  {weather.list
                    .filter((_, i) => i % 8 === 0)
                    .slice(0, 5)
                    .map((day, idx) => (
                      <DayCard key={idx} day={day} />
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


