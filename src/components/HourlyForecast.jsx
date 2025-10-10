export default function HourlyForecast({ hourly }) {
  return (
    <div className="w-full mb-6 bg-white/10 p-4 rounded-lg border border-white/20 overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
      <h2 className="text-xl font-semibold mb-2">Next 24 Hours</h2>
      <div className="flex gap-4 min-w-max">
        {hourly.time.slice(0, 24).map((time, index) => (
          <div key={time} className="bg-white/20 p-2 rounded text-center min-w-[100px] shadow-sm hover:scale-105 transition-transform duration-300">
            <p className="text-sm">
              {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-lg font-semibold">{hourly.temperature_2m?.[index]}°C</p>
            <p className="text-xs text-white/70">Wind: {hourly.windspeed_10m?.[index]} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
}
