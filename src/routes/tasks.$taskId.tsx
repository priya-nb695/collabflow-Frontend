import { useState } from "react";
import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import {
  Check,
  MessageSquare,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AppShell } from "@/components/collabflow/app-shell";
import {
  Avatar,
  Badge,
  PageHeader,
  Panel,
} from "@/components/collabflow/primitives";
import { tasks } from "@/components/collabflow/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tasks/$taskId")({
  head: () => ({
    meta: [
      {
        title: "Create Login Page — CollabFlow",
      },
      {
        name: "description",
        content:
          "Task details, comments, files, and activity.",
      },
      {
        property: "og:title",
        content: "Create Login Page — CollabFlow",
      },
      {
        property: "og:description",
        content:
          "Task details, comments, files, and activity.",
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

  component: TaskPage,
});

function TaskPage() {
  const task = tasks[0] ?? null;

  return (
    <AppShell>
      <PageHeader
        title="Create Login Page"
        description="Website Redesign · CF-128"
      />

      <div className="mt-6">
        <TaskDialog
          task={task}
          onClose={() => {}}
        />
      </div>

      <Panel className="mt-4 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Task details opened in a focused panel.
        </p>

  <Button
  className="mt-4"
  asChild
>
    {/* it was supposed be /projectId/board */}
  <Link
    to="/projects/$projectId"
    params={{
      projectId: "website-redesign",
    }}
  >
    Back to board
  </Link>
</Button>
      </Panel>
    </AppShell>
  );
}

function TaskDialog({
  task,
  onClose,
}: {
  task: (typeof tasks)[number] | null;
  onClose: () => void;
}) {
  const [comment, setComment] = useState("");

  if (!task) {
    return (
      <Panel className="p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Task not found.
        </p>
      </Panel>
    );
  }

  const addComment = () => {
    if (!comment.trim()) {
      return;
    }

    toast.success("Comment added");
    setComment("");
  };

  return (
    <Panel className="overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between border-b p-5">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase text-muted-foreground">
            Task
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold">
            {task.title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {task.project}
          </p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          aria-label="Close task"
          onClick={onClose}
        >
          <X />
        </Button>
      </div>

      {/* Task information */}
      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_280px]">
        <div>
          <h3 className="font-display text-base font-semibold">
            Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Create the responsive login page for the Website
            Redesign project. The page should support email
            authentication, password reset, and validation states.
          </p>

          {/* Checklist */}
          <h3 className="mt-6 font-display text-base font-semibold">
            Checklist
          </h3>

          <div className="mt-3 space-y-3">
            {[
              "Create responsive layout",
              "Add form validation",
              "Connect authentication API",
              "Test mobile layout",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm"
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

                <span
                  className={
                    index < 2
                      ? "text-muted-foreground line-through"
                      : ""
                  }
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Comments */}
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4" />

              <h3 className="font-display text-base font-semibold">
                Comments
              </h3>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <Avatar
                  name="John"
                  size="sm"
                />

                <div>
                  <p className="text-sm font-medium">
                    John
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    The mobile layout is looking good. I'll
                    check the API integration next.
                  </p>

                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    24 minutes ago
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar
                  name="Emma"
                  size="sm"
                />

                <div>
                  <p className="text-sm font-medium">
                    Emma
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Validation states have been added to the
                    design.
                  </p>

                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    1 hour ago
                  </span>
                </div>
              </div>
            </div>

            {/* Add comment */}
            <div className="mt-5 flex gap-2">
              <Textarea
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                placeholder="Write a comment..."
                className="min-h-20"
              />

              <Button
                size="icon"
                className="shrink-0"
                aria-label="Send comment"
                onClick={addComment}
              >
                <Send />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              Status
            </p>

            <Badge
              tone={
                task.status === "Done"
                  ? "success"
                  : task.status === "Review"
                    ? "warning"
                    : "primary"
              }
            >
              {task.status}
            </Badge>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              Priority
            </p>

            <p className="mt-1 text-sm font-medium">
              {task.priority}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              Assignee
            </p>

            <div className="mt-2 flex items-center gap-2">
              <Avatar
                name={task.assignee}
                size="sm"
              />

              <span className="text-sm font-medium">
                {task.assignee}
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              Due date
            </p>

            <p className="mt-1 text-sm">
              {task.due}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              Project
            </p>

            <p className="mt-1 text-sm">
              {task.project}
            </p>
          </div>

          {/* Files */}
          <div>
            <div className="flex items-center gap-2">
              <Paperclip className="size-4" />

              <p className="font-mono text-[10px] uppercase text-muted-foreground">
                Files
              </p>
            </div>

            <div className="mt-2 rounded-lg border p-3">
              <p className="text-xs font-medium">
                login-page.fig
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground">
                Uploaded by Emma
              </p>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}