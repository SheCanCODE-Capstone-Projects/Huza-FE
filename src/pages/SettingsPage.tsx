import DashboardLayout from "../components/DashboardLayout";

const CREAM = "#E5E3DD";
const INK = "#1A1A1A";
const MUTED = "#6B6B65";

export default function SettingsPage() {
  return (
    <DashboardLayout active="Settings" searchPlaceholder="Search artists, portfolios, or job posts...">
      <h1 className="text-2xl font-bold tracking-tight" style={{ color: INK }}>Settings</h1>
      <p className="text-sm mt-1" style={{ color: MUTED }}>Manage your account preferences.</p>

      <section
        className="rounded-2xl p-6 mt-6"
        style={{ backgroundColor: "#FFFFFF", border: `1px solid ${CREAM}` }}
      >
        {/* Settings fields go here */}
      </section>
    </DashboardLayout>
  );
}