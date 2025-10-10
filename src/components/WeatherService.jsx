export async function getWeather(lat, lon) {
  if (!lat || !lon) {
    throw new Error('Latitude and longitude are required');
  }

  const today = new Date().toISOString().split('T')[0];
  const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,windspeed_10m,weathercode&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto&start_date=${today}&end_date=${endDate}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    

    const data = await response.json();
    console.log('Open-Meteo response:', data);

    if (!data || !data.daily || !data.current_weather) {
      throw new Error('Incomplete weather data received');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    throw new Error('Unable to fetch weather data. Please try again later.');
  }
}


