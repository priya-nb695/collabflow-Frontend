import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { AppShell } from "@/components/collabflow/app-shell";
import {
  Avatar,
  Panel,
} from "@/components/collabflow/primitives";
import { tasks } from "@/components/collabflow/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects/$projectId/")({
  head: () => ({
    meta: [
      {
        title: "Website Redesign — CollabFlow",
      },
      {
        name: "description",
        content:
          "Project overview, milestones, team, and tasks.",
      },
      {
        property: "og:title",
        content: "Website Redesign — CollabFlow",
      },
      {
        property: "og:description",
        content:
          "Project overview, milestones, team, and tasks.",
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

  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  return (
    <AppShell>
      <ProjectTop active="Overview" />

      {/* Project overview */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel className="p-5 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">
            Project summary
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The redesign brings the product story, customer proof,
            and conversion flow into one clear experience. The team
            is finalizing responsive pages and API integrations.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Metric
              label="Progress"
              value="72%"
            />

            <Metric
              label="Tasks"
              value="28"
            />

            <Metric
              label="Days left"
              value="18"
            />
          </div>
        </Panel>

        {/* Milestones */}
        <Panel>
          <SectionHead title="Milestones" />

          <div className="space-y-4 p-5">
            {[
              "Design system",
              "Core pages",
              "QA & launch",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  className={cn(
                    "size-4",
                    index === 0
                      ? "text-success"
                      : "text-muted-foreground"
                  )}
                />

                <span className="text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Upcoming tasks */}
      <Panel className="mt-4">
        <SectionHead title="Upcoming tasks" />

        <div>
          {tasks.slice(0, 3).map((task) => (
            <div
              key={task.title}
              className="flex items-center gap-3 border-b p-4 last:border-0"
            >
              <Avatar
                name={task.assignee}
                size="sm"
              />

              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {task.title}
              </span>

              <Priority value={task.priority} />

              <span className="text-xs text-muted-foreground">
                {task.due}
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </AppShell>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-muted/60 p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-display text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

function SectionHead({
  title,
}: {
  title: string;
}) {
  return (
    <div className="border-b px-5 py-3">
      <h2 className="font-display text-sm font-semibold">
        {title}
      </h2>
    </div>
  );
}

function Priority({
  value,
}: {
  value: string;
}) {
  return (
    <span
      className={cn(
        "text-xs font-medium",
        value === "High"
          ? "text-destructive"
          : value === "Medium"
            ? "text-warning"
            : "text-muted-foreground"
      )}
    >
      {value}
    </span>
  );
}

function ProjectTop({
  active,
}: {
  active: string;
}) {
  return (
    <div className="border-b pb-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">
            Project
          </p>

          <h1 className="mt-1 font-display text-2xl font-bold">
            Website Redesign
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Redesign the product experience and improve conversion.
          </p>
        </div>

        <div className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          In Progress
        </div>
      </div>

      <div className="mt-5 flex gap-6">
        {[
          "Overview",
          "Tasks",
          "Files",
          "Team",
        ].map((tab) => (
          <span
            key={tab}
            className={cn(
              "border-b-2 pb-2 text-sm",
              tab === active
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground"
            )}
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}