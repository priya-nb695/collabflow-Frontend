import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AppShell } from "@/components/collabflow/app-shell";
import {
  Avatar,
  Badge,
  PageHeader,
  Panel,
} from "@/components/collabflow/primitives";
import { members } from "@/components/collabflow/data";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      {
        title: "Team — CollabFlow",
      },
      {
        name: "description",
        content: "Manage workspace members and roles.",
      },
      {
        property: "og:title",
        content: "Team — CollabFlow",
      },
      {
        property: "og:description",
        content: "Manage workspace members and roles.",
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

  component: TeamPage,
});

function TeamPage() {
  return (
    <AppShell>
      <PageHeader
        title="Team members"
        description="Manage access, roles, and workspace membership."
        action={<InviteDialog />}
      />

      <Panel className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-170">
            {/* Table header */}
            <div className="grid grid-cols-[1.2fr_1.4fr_.7fr_.7fr_.8fr_auto] gap-3 border-b px-5 py-3 font-mono text-[10px] uppercase text-muted-foreground">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Last active</span>
              <span />
            </div>

            {/* Members */}
            {members.map((member) => (
              <div
                key={member.email}
                className="grid grid-cols-[1.2fr_1.4fr_.7fr_.7fr_.8fr_auto] items-center gap-3 border-b px-5 py-4 text-sm last:border-0"
              >
                <span className="flex items-center gap-3 font-medium">
                  <Avatar
                    name={member.name}
                    size="sm"
                    online={member.status === "Active"}
                  />

                  {member.name}
                </span>

                <span className="text-muted-foreground">
                  {member.email}
                </span>

                <Badge>
                  {member.role}
                </Badge>

                <Badge
                  tone={
                    member.status === "Active"
                      ? "success"
                      : "warning"
                  }
                >
                  {member.status}
                </Badge>

                <span className="text-xs text-muted-foreground">
                  {member.last}
                </span>

                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`More options for ${member.name}`}
                >
                  <MoreHorizontal />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </AppShell>
  );
}

function InviteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPlus />
          Invite Member
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite a teammate
          </DialogTitle>

          <DialogDescription>
            They’ll receive an email invitation to join Acme Studio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Email */}
          <label className="block text-sm font-medium">
            Email address

            <Input
              className="mt-2"
              type="email"
              placeholder="name@company.com"
            />
          </label>

          {/* Role */}
          <label className="block text-sm font-medium">
            Role

            <Select defaultValue="developer">
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">
                  Admin
                </SelectItem>

                <SelectItem value="manager">
                  Manager
                </SelectItem>

                <SelectItem value="developer">
                  Developer
                </SelectItem>

                <SelectItem value="viewer">
                  Viewer
                </SelectItem>
              </SelectContent>
            </Select>
          </label>
        </div>

        <DialogFooter>
          <Button
            onClick={() =>
              toast.success("Invitation sent")
            }
          >
            Send invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}