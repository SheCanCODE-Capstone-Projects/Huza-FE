import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

interface LoginLocationState {
  success?: string;
  email?: string;
}

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const locationState =
    location.state as LoginLocationState | null;

  const [formData, setFormData] =
    useState<LoginFormData>({
      email: locationState?.email || "",
      password: "",
      rememberMe: false,
    });

  const [errors, setErrors] =
    useState<LoginErrors>({});

  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!locationState?.success) {
      return;
    }

    const timer = window.setTimeout(() => {
      navigate(location.pathname, {
        replace: true,
        state: {
          email: locationState.email,
        },
      });
    }, 6000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    location.pathname,
    locationState?.email,
    locationState?.success,
    navigate,
  ]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value, type, checked } =
      event.target;

    setFormData((current) => ({
      ...current,
      [name]:
        type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setServerError("");
  }

  function validate(): LoginErrors {
    const newErrors: LoginErrors = {};

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !emailPattern.test(formData.email.trim())
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    }

    return newErrors;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setServerError("");

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});

      login(
        formData.email.trim().toLowerCase(),
        formData.password,
      );

      // After successful login, redirect to dashboard.
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleForgotPassword() {
    /*
      Later, when the forgot-password page exists,
      remove the alert and uncomment this line:

      navigate("/forgot-password");
    */

    alert(
      "Forgot password will be available soon.",
    );
  }

  function handleResetPassword() {
    /*
      Later, when the reset-password page exists,
      remove the alert and uncomment this line:

      navigate("/reset-password");
    */

    alert(
      "Reset password will be available soon.",
    );
  }

  function handleGoogleLogin() {
    /*
      Add the real Google authentication logic here later.
    */

    alert(
      "Google sign-in will be available soon.",
    );
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to continue to your Ihuriro account."
    >
      {locationState?.success && (
        <div
          role="status"
          className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
        >
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0 text-green-700"
          />

          <span>{locationState.success}</span>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        <FormInput
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          error={errors.email}
          autoComplete="email"
        />

        <FormInput
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          autoComplete="current-password"
          rightElement={
            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (current) => !current,
                )
              }
              className="rounded-lg p-1 text-gray-500 transition hover:text-green-800"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          }
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 accent-green-800"
            />

            <span>Remember me</span>
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-semibold text-green-800 transition hover:text-green-950"
            >
              Forgot password?
            </button>

            <span className="text-gray-300">|</span>

            <button
              type="button"
              onClick={handleResetPassword}
              className="text-sm font-semibold text-green-800 transition hover:text-green-950"
            >
              Reset password
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs font-semibold text-gray-500">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 font-semibold text-gray-700 transition hover:border-green-600 hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-100"
      >
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-gray-600">
        Do not have an account?{" "}
        <Link
          to="/register"
          className="font-bold text-green-800 transition hover:text-green-950"
        >
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;