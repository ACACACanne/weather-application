'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function LocationSelector({ onCityFound }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`
        );
        setSuggestions(res.data.results || []);
        setShowDropdown(true);
      } catch (err) {
        console.error('Geocoding error:', err.message);
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [city]);

  const handleSelect = (location) => {
    const { latitude: lat, longitude: lon, name, country, admin1 } = location;
    onCityFound({ lat, lon, name, country, admin1 });
    setCity(`${name}, ${admin1 || ''}, ${country}`);
    setSuggestions([]);
    setShowDropdown(false);
    setError(null);
  };

  return (
    <div className="relative w-small max-w-md">
      <input
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setError(null);
        }}
        placeholder="Start typing a city name..."
        className="border p-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-white text-black border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((loc, index) => (
            <li
              key={`${loc.id}-${index}`}
              onClick={() => handleSelect(loc)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {loc.name}
              {loc.admin1 ? `, ${loc.admin1}` : ''}, {loc.country}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
    </div>
  );
}

LocationSelector.propTypes = {
  onCityFound: PropTypes.func.isRequired,
};


