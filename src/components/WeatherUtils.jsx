export function getWeatherBackground(code) {
  if ([0].includes(code)) return '/pictures/sunny.png'; // Clear sky
  if ([1].includes(code)) return '/pictures/sunny.png'; // Mainly clear
  if ([2, 3, 45, 48].includes(code)) return '/pictures/cloudy.png'; // Cloudy + Fog
  if ([51, 52, 53, 61, 63, 65].includes(code)) return '/pictures/rainy.png'; // Drizzle + Rain
  if ([71, 73, 75].includes(code)) return '/pictures/snowy.png'; // Snow
  if ([95, 96, 99].includes(code)) return '/pictures/stormy.png'; // Thunderstorm
  return '/pictures/default.png'; // Fallback
}



