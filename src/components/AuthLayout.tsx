import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import authBackground from "../assets/auth-bg.jpeg";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 sm:py-10"
      style={{
        backgroundImage: `url(${authBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 mx-auto w-full max-w-xl">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-800 text-xl font-extrabold text-white shadow-lg">
            I
          </span>

          <span className="text-3xl font-extrabold text-white drop-shadow-md">
            Ihuriro
          </span>
        </Link>

        <section className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-2xl sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1A1A1A] sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 font-semibold leading-7 text-[#1A1A1A]">
              {description}
            </p>
          </div>

          {children}
        </section>

        <p className="mt-6 text-center text-xs font-semibold text-white drop-shadow-md">
          © {new Date().getFullYear()} Ihuriro. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default AuthLayout;