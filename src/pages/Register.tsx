import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  MapPin,
  Palette,
  UserRound,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";

import type {
  RecruiterType,
  UserRole,
} from "../types/auth";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  recruiterType: RecruiterType;
  companyName: string;
  tinNumber: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  role: "artist",
  recruiterType: "individual",
  companyName: "",
  tinNumber: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value, type, checked } = event.target;

    const fieldName = name as keyof FormData;

    setFormData((current) => ({
      ...current,
      [fieldName]:
        type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [fieldName]: "",
    }));

    setServerError("");
    setSuccessMessage("");
  }

  function handleRoleChange(role: UserRole) {
    setFormData((current) => ({
      ...current,
      role,
      recruiterType:
        role === "recruiter"
          ? current.recruiterType
          : "individual",
      companyName:
        role === "recruiter"
          ? current.companyName
          : "",
      tinNumber:
        role === "recruiter"
          ? current.tinNumber
          : "",
    }));

    setErrors({});
    setServerError("");
  }

  function handleRecruiterTypeChange(
    recruiterType: RecruiterType,
  ) {
    setFormData((current) => ({
      ...current,
      recruiterType,
      companyName:
        recruiterType === "company"
          ? current.companyName
          : "",
      tinNumber:
        recruiterType === "company"
          ? current.tinNumber
          : "",
    }));

    setErrors((current) => ({
      ...current,
      companyName: "",
      tinNumber: "",
    }));

    setServerError("");
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern =
      /^(\+250|250|0)?7[2389]\d{7}$/;

    const tinPattern = /^\d{9}$/;

    const cleanedPhone = formData.phone.replace(
      /\s/g,
      "",
    );

    const cleanedTin = formData.tinNumber.replace(
      /\s/g,
      "",
    );

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName =
        "Full name must contain at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !emailPattern.test(formData.email.trim())
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Rwandan phone number is required.";
    } else if (!phonePattern.test(cleanedPhone)) {
      newErrors.phone =
        "Enter a valid Rwandan phone number.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    } else if (formData.location.trim().length < 2) {
      newErrors.location =
        "Enter a valid location.";
    }

    if (
      formData.role === "recruiter" &&
      formData.recruiterType === "company"
    ) {
      if (!formData.companyName.trim()) {
        newErrors.companyName =
          "Company name is required.";
      } else if (
        formData.companyName.trim().length < 2
      ) {
        newErrors.companyName =
          "Enter a valid company name.";
      }

      if (!formData.tinNumber.trim()) {
        newErrors.tinNumber =
          "TIN number is required.";
      } else if (!tinPattern.test(cleanedTin)) {
        newErrors.tinNumber =
          "TIN number must contain exactly 9 digits.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain an uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain a lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain a number.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.confirmPassword !== formData.password
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms =
        "You must accept the Terms and Privacy Policy.";
    }

    return newErrors;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setServerError("");
    setSuccessMessage("");

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setSubmitting(true);
      setErrors({});

      register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        role: formData.role,

        recruiterType:
          formData.role === "recruiter"
            ? formData.recruiterType
            : null,

        companyName:
          formData.role === "recruiter" &&
          formData.recruiterType === "company"
            ? formData.companyName
            : null,

        tinNumber:
          formData.role === "recruiter" &&
          formData.recruiterType === "company"
            ? formData.tinNumber
            : null,

        password: formData.password,
      });

      const normalizedEmail = formData.email
        .trim()
        .toLowerCase();

      setSuccessMessage(
        "Account created successfully! Redirecting you to the login page...",
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            success:
              "Account created successfully. Please sign in.",
            email: normalizedEmail,
          },
        });
      }, 1500);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );

      setSubmitting(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      description="Join Ihuriro and connect creative talent with opportunities."
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
            className="mt-0.5 shrink-0 text-green-700"
          />

          <span>{successMessage}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold text-text-primary">
            I want to join as
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <SelectionCard
              title="Artist"
              description="Showcase your work and find opportunities."
              icon={<Palette size={21} />}
              selected={formData.role === "artist"}
              onClick={() =>
                handleRoleChange("artist")
              }
            />

            <SelectionCard
              title="Recruiter"
              description="Post jobs and hire creative talent."
              icon={<BriefcaseBusiness size={21} />}
              selected={
                formData.role === "recruiter"
              }
              onClick={() =>
                handleRoleChange("recruiter")
              }
            />
          </div>
        </div>

        {formData.role === "recruiter" && (
          <div className="space-y-4 rounded-2xl border border-green-100 bg-green-50/40 p-4 sm:p-5">
            <div>
              <h2 className="font-bold text-text-primary">
                Recruiter type
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Choose whether you are recruiting
                independently or representing a company.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <SelectionCard
                title="Individual recruiter"
                description="Register using your Rwandan phone number."
                icon={<UserRound size={21} />}
                selected={
                  formData.recruiterType ===
                  "individual"
                }
                onClick={() =>
                  handleRecruiterTypeChange("individual")
                }
              />

              <SelectionCard
                title="Company recruiter"
                description="Register using company details and TIN."
                icon={<Building2 size={21} />}
                selected={
                  formData.recruiterType === "company"
                }
                onClick={() =>
                  handleRecruiterTypeChange("company")
                }
              />
            </div>

            {formData.recruiterType ===
              "company" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  label="Company name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Example Company Ltd"
                  error={errors.companyName}
                  autoComplete="organization"
                />

                <FormInput
                  label="TIN number"
                  name="tinNumber"
                  value={formData.tinNumber}
                  onChange={handleChange}
                  placeholder="Enter 9-digit TIN"
                  error={errors.tinNumber}
                  autoComplete="off"
                />
              </div>
            )}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.fullName}
            autoComplete="name"
          />

          <FormInput
            label="Rwandan phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+250 7XX XXX XXX"
            error={errors.phone}
            autoComplete="tel"
          />
        </div>

        <FormInput
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Example: Kigali, Rwanda"
          error={errors.location}
          autoComplete="address-level2"
          rightElement={
            <MapPin
              size={18}
              className="text-green-700"
            />
          }
        />

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
          placeholder="At least 8 characters"
          error={errors.password}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
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
          label="Confirm password"
          name="confirmPassword"
          type={
            showConfirmPassword ? "text" : "password"
          }
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Enter your password again"
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

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-text-secondary">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 shrink-0 accent-green-800"
            />

            <span>
              I agree to the{" "}
              <button
                type="button"
                className="font-semibold text-green-800 hover:text-green-950"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="font-semibold text-green-800 hover:text-green-950"
              >
                Privacy Policy
              </button>
              .
            </span>
          </label>

          {errors.acceptTerms && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {errors.acceptTerms}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={
            !formData.acceptTerms ||
            submitting ||
            Boolean(successMessage)
          }
          className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-200 ${
            formData.acceptTerms
              ? "bg-green-700 hover:bg-green-500"
              : "cursor-not-allowed bg-green-800"
          } disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {submitting ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
              />

              {successMessage
                ? "Redirecting..."
                : "Creating account..."}
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-green-800 hover:text-green-950"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

interface SelectionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}

function SelectionCard({
  title,
  description,
  icon,
  selected,
  onClick,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition duration-200 ${
        selected
          ? "border-green-700 bg-green-50 ring-2 ring-green-100"
          : "border-gray-200 bg-white hover:border-green-500"
      }`}
    >
      <div
        className={`grid h-10 w-10 place-items-center rounded-xl ${
          selected
            ? "bg-green-800 text-green-500"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>

      <p className="mt-3 font-bold text-gray-900">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-gray-600">
        {description}
      </p>
    </button>
  );
}

export default Register;