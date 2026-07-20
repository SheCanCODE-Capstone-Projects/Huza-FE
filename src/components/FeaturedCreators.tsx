import { useState } from "react";

import mosesTurahirwa from "../assets/creators/moses-turahirwa.jpg";
import tetaIsibo from "../assets/creators/teta-isibo.jpg";
import jacquesNkizingabo from "../assets/creators/jacques-nkizingabo.jpg";
import junoKizigenza from "../assets/creators/juno-kizigenza.jpg";
import arthurNkusi from "../assets/creators/arthur-nkusi.jpg";
import millyBeautyStudio from "../assets/creators/milly-beauty-studio.jpg";
import thalissaBeautyStudio from "../assets/creators/thalissa-beauty-studio.jpg";
import benithaMakeup from "../assets/creators/benitha-makeup.jpg";
import israelMbonyi from "../assets/creators/israel-mbonyi.jpg";
import alainGakwaya from "../assets/creators/alain-gakwaya.jpg";
import noahBugingo from "../assets/creators/noah-bugingo.jpg";
import nelsonNiyakire from "../assets/creators/nelson-niyakire.jpg";
import ornellaUmutoni from "../assets/creators/ornella-umutoni.jpg";
import christineMunezero from "../assets/creators/christine-munezero.jpg";
import aniphaUmfite from "../assets/creators/anipha-umfite.jpg";
import rwandaEventsGroup from "../assets/creators/rwanda-events-group.jpg";
import qaVenueSolutions from "../assets/creators/qa-venue-solutions-rwanda.jpg";
import nationalBallet from "../assets/creators/national-ballet-of-rwanda.jpg";
import intoreUrugangazi from "../assets/creators/intore-urugangazi.jpg";
import uburangaArts from "../assets/creators/uburanga-arts-cultural-troupe.jpg";
import henrysVogue from "../assets/creators/henry's-vogue.jpg";
import fathieCouture from "../assets/creators/fathie-couture.jpg";

const filters = ["All", "Photography", "Cinematography", "Modeling", "Acting", "Voice", "Music", "Fashion"];

const creators = [
  { name: "Moses Turahirwa", role: "Designer · Kigali", tags: ["Design"], image: mosesTurahirwa },
  { name: "Teta Isibo", role: "Inzuki Designs · Kigali", tags: ["Design"], image: tetaIsibo },
  { name: "Jacques Nkizingabo", role: "Photography / Visual Storytelling · Kigali", tags: ["Photography"], image: jacquesNkizingabo },
  { name: "Juno Kizigenza", role: "Afrobeats Singer · Kigali", tags: ["Music"], image: junoKizigenza },
  { name: "Arthur Nkusi", role: "Master of Ceremonies & Comedian · Kigali", tags: ["MC", "Comedy"], image: arthurNkusi },
  { name: "Milly Beauty Studio", role: "Makeup Artist · Kigali", tags: ["Beauty"], image: millyBeautyStudio },
  { name: "Thalissa Makeup Studio", role: "Makeup Artist · Kigali", tags: ["Beauty"], image: thalissaBeautyStudio },
  { name: "Benitha Makeup", role: "Makeup Artist · Kigali", tags: ["Beauty"], image: benithaMakeup },
  { name: "Israel Mbonyi", role: "Artist · Kigali", tags: ["Artist"], image: israelMbonyi },
  { name: "Alain Gakwaya", role: "Artist · Kigali", tags: ["Artist"], image: alainGakwaya },
  { name: "Noah Bugingo", role: "Artist · Kigali", tags: ["Artist"], image: noahBugingo },
  { name: "Nelson Niyakire", role: "Artist · Kigali", tags: ["Artist"], image: nelsonNiyakire },
  { name: "Ornella Umutoni", role: "Model · Kigali", tags: ["Modeling"], image: ornellaUmutoni },
  { name: "Christine Munezero", role: "Model · Kigali", tags: ["Modeling"], image: christineMunezero },
  { name: "Anipha Umfite", role: "Model · Kigali", tags: ["Modeling"], image: aniphaUmfite },
  { name: "Rwanda Events Group", role: "Event Planner · Kigali", tags: ["Events"], image: rwandaEventsGroup },
  { name: "QA Venue Solutions Rwanda", role: "Event Planner · Kigali", tags: ["Events"], image: qaVenueSolutions },
  { name: "National Ballet of Rwanda", role: "Urukerereza · Kigali", tags: ["Dance"], image: nationalBallet },
  { name: "Intore Urugangazi", role: "Itorero · Kigali", tags: ["Dance"], image: intoreUrugangazi },
  { name: "Uburanga Arts and Cultural Troupe", role: "Dance Troupe · Kigali", tags: ["Dance"], image: uburangaArts },
  { name: "Henry's Vogue", role: "Designer · Kigali", tags: ["Fashion"], image: henrysVogue },
  { name: "Fathie Couture", role: "Designer · Kigali", tags: ["Fashion"], image: fathieCouture },
];

const PER_PAGE = 8;

export default function FeaturedCreators() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(creators.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = creators.slice(start, start + PER_PAGE);

  return (
    <section className="bg-cream dark:bg-black px-5 md:px-10 py-10 md:py-16">
      <p className="text-xs tracking-widest text-olive dark:text-gold font-semibold mb-2">
        VERIFIED · RWANDA
      </p>

      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-3">
        <h2 className="font-display text-2xl md:text-4xl text-forest dark:text-white">
          Featured Creators
        </h2>
        <p className="text-sm text-forest/70 dark:text-white/60 max-w-xs md:text-right">
          A curated selection of Rwanda's top creative professionals,
          verified and ready to hire.
        </p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {filters.map((f, i) => (
          <button
            key={f}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm border ${
              i === 0
                ? "bg-forest dark:bg-white text-white dark:text-forest border-forest dark:border-white"
                : "text-forest dark:text-white border-forest/15 dark:border-white/15"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {visible.map((c) => (
          <div key={c.name} className="rounded-xl overflow-hidden border border-forest/10 dark:border-white/10 bg-white dark:bg-white/5">
            <div className="aspect-square bg-gray-300 dark:bg-white/10 relative">
              {c.image && (
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              )}
              <span className="absolute top-2 left-2 bg-forest text-white text-[10px] px-2 py-0.5 rounded-full">
                ✓ Verified
              </span>
            </div>
            <div className="p-3 md:p-4">
              <p className="font-semibold text-forest dark:text-white text-xs md:text-sm">{c.name}</p>
              <p className="text-[11px] md:text-xs text-forest/70 dark:text-white/60 mt-1">{c.role}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {c.tags.map((t) => (
                  <span key={t} className="bg-sage dark:bg-white/10 text-forest dark:text-white/80 text-[10px] px-2 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <button className="mt-4 w-full border border-forest/15 dark:border-white/20 text-forest dark:text-white text-xs md:text-sm py-2 rounded-full">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="w-9 h-9 rounded-full border border-forest/15 dark:border-white/15 text-forest dark:text-white disabled:opacity-30"
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`w-9 h-9 rounded-full text-sm ${
              n === page
                ? "bg-forest dark:bg-white text-white dark:text-forest"
                : "text-forest dark:text-white border border-forest/15 dark:border-white/15"
            }`}
          >
            {n}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="w-9 h-9 rounded-full border border-forest/15 dark:border-white/15 text-forest dark:text-white disabled:opacity-30"
        >
          ›
        </button>
      </div>
    </section>
  );
}