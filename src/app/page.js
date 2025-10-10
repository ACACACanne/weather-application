'use client';
import LocationSelector from "@/components/LocationSelector";
import { useEffect, useState } from "react";
import { getWeather } from "@/components/WeatherService";

export default function Page() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getWeather(selectedCity.lat, selectedCity.lon);
        setWeather(data);
      } catch (err) {
        setError(err.message || 'Unable to fetch weather data.');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-teal-900 to-black text-white flex flex-col items-center justify-start p-4 ">
      <div className="mt-4 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
        <h1 className="text-3xl font-bold text-center mb-4 tracking-wide">
          🌤️ Weather Snapshot
        </h1>
        <p className="text-center text-sm text-white/80 mb-6">
          Search for a city to see the forecast
        </p>

        <LocationSelector onCityFound={setSelectedCity} />

        {loading && (
          <p className="mt-4 text-center text-white/70 animate-pulse">Loading weather data...</p>
        )}

        {error && (
          <p className="mt-4 text-red-400 text-center">{error}</p>
        )}

        {selectedCity && weather && (
          <>
            {/* Current Weather */}
            <div className="mt-6 bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
              <p>City: {selectedCity.name}, {selectedCity.country}</p>
              <p>
                Temperature:{" "}
                {weather.current_weather?.temperature !== undefined
                  ? `${weather.current_weather.temperature}°C`
                  : "Unavailable"}
              </p>
              <p>
                Wind Speed:{" "}
                {weather.current_weather?.windspeed !== undefined
                  ? `${weather.current_weather.windspeed} km/h`
                  : "Unavailable"}
              </p>
              <p>
                Time:{" "}
                {weather.current_weather?.time
                  ? new Date(weather.current_weather.time).toLocaleString()
                  : "Unavailable"}
              </p>
            </div>

            {/* Next 7 Days */}
            {weather.daily?.time?.length > 0 ? (
              <div className="mt-4 bg-white/10 p-4 rounded-lg border border-white/20">
                <h2 className="text-xl font-semibold mb-2">Next 7 Days</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {weather.daily.time.slice(0, 7).map((date, index) => (
                    <div
                      key={date}
                      className="bg-white/20 rounded-md p-3 text-center shadow-sm"
                    >
                      <p className="text-sm font-medium">
                        {new Date(date).toLocaleDateString([], {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                      <p className="text-lg font-semibold">
                        {weather.daily.temperature_2m_max?.[index]}° / {weather.daily.temperature_2m_min?.[index]}°C
                      </p>
                      <p className="text-sm text-white/70">
                        Wind: {weather.daily.windspeed_10m?.[index]} km/h
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-4 text-yellow-300 text-center">
                Daily forecast is not available for this location. Try a nearby city or check back later.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

