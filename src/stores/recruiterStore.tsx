import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface RecruiterProfileData {
  fullName: string;
  initials: string;
  title: string;
  location: string;
  joinDate: string;
  email: string;
  phone: string;
  bio: string;
  companyName: string;
  companyInitials: string;
  parentOrg: string;
  companyDescription: string;
  employees: string;
  website: string;
  publicSlug: string;
}

const DEFAULT_PROFILE: RecruiterProfileData = {
  fullName: "Aline Uwase",
  initials: "AU",
  title: "Talent Acquisition Lead",
  location: "Kigali, Rwanda",
  joinDate: "Joined Mar 2025",
  email: "aline@huza.rw",
  phone: "+250 788 123 456",
  bio: "Connecting Rwanda's creative talent with meaningful opportunities. Passionate about building diverse teams across film, design, and music.",
  companyName: "Huza Studios Ltd",
  companyInitials: "HS",
  parentOrg: "Huza Group",
  companyDescription:
    "A creative talent platform connecting Rwanda's filmmakers, designers, and musicians with meaningful opportunities.",
  employees: "120 employees",
  website: "www.huza.rw",
  publicSlug: "aline-uwase",
};

interface RecruiterStore {
  profile: RecruiterProfileData;
  updateProfile: (data: Partial<RecruiterProfileData>) => void;
}

const RecruiterContext = createContext<RecruiterStore | null>(null);

export function RecruiterProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<RecruiterProfileData>(DEFAULT_PROFILE);

  function updateProfile(data: Partial<RecruiterProfileData>) {
    setProfile((prev) => ({ ...prev, ...data }));
  }

  return (
    <RecruiterContext.Provider value={{ profile, updateProfile }}>
      {children}
    </RecruiterContext.Provider>
  );
}

export function useRecruiter() {
  const ctx = useContext(RecruiterContext);
  if (!ctx) throw new Error("useRecruiter must be used within a RecruiterProvider");
  return ctx;
}
