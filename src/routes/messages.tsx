import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Hash, Paperclip, Send, Smile, Users } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { AppShell } from "@/components/collabflow/app-shell";
import { Avatar } from "@/components/collabflow/primitives";
import { members } from "@/components/collabflow/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      {
        title: "Messages — CollabFlow",
      },
      {
        name: "description",
        content:
          "Real-time project conversations and channels.",
      },
      {
        property: "og:title",
        content: "Messages — CollabFlow",
      },
      {
        property: "og:description",
        content:
          "Real-time project conversations and channels.",
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

  component: MessagesPage,
});

function MessagesPage() {
  const [message, setMessage] = useState("");

  const channelList = [
    "general",
    "development",
    "design",
    "announcements",
  ];

  return (
    <AppShell>
      <div className="-m-4 grid min-h-[calc(100vh-65px)] grid-cols-1 overflow-hidden border-t sm:-m-6 lg:-m-8 lg:grid-cols-[220px_1fr_240px]">

        {/* Channels Sidebar */}
        <aside className="hidden border-r bg-card/50 p-4 lg:block">
          <h2 className="font-display font-semibold">
            Channels
          </h2>

          <div className="mt-4 space-y-1">
            {channelList.map((channel, index) => (
              <button
                key={channel}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm",
                  index === 0
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Hash className="size-4" />
                {channel}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Chat */}
        <main className="flex min-h-[calc(100vh-65px)] min-w-0 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-card/50 px-5 py-4">
            <div>
              <h1 className="font-display font-semibold">
                # general
              </h1>

              <p className="text-xs text-muted-foreground">
                Company-wide discussion and updates
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
            >
              <Users />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-6 overflow-y-auto p-5">
            <Message
              name="Rahul Verma"
              time="9:32 AM"
            >
              Morning team — the login flow is ready for
              review. I’ve linked the latest build in the task.
            </Message>

            <Message
              name="Emma Cole"
              time="9:41 AM"
            >
              Looks great. I added two comments around the
              empty and error states.{" "}
              <span className="rounded bg-primary/10 px-1 text-primary">
                @Priya
              </span>
            </Message>

            <Message
              name="Priya Nair"
              time="9:48 AM"
            >
              Thanks! I’ll pick those up before the
              afternoon sync.
            </Message>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex -space-x-2">
                <Avatar
                  name="Rahul"
                  size="sm"
                />

                <Avatar
                  name="Ankit"
                  size="sm"
                />
              </span>

              Rahul is typing…
            </p>
          </div>

          {/* Message Input */}
          <div className="border-t bg-card/60 p-4">
            <div className="rounded-xl border bg-background p-2">
              <Textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Message #general"
                className="min-h-16 resize-none border-0 shadow-none"
              />

              <div className="flex justify-between">
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Smile />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                  >
                    <Paperclip />
                  </Button>
                </div>

                <Button
                  disabled={!message}
                  onClick={() => {
                    toast.success("Message sent");
                    setMessage("");
                  }}
                >
                  <Send />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Members Sidebar */}
        <aside className="hidden border-l bg-card/50 p-4 lg:block">
          <h2 className="font-display font-semibold">
            Members · 8
          </h2>

          <div className="mt-4 space-y-3">
            {members.slice(0, 4).map((member) => (
              <div
                key={member.email}
                className="flex items-center gap-3"
              >
                <Avatar
                  name={member.name}
                  online={member.status === "Active"}
                />

                <div>
                  <p className="text-sm font-medium">
                    {member.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Message({
  name,
  time,
  children,
}: {
  name: string;
  time: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Avatar
        name={name}
        online
      />

      <div className="min-w-0">
        <p className="text-sm font-semibold">
          {name}{" "}
          <span className="font-normal text-muted-foreground">
            {time}
          </span>
        </p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {children}
        </p>

        <button className="mt-2 rounded-full border bg-card px-2 py-0.5 text-xs">
          👍 2
        </button>
      </div>
    </div>
  );
}