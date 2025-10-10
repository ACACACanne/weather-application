export default function DailyForecast({ daily, forecastDays }) {
  return (
    <div className="md:w-1/3 bg-white/10 p-4 rounded-lg border border-white/20 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
      <h2 className="text-xl font-semibold mb-4">Next {forecastDays} Days</h2>
      <div className="flex flex-col gap-4">
        {daily.time.slice(0, forecastDays).map((date, index) => (
          <div key={date} className="bg-white/20 p-3 rounded shadow-sm hover:bg-white/30 transition-colors duration-300">
            <p className="text-sm font-medium">
              {new Date(date).toLocaleDateString([], {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
              })}
            </p>
            <p className="text-lg font-semibold">
              {daily.temperature_2m_max?.[index]}° / {daily.temperature_2m_min?.[index]}°C
            </p>
            <p className="text-sm text-white/70">
              Wind: {daily.windspeed_10m_max?.[index]} km/h
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

