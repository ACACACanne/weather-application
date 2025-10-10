import React from "react";

const getSummary = (code) => {
  if ([0, 1].includes(code)) {
    return "The sky is wide open and radiant, bathed in golden sunlight that spills across rooftops and treetops. \n    Gentle warmth fills the air, inviting you to step outside and embrace the day. \n    It's a perfect time for sunlit walks, open windows, and outdoor activities. \n    Don’t forget your sunglasses and stay hydrated, the sun is generous today. \n    Enjoy the vibrant energy! \n   Let the weather guide your rhythm today, whether you wander, rest, or create.";
  }
  if ([2, 3].includes(code)) {
    return "Clouds drift slowly across a tranquil sky, casting soft shadows and painting the world in muted tones. \n    The air feels still and contemplative, ideal for quiet reflection or creative work. \n    You might enjoy a slow walk, journaling by the window, or simply letting your thoughts wander. \n    No need for heavy layers, but keep a light jacket nearby. \n    Embrace the calm and let the gentle weather inspire a peaceful day. \n  Let the weather guide your rhythm today, whether you wander, rest, or create.";
  }
  if ([45, 48].includes(code)) {
    return "A veil of fog wraps the landscape in mystery, softening edges and muffling sound. Trees become silhouettes, roads stretch into the unknown, and the world feels suspended in time. If you're heading out, drive cautiously and use fog lights. Indoors, it's a lovely moment for warm drinks, soft lighting, and a good book. \n    Let the quiet ambiance encourage introspection and mindfulness. \n   Let the weather guide your rhythm today, whether you wander, rest, or create.";
  }
  if ([51, 53, 55].includes(code)) {
    return "A gentle drizzle falls from above, each droplet a whisper against the windowpane. Streets glisten, leaves shimmer, and the air carries a cool, earthy fragrance. It’s a day for layered clothing, waterproof shoes, and perhaps a walk under an umbrella. Or stay inside and enjoy the rhythm of the rain with a cozy blanket and tea. \n    Let the soothing sound of rain inspire calm and creativity. \n   Let the weather guide your rhythm today, whether you wander, rest, or create.";
  }
  if ([61, 63, 65].includes(code)) {
    return "Rain showers sweep through the sky with a steady rhythm, tapping rooftops and dancing on puddles. The clouds are expressive, shifting in tone and texture as the storm moves. Carry an umbrella and wear water-resistant layers. It’s a great day for indoor projects, baking something warm, or watching the rain from a sheltered nook. \n    Let the dynamic weather energize your spirit and spark new ideas. \n   Let the weather guide your rhythm today, whether you wander, rest, or create.";
  }
  if ([71, 73, 75].includes(code)) {
    return "Snowflakes drift gently from the heavens, blanketing the earth in a soft, shimmering hush. The air is crisp, the light diffused, and every surface sparkles with icy elegance. Bundle up in warm layers, wear boots with grip, and take care on slippery paths. Whether you're out building snowmen or inside sipping cocoa, let the quiet beauty of snow slow your pace. \n    Embrace the serene atmosphere and let it inspire tranquility and reflection. \n   Let the weather guide your rhythm today, whether you wander, rest, or create.";
  }
  if ([95, 96, 99].includes(code)) {
    return "Storm clouds gather with dramatic flair, unleashing bursts of wind, rain, and thunder. The sky roars, the trees sway, and the atmosphere crackles with energy. Stay indoors if possible, secure loose items outside, and avoid travel during peak intensity. It’s a time to pause, reflect, and let nature’s power remind you of its awe-inspiring presence. \n    Use this intense weather to fuel your creativity or simply enjoy the spectacle from a safe vantage point. \n   Let the weather guide your rhythm today, whether you wander, rest, or create.";
  }
  return "The weather is shifting and unpredictable, a blend of elements in motion. Keep an eye on updates, dress in layers, and stay flexible with your plans. Sometimes, the most memorable moments come from adapting to the skies.";
};



const WeatherSummary = ({ code }) => {
  return (
    <div className="mt-4 bg-white/20 p-4 md:p-6 mb-4 rounded backdrop-blur-sm border border-white/10">
      <p className="text-sm text-white/80 italic">{getSummary(code)}</p>
    </div>
  );
};

export default WeatherSummary;



