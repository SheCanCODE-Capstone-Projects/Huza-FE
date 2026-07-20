import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

interface ResetFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetErrors {
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const initialFormData: ResetFormData = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};

function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [formData, setFormData] =
    useState<ResetFormData>(initialFormData);

  const [errors, setErrors] =
    useState<ResetErrors>({});

  const [serverError, setServerError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setServerError("");
    setSuccessMessage("");
  }

  function validate(): ResetErrors {
    const newErrors: ResetErrors = {};

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

    if (!formData.newPassword) {
      newErrors.newPassword =
        "New password is required.";
    } else if (
      formData.newPassword.length < 8
    ) {
      newErrors.newPassword =
        "Password must contain at least 8 characters.";
    } else if (
      !/[A-Z]/.test(formData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must contain an uppercase letter.";
    } else if (
      !/[a-z]/.test(formData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must contain a lowercase letter.";
    } else if (
      !/[0-9]/.test(formData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must contain a number.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your new password.";
    } else if (
      formData.confirmPassword !==
      formData.newPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    return newErrors;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setServerError("");
    setSuccessMessage("");

    const validationErrors = validate();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);

      resetPassword(
        formData.email,
        formData.newPassword,
      );

      setSuccessMessage(
        "Password reset successfully. Redirecting you to login...",
      );

      window.setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            success:
              "Your password was reset successfully. Please sign in.",
            email: formData.email
              .trim()
              .toLowerCase(),
          },
        });
      }, 1500);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Password reset failed.",
      );

      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your registered email address and create a new password."
    >
      {serverError && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {serverError}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
        >
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0"
          />

          <span>{successMessage}</span>
        </div>
      )}

      <div className="mb-6 flex justify-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-green-100 text-green-800">
          <KeyRound size={27} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        <FormInput
          label="Registered email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          error={errors.email}
          autoComplete="email"
        />

        <FormInput
          label="New password"
          name="newPassword"
          type={
            showPassword ? "text" : "password"
          }
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter your new password"
          error={errors.newPassword}
          autoComplete="new-password"
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

        <FormInput
          label="Confirm new password"
          name="confirmPassword"
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Enter your new password again"
          error={errors.confirmPassword}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  (current) => !current,
                )
              }
              className="rounded-lg p-1 text-gray-500 transition hover:text-green-800"
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          }
        />

        <button
          type="submit"
          disabled={
            submitting ||
            Boolean(successMessage)
          }
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              {successMessage
                ? "Redirecting..."
                : "Resetting password..."}
            </>
          ) : (
            "Reset password"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-bold text-green-800 hover:text-green-950"
        >
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default ResetPassword;