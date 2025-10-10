export default function WeatherSummary({ code }) {
  const getSummary = (code) => {
    if ([0, 1].includes(code)) return "Clear skies and sunshine.";
    if ([2, 3].includes(code)) return "Clouds drifting across a calm sky.";
    if ([45, 48].includes(code)) return "Foggy conditions, drive with care.";
    if ([51, 53, 55].includes(code)) return "Light drizzle falling gently.";
    if ([61, 63, 65].includes(code)) return "Rain showers passing through.";
    if ([71, 73, 75].includes(code)) return "Snowflakes swirling in the air.";
    if ([95, 96, 99].includes(code)) return "Stormy conditions ahead.";
    return "Weather conditions are variable.";
  };

  return (
    <div className="mt-4 bg-white/20 p-4 rounded backdrop-blur-sm border border-white/10">
      <p className="text-sm text-white/80 italic">{getSummary(code)}</p>
    </div>
  );
}



