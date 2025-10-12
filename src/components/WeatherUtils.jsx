export function getWeatherBackground(code) {
  if ([0].includes(code)) return '/pictures/sunny1.jpg'; // Clear sky
  if ([1].includes(code)) return '/pictures/sunny2.jpg'; // Mainly clear
  if ([2, 3, 45, 48].includes(code)) return '/pictures/cloudy1.jpg'; // Cloudy + Fog
  if ([51, 52, 53, 61, 63, 65].includes(code)) return '/pictures/rainy1.jpg'; // Drizzle + Rain
  if ([71, 73, 75].includes(code)) return '/pictures/snowy1.jpg'; // Snowy
  if ([95, 96, 99].includes(code)) return '/pictures/stormy1.jpg'; // Thunderstorm
  return '/pictures/default.jpg'; // Fallback
}



