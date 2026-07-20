import { useState } from "react";
import logo from "../assets/logo.png";

type Props = {
  dark: boolean;
  setDark: (v: boolean) => void;
};

export default function Navbar({ dark, setDark }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative px-5 md:px-10 py-4 bg-sage dark:bg-black dark:border-b dark:border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Umuhuza logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-lg font-bold text-forest dark:text-white">Umuhuza</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-forest dark:text-white/80">
          <a href="#">Creators</a>
          <a href="#">Jobs</a>
          <a href="#">How it works</a>
          <a href="#">Join</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full border border-forest/15 dark:border-white/20 flex items-center justify-center text-forest dark:text-white"
          >
            {dark ? "☀" : "🌙"}
          </button>
          <button className="text-sm text-forest dark:text-white">Log in</button>
          <button className="bg-forest dark:bg-white text-white dark:text-forest text-sm px-4 py-2 rounded-full">
            Get Started
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-forest dark:text-white"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm text-forest dark:text-white/80 pb-4">
          <a href="#">Creators</a>
          <a href="#">Jobs</a>
          <a href="#">How it works</a>
          <a href="#">Join</a>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-full border border-forest/15 dark:border-white/20 flex items-center justify-center"
            >
              {dark ? "☀" : "🌙"}
            </button>
            <button className="flex-1">Log in</button>
            <button className="flex-1 bg-forest dark:bg-white text-white dark:text-forest py-2 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}