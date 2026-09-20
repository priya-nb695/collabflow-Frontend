import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CircleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/collabflow/app-shell";
import { PageHeader, Panel } from "@/components/collabflow/primitives";

export const Route = createFileRoute("/states")({
  head: () => ({
    meta: [
      { title: "Interface States — CollabFlow" },
      {
        name: "description",
        content: "Loading, empty, and error interface states.",
      },
      { property: "og:title", content: "Interface States — CollabFlow" },
      {
        property: "og:description",
        content: "Loading, empty, and error interface states.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: StatesPage,
});

function StatesPage() {
  const [loading, setLoading] = useState(true);

  return (
    <AppShell>
      <PageHeader
        title="Interface states"
        description="Resilient patterns for every stage of the workflow."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel className="p-5">
          <h2 className="font-semibold">Loading</h2>

          {loading ? (
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((x) => (
                <div
                  key={x}
                  className="h-12 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-success">
              Content loaded successfully.
            </p>
          )}

          <Button
            className="mt-4"
            variant="outline"
            onClick={() => setLoading(!loading)}
          >
            Toggle state
          </Button>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-semibold">Error</h2>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-4">
            <CircleAlert className="size-5 text-destructive" />

            <div>
              <p className="text-sm font-medium">
                Couldn’t load project activity
              </p>

              <p className="text-xs text-muted-foreground">
                Check your connection and try again.
              </p>

              <Button className="mt-3" size="sm" variant="outline">
                Try again
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}