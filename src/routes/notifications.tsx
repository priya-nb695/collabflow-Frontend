import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/collabflow/app-shell";
import {
  PageHeader,
  Panel,
} from "@/components/collabflow/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      {
        title: "Notifications — CollabFlow",
      },
      {
        name: "description",
        content:
          "Workspace assignments, mentions, and updates.",
      },
      {
        property: "og:title",
        content: "Notifications — CollabFlow",
      },
      {
        property: "og:description",
        content:
          "Workspace assignments, mentions, and updates.",
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

  component: NotificationsPage,
});

function NotificationsPage() {
  const [read, setRead] = useState(false);

  const notifications = [
    [
      "Rahul assigned you ‘Create Login Page’",
      "Assignment",
      "5 min",
    ],
    [
      "John commented on ‘Dashboard UI’",
      "Comment",
      "24 min",
    ],
    [
      "Emma completed ‘Authentication’",
      "Completed",
      "1 hour",
    ],
    [
      "Rahul uploaded a new file",
      "File",
      "3 hours",
    ],
  ];

  const markAllAsRead = () => {
    setRead(true);
    toast.success("All caught up");
  };

  return (
    <AppShell>
      <PageHeader
        title="Notifications"
        description="Stay up to date with activity across your workspace."
        action={
          <Button
            variant="outline"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        }
      />

      <Panel className="mt-6 overflow-hidden">
        {notifications.map(([title, kind, time], index) => (
          <div
            key={title}
            className="flex items-start gap-4 border-b p-4 last:border-0"
          >
            {/* Notification icon */}
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-lg",
                read || index > 1
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              <Bell className="size-4" />
            </span>

            {/* Notification content */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                {title}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {kind} · {time} ago
              </p>
            </div>

            {/* Unread indicator */}
            {!read && index < 2 && (
              <button
                type="button"
                aria-label="Mark as read"
                className="size-2 rounded-full bg-primary"
                onClick={() => {
                  toast.success("Marked as read");
                }}
              />
            )}
          </div>
        ))}
      </Panel>
    </AppShell>
  );
}