import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", {
      replace: true,
    });
  }

  return (
    <main className="min-h-screen bg-page">
      <header className="border-b border-border-light bg-white">
        <div className="mx-auto flex min-h-20 w-[92%] max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-extrabold text-primary">
            Ihuriro
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <section className="mx-auto w-[92%] max-w-6xl py-10">
        <div className="rounded-3xl bg-primary p-8 text-white">
          <h2 className="text-3xl font-bold">
            Welcome, {user?.fullName}
          </h2>

          <p className="mt-3 text-white/70">
            Role: {user?.role}
          </p>

          <p className="mt-1 text-white/70">
            Location: {user?.location}
          </p>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;