import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      {
        title: "Choose a new password — CollabFlow",
      },
      {
        name: "description",
        content: "Set a new password for your CollabFlow account.",
      },
      {
        property: "og:title",
        content: "Choose a new password — CollabFlow",
      },
      {
        property: "og:description",
        content: "Set a new password for your CollabFlow account.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
    ],
  }),

  component: ResetPassword,
});

function ResetPassword() {
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

        <form
          className="surface rounded-2xl p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-display text-2xl font-bold">
            Choose a new password
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Use at least eight characters with a mix of letters and numbers.
          </p>

          <label className="mt-6 block text-sm font-medium">
            New password
            <Input
              required
              className="mt-2"
              type="password"
            />
          </label>

          <label className="mt-4 block text-sm font-medium">
            Confirm password
            <Input
              required
              className="mt-2"
              type="password"
            />
          </label>

          <Button
            className="mt-6 w-full"
            size="lg"
          >
            Update password
          </Button>
        </form>
      </div>
    </main>
  );
}