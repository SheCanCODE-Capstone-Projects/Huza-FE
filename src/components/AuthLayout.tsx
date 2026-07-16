import type { ReactNode } from "react";
import { Link } from "react-router-dom";

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
    <main className="min-h-screen bg-green-50/40 px-4 py-8 text-gray-900 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-xl">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-green-800 text-xl font-extrabold text-white shadow-sm">
            I
          </span>

          <span className="text-2xl font-extrabold text-green-800">
            Ihuriro
          </span>
        </Link>

        <section className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 leading-7 text-gray-600">
              {description}
            </p>
          </div>

          {children}
        </section>

        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Ihuriro. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default AuthLayout;