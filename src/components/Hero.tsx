import { useState, useEffect } from "react";
import moses from "../assets/creators/moses-turahirwa.jpg";
import teta from "../assets/creators/teta-isibo.jpg";
import jacques from "../assets/creators/jacques-nkizingabo.jpg";
import juno from "../assets/creators/juno-kizigenza.jpg";
import arthur from "../assets/creators/arthur-nkusi.jpg";

const slides = [
  { image: moses, name: "Moses Turahirwa", role: "Designer · Kigali" },
  { image: teta, name: "Teta Isibo", role: "Inzuki Designs · Kigali" },
  { image: jacques, name: "Jacques Nkizingabo", role: "Photographer · Kigali" },
  { image: juno, name: "Juno Kizigenza", role: "Afrobeats Singer · Kigali" },
  { image: arthur, name: "Arthur Nkusi", role: "MC & Comedian · Kigali" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const active = slides[current];

  return (
    <section className="bg-sage dark:bg-black px-5 md:px-10 py-10 md:py-16 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-forest dark:text-white">
          Find & Hire
          <br />
          Rwanda's Best
          <br />
          <span className="italic text-olive dark:text-gold">Creative Talent.</span>
        </h1>

        <p className="mt-6 text-forest/80 dark:text-white/60 max-w-md text-sm md:text-base">
          Umuhuza connects photographers, actors, models, musicians,
          designers and voice artists with the recruiters and brands hiring
          them across the country.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
          <input
            type="text"
            placeholder="Search talent or jobs..."
            className="flex-1 rounded-full px-5 py-3 border border-forest/10 dark:border-white/15 bg-white dark:bg-white/5 dark:text-white text-sm outline-none"
          />
          <button className="bg-forest dark:bg-white text-white dark:text-forest text-sm px-6 py-3 rounded-full whitespace-nowrap">
            Get Started
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-300 dark:bg-white/10">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.image}
            alt={slide.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <span className="absolute top-4 left-4 bg-forest text-white text-xs px-3 py-1 rounded-full z-10">
          ✓ Verified
        </span>

        <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-black/80 rounded-xl px-4 py-3 z-10">
          <p className="text-sm font-semibold text-forest dark:text-white">{active.name}</p>
          <p className="text-xs text-forest/70 dark:text-white/60">{active.role}</p>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-1 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full ${
                i === current ? "bg-forest dark:bg-white" : "bg-white/70 dark:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}