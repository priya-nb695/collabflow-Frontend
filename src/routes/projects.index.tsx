import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Filter,
  Grid2X2,
  List,
  Plus,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/collabflow/app-shell";
import {
  EmptyState,
  PageHeader,
  Panel,
} from "@/components/collabflow/primitives";
import { projects } from "@/components/collabflow/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — CollabFlow" },
      {
        name: "description",
        content: "Browse and manage team projects.",
      },
      {
        property: "og:title",
        content: "Projects — CollabFlow",
      },
      {
        property: "og:description",
        content: "Browse and manage team projects.",
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

  component: ProjectsPage,
});

function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <AppShell>
      <PageHeader
        title="Projects"
        description="Plan, track, and ship work across your workspace."
        action={
          <Button onClick={() => toast.success("New project created")}>
            <Plus />
            New Project
          </Button>
        }
      />

      {/* Toolbar */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter />
            Filter
          </Button>

          <Button
            variant="ghost"
            onClick={() => setShowEmpty(!showEmpty)}
          >
            {showEmpty
              ? "Show projects"
              : "Preview empty state"}
          </Button>
        </div>

        {/* View switcher */}
        <div className="flex rounded-lg border bg-card p-1">
          <Button
            aria-label="Grid view"
            size="icon"
            variant={view === "grid" ? "secondary" : "ghost"}
            onClick={() => setView("grid")}
          >
            <Grid2X2 />
          </Button>

          <Button
            aria-label="List view"
            size="icon"
            variant={view === "list" ? "secondary" : "ghost"}
            onClick={() => setView("list")}
          >
            <List />
          </Button>
        </div>
      </div>

      {/* Projects */}
      {showEmpty ? (
        <div className="mt-6">
          <EmptyState
            action={
              <Button>
                <Plus />
                Create Project
              </Button>
            }
          />
        </div>
      ) : (
        <div
          className={cn(
            "mt-6 grid gap-4",
            view === "grid"
              ? "md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          )}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <Panel className="p-5 transition hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold">
            {project.name}
          </h3>

          <p className="mt-1 text-xs text-muted-foreground">
            {project.description}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[10px] font-medium">
          {project.status}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase text-muted-foreground">
            Progress
          </span>

          <span className="text-xs font-medium">
            {project.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Project status</span>
        <span>{project.status}</span>
      </div>
    </Panel>
  );
}