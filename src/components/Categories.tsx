const categories = ["Design", "Photography", "Video & Film", "Music", "Writing", "Modeling", "Voice", "More"];

export default function Categories() {
  return (
    <section className="bg-cream dark:bg-black px-5 md:px-10 py-8 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl md:text-2xl text-forest dark:text-white">
          Popular Categories
        </h2>
        <a href="#" className="text-sm text-forest dark:text-white/70">
          Browse all →
        </a>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 md:px-5 py-2 rounded-full border border-forest/15 dark:border-white/15 text-xs md:text-sm text-forest dark:text-white bg-white dark:bg-white/5"
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}