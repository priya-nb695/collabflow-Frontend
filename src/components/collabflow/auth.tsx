import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth, ApiError } from "@/lib/auth-context";

export function AuthPage({
  mode,
}: {
  mode: "login" | "register" | "forgot" | "reset";
}) {
  const navigate = useNavigate();
  const { login, register, forgotPassword, resetPassword } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Reset/invite token from the URL.
  // Example: /reset-password?token=...
  const inviteToken =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("token") ?? undefined
      : undefined;

  const title =
    mode === "login"
      ? "Welcome back"
      : mode === "register"
        ? "Create your account"
        : mode === "forgot"
          ? "Reset your password"
          : "Choose a new password";

  const subtitle =
    mode === "login"
      ? "Sign in to continue to your workspace."
      : mode === "register"
        ? "Start collaborating with your team today."
        : mode === "reset"
          ? "Choose a new password for your account."
          : "We’ll send a secure reset link to your inbox.";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setFormError(null);
    setFieldErrors({});

    if (
      (mode === "register" || mode === "reset") &&
      password !== confirm
    ) {
      setFieldErrors({
        confirm: "Passwords don't match",
      });
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        navigate({ to: "/dashboard" });
      } else if (mode === "register") {
        await register(name, email, password, inviteToken);
        navigate({ to: "/dashboard" });
      } else if (mode === "reset") {
        if (!inviteToken) {
          setFormError("This reset link is invalid or expired.");
          return;
        }

        await resetPassword(inviteToken, password);
        navigate({ to: "/login" });
      } else {
        await forgotPassword(email);
        setSent(true);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.fields) {
          setFieldErrors(err.fields);
        } else {
          setFormError(err.message);
        }
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mx-auto mb-8 flex w-fit items-center gap-2 font-display text-lg font-bold"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
            C
          </span>
          CollabFlow
        </Link>

        <div className="surface rounded-2xl p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold">
            {sent ? "Check your inbox" : title}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {sent
              ? "If an account exists for that email, a reset link is on its way."
              : subtitle}
          </p>

          {inviteToken && mode === "register" && (
            <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary">
              You're joining via a team invite.
            </p>
          )}

          {formError && (
            <p
              role="alert"
              className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {formError}
            </p>
          )}

          {!sent && (
            <form className="mt-7 space-y-4" onSubmit={onSubmit}>
              {mode === "register" && (
                <AuthField
                  label="Full name"
                  type="text"
                  placeholder="Priya Nair"
                  value={name}
                  onChange={setName}
                  error={fieldErrors["name"]}
                  autoComplete="name"
                />
              )}

              {mode !== "reset" && (
                <AuthField
                  label="Email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={setEmail}
                  error={fieldErrors["email"]}
                  autoComplete="email"
                />
              )}

              {mode !== "forgot" && (
                <>
                  <AuthField
                    label="Password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={setPassword}
                    error={fieldErrors["password"]}
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                  />

                  {(mode === "register" || mode === "reset") && (
                    <AuthField
                      label="Confirm password"
                      type="password"
                      placeholder="Repeat your password"
                      value={confirm}
                      onChange={setConfirm}
                      error={fieldErrors["confirm"]}
                      autoComplete="new-password"
                    />
                  )}
                </>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <Checkbox />
                    Remember me
                  </label>

                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait…"
                  : mode === "login"
                    ? "Log in"
                    : mode === "register"
                      ? "Create Account"
                      : mode === "reset"
                        ? "Reset password"
                        : "Send reset link"}
              </Button>
            </form>
          )}

          {mode === "login" && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary"
              >
                Sign up
              </Link>
            </p>
          )}

          {mode === "register" && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary"
              >
                Log in
              </Link>
            </p>
          )}

          {(sent || mode === "reset") && (
            <Button
              variant="outline"
              className="mt-6 w-full"
              asChild
            >
              <Link to="/login">Back to login</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

function AuthField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  autoComplete?: string | undefined;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}

      <Input
        required
        className="mt-2"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={!!error}
      />

      {error && (
        <span className="mt-1 block text-xs font-normal text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
