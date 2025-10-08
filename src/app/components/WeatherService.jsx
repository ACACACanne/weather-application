export default function WeatherService({ weather }) {
  const hourly = weather.list.slice(0, 15);

  return (
    <div className="overflow-x-auto flex gap-4 py-4 px-2">
      {hourly.map((hour, idx) => (
        <div key={idx} className="min-w-[60px] text-center text-white bg-gray-800 rounded p-2">
          <p className="text-sm">{hour.dt_txt.slice(11, 16)}</p>
          <p className="text-lg font-medium">{Math.round(hour.main.temp)}°</p>
        </div>
      ))}
    </div>
  );
}

