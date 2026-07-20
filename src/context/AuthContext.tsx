import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  AuthUser,
  GoogleProfile,
  RegisterData,
  StoredUser,
} from "../types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  register: (data: RegisterData) => void;
  login: (email: string, password: string) => void;
  loginWithGoogle: (profile: GoogleProfile) => void;
  resetPassword: (email: string, newPassword: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

// Changed to V2 so old saved users are ignored.
const USERS_KEY = "ihuriroUsersV2";
const CURRENT_USER_KEY = "ihuriroCurrentUserV2";

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(
        CURRENT_USER_KEY,
      );

      if (savedUser) {
        setUser(JSON.parse(savedUser) as AuthUser);
      }
    } catch (error) {
      console.error("Failed to load current user:", error);
      localStorage.removeItem(CURRENT_USER_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  function getUsers(): StoredUser[] {
    try {
      const savedUsers = localStorage.getItem(USERS_KEY);

      if (!savedUsers) {
        return [];
      }

      const parsedUsers: unknown = JSON.parse(savedUsers);

      if (!Array.isArray(parsedUsers)) {
        localStorage.removeItem(USERS_KEY);
        return [];
      }

      return parsedUsers as StoredUser[];
    } catch (error) {
      console.error("Failed to load users:", error);
      localStorage.removeItem(USERS_KEY);
      return [];
    }
  }

  function saveUsers(users: StoredUser[]) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users),
    );
  }

  function createSafeUser(
    account: StoredUser,
  ): AuthUser {
    return {
      id: account.id,
      fullName: account.fullName,
      email: account.email,
      phone: account.phone,
      location: account.location,
      role: account.role,
      recruiterType: account.recruiterType,
      companyName: account.companyName,
      tinNumber: account.tinNumber,
      profilePicture: account.profilePicture,
      authenticationProvider:
        account.authenticationProvider,
    };
  }

  function register(data: RegisterData) {
    const users = getUsers();

    const normalizedEmail = data.email
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      throw new Error("Email address is required.");
    }

    const emailExists = users.some((account) => {
      if (
        !account ||
        typeof account.email !== "string"
      ) {
        return false;
      }

      return (
        account.email.trim().toLowerCase() ===
        normalizedEmail
      );
    });

    if (emailExists) {
      throw new Error(
        "An account with this email already exists.",
      );
    }

    const newUser: StoredUser = {
      id:
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : Date.now().toString(),

      fullName: data.fullName.trim(),
      email: normalizedEmail,
      phone: data.phone.trim(),
      location: data.location.trim(),
      role: data.role,

      recruiterType:
        data.role === "recruiter"
          ? data.recruiterType
          : null,

      companyName:
        data.role === "recruiter" &&
        data.recruiterType === "company"
          ? data.companyName?.trim() || null
          : null,

      tinNumber:
        data.role === "recruiter" &&
        data.recruiterType === "company"
          ? data.tinNumber?.trim() || null
          : null,

      password: data.password,
      profilePicture: "",
      authenticationProvider: "email",
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);
  }

  function login(email: string, password: string) {
    const users = getUsers();

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    const foundUser = users.find((account) => {
      if (
        !account ||
        typeof account.email !== "string"
      ) {
        return false;
      }

      return (
        account.email.trim().toLowerCase() ===
          normalizedEmail &&
        account.password === password
      );
    });

    if (!foundUser) {
      throw new Error(
        "Incorrect email address or password.",
      );
    }

    const loggedInUser = createSafeUser(foundUser);

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(loggedInUser),
    );

    setUser(loggedInUser);
  }

  function loginWithGoogle(profile: GoogleProfile) {
    if (!profile.email) {
      throw new Error(
        "Google did not provide an email address.",
      );
    }

    const users = getUsers();

    const normalizedEmail = profile.email
      .trim()
      .toLowerCase();

    let account = users.find((savedUser) => {
      if (
        !savedUser ||
        typeof savedUser.email !== "string"
      ) {
        return false;
      }

      return (
        savedUser.email.trim().toLowerCase() ===
        normalizedEmail
      );
    });

    if (!account) {
      account = {
        id: profile.sub || Date.now().toString(),

        fullName:
          profile.name ||
          profile.given_name ||
          "Google User",

        email: normalizedEmail,
        phone: "",
        location: "",
        role: "artist",
        recruiterType: null,
        companyName: null,
        tinNumber: null,
        password: "",
        profilePicture: profile.picture || "",
        authenticationProvider: "google",
        createdAt: new Date().toISOString(),
      };

      saveUsers([...users, account]);
    }

    const loggedInUser = createSafeUser(account);

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(loggedInUser),
    );

    setUser(loggedInUser);
  }
  function resetPassword(
  email: string,
  newPassword: string,
) {
  const users = getUsers();

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  const userIndex = users.findIndex(
    (account) =>
      account.email.trim().toLowerCase() ===
      normalizedEmail,
  );

  if (userIndex === -1) {
    throw new Error(
      "No account was found with this email address.",
    );
  }

  if (
    users[userIndex].authenticationProvider ===
    "google"
  ) {
    throw new Error(
      "This account uses Google sign-in. Please continue with Google.",
    );
  }

  const updatedUsers = [...users];

  updatedUsers[userIndex] = {
    ...updatedUsers[userIndex],
    password: newPassword,
  };

  saveUsers(updatedUsers);
}

  function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }

 const value = useMemo(
  () => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    register,
    login,
    loginWithGoogle,
    resetPassword,
    logout,
  }),
  [user, loading],
);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}