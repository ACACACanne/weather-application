export async function getWeather(lat, lon, days = 7) {
  if (!lat || !lon) {
    throw new Error('Latitude and longitude are required');
  }

  const today = new Date().toISOString().split('T')[0];
  const endDate = new Date(Date.now() + days * 86400000).toISOString().split('T')[0];

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,windspeed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,weathercode&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto&start_date=${today}&end_date=${endDate}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.daily || !data.current_weather || !data.hourly) {
      throw new Error('Incomplete weather data received');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    throw new Error('Unable to fetch weather data. Please try again later.');
  }
}






















