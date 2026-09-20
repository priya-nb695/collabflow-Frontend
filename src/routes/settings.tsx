import { type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AppShell } from "@/components/collabflow/app-shell";
import {
  Avatar,
  PageHeader,
  Panel,
} from "@/components/collabflow/primitives";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CollabFlow" },
      {
        name: "description",
        content:
          "Manage your profile, workspace, preferences, and security.",
      },
      { property: "og:title", content: "Settings — CollabFlow" },
      {
        property: "og:description",
        content:
          "Manage your profile, workspace, preferences, and security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Settings"
        description="Manage your profile, workspace, and preferences."
      />

      <Tabs defaultValue="profile" className="mt-6">
        <TabsList className="h-auto flex-wrap justify-start">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SettingsPanel title="Profile details">
            <div className="flex items-center gap-4">
              <Avatar name="Priya Nair" size="lg" />

              <Button variant="outline">Change avatar</Button>
            </div>

            <Field label="Full name" value="Priya Nair" />
            <Field label="Email" value="priya@acme.co" />

            <Button onClick={() => toast.success("Profile saved")}>
              Save changes
            </Button>
          </SettingsPanel>
        </TabsContent>

        <TabsContent value="workspace">
          <SettingsPanel title="Workspace">
            <Field label="Workspace name" value="Acme Studio" />

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium">Workspace members</p>
                <p className="text-xs text-muted-foreground">
                  24 members across 4 roles
                </p>
              </div>

              <Button variant="outline" asChild>
                <Link to="/team">Manage</Link>
              </Button>
            </div>
          </SettingsPanel>
        </TabsContent>

        <TabsContent value="preferences">
          <SettingsPanel title="Preferences">
            <ToggleRow
              title="Dark theme"
              description="Use the dark interface across CollabFlow."
            />

            <ToggleRow
              title="Desktop notifications"
              description="Receive updates for assignments and mentions."
              defaultChecked
            />

            <label className="block text-sm font-medium">
              Language

              <Select defaultValue="en">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </label>
          </SettingsPanel>
        </TabsContent>

        <TabsContent value="security">
          <SettingsPanel title="Security">
            <Field
              label="Current password"
              value="••••••••••"
              type="password"
            />

            <Field label="New password" value="" type="password" />

            <div className="rounded-lg border p-4">
              <p className="text-sm font-medium">Active sessions</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Chrome on macOS · Bengaluru, India · Current session
              </p>
            </div>

            <Button>Update password</Button>

            <Button variant="destructive">
              Log out of all sessions
            </Button>
          </SettingsPanel>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function SettingsPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Panel className="mt-4 max-w-2xl p-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>

      <div className="mt-6 space-y-5">{children}</div>
    </Panel>
  );
}

function Field({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}

      <Input
        className="mt-2"
        defaultValue={value}
        type={type}
      />
    </label>
  );
}

function ToggleRow({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}