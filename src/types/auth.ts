export type UserRole = "artist" | "recruiter";

export type RecruiterType = "individual" | "company";

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  recruiterType: RecruiterType | null;
  companyName: string | null;
  tinNumber: string | null;
  password: string;
}

export interface StoredUser extends RegisterData {
  id: string;
  createdAt: string;
  profilePicture?: string;
  authenticationProvider: "email" | "google";
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  recruiterType: RecruiterType | null;
  companyName: string | null;
  tinNumber: string | null;
  profilePicture?: string;
  authenticationProvider: "email" | "google";
}

export interface GoogleProfile {
  sub: string;
  name?: string;
  given_name?: string;
  email: string;
  picture?: string;
}