import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, ApiError } from "@/lib/auth-context";

// Route this at /reset-password?token=... (the link forgotPassword() emails out).
export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const token = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("token") : null;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) return setError("Passwords don't match");
    if (!token) return setError("This reset link is missing its token.");

    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <div className="w-full max-w-md">
        <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-2 font-display text-lg font-bold">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">C</span>
          CollabFlow
        </Link>
        <div className="surface rounded-2xl p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold">{done ? "Password updated" : "Set a new password"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {done ? "You can now log in with your new password." : "Choose a new password for your account."}
          </p>
          {error && (
            <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          {!done && !token && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              This link is missing its reset token. Request a new one from the forgot-password page.
            </p>
          )}
          {!done && (
            <form className="mt-7 space-y-4" onSubmit={onSubmit}>
              <label className="block text-sm font-medium">
                New password
                <Input
                  required
                  className="mt-2"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
              <label className="block text-sm font-medium">
                Confirm new password
                <Input
                  required
                  className="mt-2"
                  type="password"
                  placeholder="Repeat your new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
              <Button className="w-full" size="lg" type="submit" disabled={loading || !token}>
                {loading ? "Please wait…" : "Update password"}
              </Button>
            </form>
          )}
          {done && (
            <Button className="mt-6 w-full" onClick={() => navigate({ to: "/login" })}>
              Go to login
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}