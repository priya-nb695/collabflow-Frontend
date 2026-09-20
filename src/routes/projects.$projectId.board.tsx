import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import {
  FileText,
  Filter,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

import { AppShell } from "../../src/components/collabflow/app-shell";
import {
  Avatar,
  Badge,
  EmptyState,
  PageHeader,
  Panel,
} from "../../src/components/collabflow/primitives";

import {
  members,
  projects,
  tasks,
} from "../../src/components/collabflow/data";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function SectionHead({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-4">
      <h2 className="font-display font-semibold">
        {title}
      </h2>

      {action}
    </div>
  );
}

function Status({ value }: { value: string }) {
  const tone =
    value === "Done" || value === "On track"
      ? "success"
      : value === "Review" || value === "At risk"
        ? "warning"
        : value === "In Progress"
          ? "primary"
          : "neutral";

  return (
    <Badge tone={tone}>
      {value}
    </Badge>
  );
}

function Priority({ value }: { value: string }) {
  const tone =
    value === "High"
      ? "danger"
      : value === "Medium"
        ? "warning"
        : "neutral";

  return (
    <Badge tone={tone}>
      {value}
    </Badge>
  );
}

/* -------------------------------------------------------------------------- */
/* Project Navigation                                                         */
/* -------------------------------------------------------------------------- */

const boardTabs = [
  "Overview",
  "Board",
  "List",
  "Chat",
  "Documents",
  "Files",
  "Activity",
];

function ProjectTop({
  active,
}: {
  active: string;
}) {
  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
        <div>
          <div className="flex min-w-0 items-center gap-3">
            <h1 className="truncate font-display text-3xl font-bold">
              Website Redesign
            </h1>

            <Status value="On track" />
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Refresh the marketing site and improve key
            customer journeys.
          </p>

          <div className="mt-3 flex -space-x-2">
            {[
              "Priya Nair",
              "Rahul Verma",
              "Emma Cole",
            ].map((member) => (
              <Avatar
                key={member}
                name={member}
              />
            ))}
          </div>
        </div>

        <Button variant="outline">
          <Settings />

          <span className="hidden sm:inline">
            Project settings
          </span>
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto border-b">
        <div className="flex min-w-max gap-1">
          {boardTabs.map((tab) => (
            <ProjectTab
              key={tab}
              tab={tab}
              active={active}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectTab({
  tab,
  active,
}: {
  tab: string;
  active: string;
}) {
  const className = cn(
    "border-b-2 px-4 py-3 text-sm font-medium",
    active === tab
      ? "border-primary text-primary"
      : "border-transparent text-muted-foreground"
  );
 {/* it was supposed be /projectId/board */}
  if (tab === "Board") {
    return (
      <Link
       
        to="/projects/$projectId"
        params={{
          projectId: "website-redesign",
        }}
        className={className}
      >
        {tab}
      </Link>
    );
  }

  if (tab === "Chat") {
    return (
      <Link
        to="/messages"
        className={className}
      >
        {tab}
      </Link>
    );
  }

  if (tab === "Documents") {
    return (
      <Link
        to="/documents"
        className={className}
      >
        {tab}
      </Link>
    );
  }

  return (
    <Link
      to="/projects/$projectId"
      params={{
        projectId: "website-redesign",
      }}
      className={className}
    >
      {tab}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Task Dialog                                                                */
/* -------------------------------------------------------------------------- */

function TaskDialog({
  task,
  onClose,
}: {
  task: (typeof tasks)[number] | null;
  onClose: () => void;
}) {
  const [comment, setComment] = useState("");

  return (
    <Dialog
      open={Boolean(task)}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-3xl">
        {task && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                {task.title}
              </DialogTitle>

              <DialogDescription>
                {task.project} · CF-128
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 md:grid-cols-[1fr_220px]">
              {/* Main content */}
              <div>
                <h3 className="text-sm font-semibold">
                  Description
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {task.description}
                </p>

                {/* Attachments */}
                <h3 className="mt-6 text-sm font-semibold">
                  Attachments
                </h3>

                <div className="mt-2 flex items-center gap-3 rounded-lg border p-3">
                  <FileText className="text-primary" />

                  <div>
                    <p className="text-sm font-medium">
                      login-wireframes.fig
                    </p>

                    <p className="text-xs text-muted-foreground">
                      2.4 MB · uploaded yesterday
                    </p>
                  </div>
                </div>

                {/* Comments */}
                <h3 className="mt-6 text-sm font-semibold">
                  Comments
                </h3>

                <Comment name="Rahul Verma">
                  Please make the validation messages more visible.
                </Comment>

                <Comment name="Priya Nair">
                  Done. I've updated them.
                </Comment>

                {/* Add comment */}
                <div className="mt-4 rounded-lg border bg-card p-3">
                  <Textarea
                    value={comment}
                    onChange={(e) =>
                      setComment(e.target.value)
                    }
                    placeholder="Add a comment…"
                    className="min-h-20 border-0 p-0 shadow-none"
                  />

                  <div className="mt-2 flex justify-between">
                    <div className="flex">
                      <Button
                        aria-label="Attach file"
                        size="icon"
                        variant="ghost"
                      >
                        <Paperclip />
                      </Button>

                      <Button
                        aria-label="Mention teammate"
                        size="icon"
                        variant="ghost"
                      >
                        @
                      </Button>
                    </div>

                    <Button
                      disabled={!comment}
                      onClick={() => {
                        toast.success("Comment added");
                        setComment("");
                      }}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Task details */}
              <aside className="space-y-4">
                <Detail label="Status">
                  <Status value={task.status} />
                </Detail>

                <Detail label="Priority">
                  <Priority value={task.priority} />
                </Detail>

                <Detail label="Assignee">
                  <span className="flex items-center gap-2 text-sm">
                    <Avatar
                      name={task.assignee}
                      size="sm"
                    />

                    {task.assignee}
                  </span>
                </Detail>

                <Detail label="Due date">
                  <span className="text-sm">
                    {task.due}
                  </span>
                </Detail>

                <Button
                  variant="outline"
                  className="w-full"
                >
                  Edit task
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-destructive"
                >
                  <Trash2 />
                  Delete task
                </Button>
              </aside>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Small Components                                                           */
/* -------------------------------------------------------------------------- */

function Detail({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">
        {label}
      </p>

      {children}
    </div>
  );
}

function Comment({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 flex gap-3">
      <Avatar
        name={name}
        size="sm"
      />

      <div>
        <p className="text-xs font-semibold">
          {name}{" "}
          <span className="font-normal text-muted-foreground">
            · 1h
          </span>
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {children}
        </p>
      </div>
    </div>
  );
}