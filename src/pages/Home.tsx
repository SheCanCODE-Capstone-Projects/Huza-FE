import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedCreators from "../components/FeaturedCreators";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="bg-cream dark:bg-black">
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <Categories />
      <FeaturedCreators />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}