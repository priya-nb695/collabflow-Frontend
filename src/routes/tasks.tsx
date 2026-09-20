import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/collabflow/app-shell";
import {
  Badge,
  PageHeader,
  Panel,
} from "@/components/collabflow/primitives";
import { tasks } from "@/components/collabflow/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      {
        title: "My Tasks — CollabFlow",
      },
      {
        name: "description",
        content: "Review all tasks assigned to you.",
      },
      {
        property: "og:title",
        content: "My Tasks — CollabFlow",
      },
      {
        property: "og:description",
        content: "Review all tasks assigned to you.",
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

  component: TasksPage,
});

function TasksPage() {
  return (
    <AppShell>
      <PageHeader
        title="My Tasks"
        description="Everything assigned to you across the workspace."
        action={
          <Button>
            <Plus />
            Add task
          </Button>
        }
      />

      <Panel className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-180">
            {/* Table header */}
            <div className="grid grid-cols-[1.5fr_1fr_.8fr_.7fr] gap-3 border-b px-4 py-3 font-mono text-[10px] uppercase text-muted-foreground">
              <span>Task</span>
              <span>Project</span>
              <span>Status</span>
              <span>Priority</span>
            </div>

            {/* Tasks */}
            {tasks.map((task) => (
              <Link
                key={task.title}
                to="/tasks/$taskId"
                params={{
                  taskId: "create-login-page",
                }}
                className="grid grid-cols-[1.5fr_1fr_.8fr_.7fr] items-center gap-3 border-b p-4 last:border-0 hover:bg-card/80"
              >
                <div className="flex items-center gap-3">
                  <span className="size-4 rounded-full border-2 border-border" />

                  <span className="font-medium">
                    {task.title}
                  </span>
                </div>

                <span className="text-sm text-muted-foreground">
                  {task.project}
                </span>

                <Status value={task.status} />

                <Priority value={task.priority} />
              </Link>
            ))}
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}

function Status({
  value,
}: {
  value: string;
}) {
  return (
    <Badge
      tone={
        value === "Done"
          ? "success"
          : value === "Review"
            ? "warning"
            : "neutral"
      }
    >
      {value}
    </Badge>
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