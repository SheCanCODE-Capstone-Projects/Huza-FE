const steps = [
  { n: "01", title: "Post or browse", desc: "Recruiters post briefs. Creatives publish verified portfolios. Everything is transparent." },
  { n: "02", title: "Match & apply", desc: "Filter by category, location and rating. Apply in three simple steps with a portfolio attached." },
  { n: "03", title: "Consent & hire", desc: "Contracts are signed by artist, recruiter and manager before any work begins. Zero grey area." },
];

export default function HowItWorks() {
  return (
    <section className="bg-sage dark:bg-black px-5 md:px-10 py-10 md:py-16">
      <p className="text-xs tracking-widest text-olive dark:text-gold font-semibold mb-2">
        HOW IT WORKS
      </p>
      <h2 className="font-display text-2xl md:text-4xl text-forest dark:text-white max-w-lg mb-8 md:mb-10">
        Hire creative talent, <span className="italic text-olive dark:text-gold">the honest way.</span>
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((s) => (
          <div key={s.n} className="bg-white dark:bg-white/5 rounded-xl p-5 md:p-6">
            <div className="w-8 h-8 rounded-full bg-forest dark:bg-white text-white dark:text-forest text-xs flex items-center justify-center mb-4">
              {s.n}
            </div>
            <h3 className="font-semibold text-forest dark:text-white mb-2">{s.title}</h3>
            <p className="text-sm text-forest/70 dark:text-white/60">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}