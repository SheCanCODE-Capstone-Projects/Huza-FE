import ornella from "../assets/creators/ornella-umutoni.jpg";
import henrysVogue from "../assets/creators/henry's-vogue.jpg";
import fathieCouture from "../assets/creators/fathie-couture.jpg";

export default function CTA() {
  return (
    <section className="bg-cream dark:bg-black px-5 md:px-10 py-10 md:py-16">
      <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-display text-2xl md:text-4xl text-forest dark:text-white mb-4">
            Ready to be seen, <span className="italic text-olive dark:text-gold">and hired?</span>
          </h2>
          <p className="text-forest/70 dark:text-white/60 mb-6 text-sm md:text-base">
            Join 1,200+ Rwandan creatives already building their careers on
            Umuhuza.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-forest dark:bg-white text-white dark:text-forest text-sm px-6 py-3 rounded-full">
              Join as Creator
            </button>
            <button className="border border-forest/15 dark:border-white/20 text-forest dark:text-white text-sm px-6 py-3 rounded-full">
              Hire Talent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <img src={ornella} alt="Ornella Umutoni" className="aspect-[3/4] object-cover rounded-xl" />
          <img src={henrysVogue} alt="Henry's Vogue" className="aspect-[3/4] object-cover rounded-xl mt-6" />
          <img src={fathieCouture} alt="Fathie Couture" className="aspect-[3/4] object-cover rounded-xl" />
        </div>
      </div>
    </section>
  );
}