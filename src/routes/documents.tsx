import { createFileRoute } from "@tanstack/react-router";
import {
  Bold,
  Check,
  Code2,
  FileText,
  Italic,
  Link2,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell } from "@/components/collabflow/app-shell";
import { Panel } from "@/components/collabflow/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      {
        title: "Documents — CollabFlow",
      },
      {
        name: "description",
        content: "Create and organize project knowledge.",
      },
      {
        property: "og:title",
        content: "Documents — CollabFlow",
      },
      {
        property: "og:description",
        content: "Create and organize project knowledge.",
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

  component: DocumentsPage,
});

function DocumentsPage() {
  const docs = [
    "Getting Started",
    "Project Setup",
    "API Documentation",
    "Deployment",
    "Development Guidelines",
  ];

  return (
    <AppShell>
      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside>
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold">
              Project Documentation
            </h2>

            <Button
              aria-label="New document"
              size="icon"
              variant="ghost"
            >
              <Plus />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search documents"
              className="pl-9"
            />
          </div>

          {/* Documents */}
          <nav className="mt-3 space-y-1">
            {docs.map((document, index) => (
              <button
                key={document}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
                  index === 1
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card"
                )}
              >
                <FileText className="size-4" />
                {document}
              </button>
            ))}
          </nav>
        </aside>

        {/* Document */}
        <Panel className="min-h-180 p-5 sm:p-10">
          <div className="mx-auto max-w-3xl">
            {/* Document header */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Last edited by Priya · 12 minutes ago
              </p>

              <Button variant="outline">
                Edit
              </Button>
            </div>

            <h1 className="mt-8 font-display text-4xl font-bold">
              Project Setup
            </h1>

            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Follow this guide to configure your local
              environment and start contributing to CollabFlow.
            </p>

            {/* Formatting toolbar */}
            <div className="my-8 flex gap-1 rounded-lg border bg-muted/50 p-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Bold"
              >
                <Bold />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Italic"
              >
                <Italic />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Insert link"
              >
                <Link2 />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Code"
              >
                <Code2 />
              </Button>
            </div>

            {/* Prerequisites */}
            <h2 className="font-display text-2xl font-semibold">
              Prerequisites
            </h2>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Node.js 20 or newer</li>
              <li>A workspace invitation</li>
              <li>Access to the team repository</li>
            </ul>

            {/* Installation */}
            <h2 className="mt-8 font-display text-2xl font-semibold">
              Installation
            </h2>

            <pre className="mt-4 overflow-x-auto rounded-lg bg-foreground p-4 font-mono text-sm text-background">
              <code>{`git clone collabflow/app
bun install
bun run dev`}</code>
            </pre>

            {/* Checklist */}
            <h2 className="mt-8 font-display text-2xl font-semibold">
              Checklist
            </h2>

            <div className="mt-4 space-y-3">
              {[
                "Environment variables added",
                "Development server running",
                "Test suite passing",
              ].map((item, index) => (
                <label
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <span
                    className={cn(
                      "grid size-5 place-items-center rounded border",
                      index < 2 &&
                        "border-success bg-success text-primary-foreground"
                    )}
                  >
                    {index < 2 && (
                      <Check className="size-3" />
                    )}
                  </span>

                  {item}
                </label>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}