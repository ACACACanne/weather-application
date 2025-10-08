'use client';

import { useState } from "react";

export default function LocationSelector({ onSelect }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSelect(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city..."
        className="px-4 py-2 rounded-l bg-gray-800 text-white focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-r bg-indigo-600 hover:bg-indigo-700"
      >
        Search
      </button>
    </form>
  );
}



