import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-sage dark:bg-black dark:border-t dark:border-white/10 px-5 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Umuhuza logo" className="w-6 h-6 rounded-full object-cover" />
        <span className="font-semibold text-forest dark:text-white">Umuhuza</span>
      </div>
      <p className="text-xs text-forest/60 dark:text-white/50">© 2026 Umuhuza · Kigali, Rwanda</p>
    </footer>
  );
}