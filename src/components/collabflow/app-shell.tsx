import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, BookOpen, CheckSquare, ChevronDown, FolderKanban, LayoutDashboard, Menu, MessageSquare, Moon, Plus, Search, Settings, Sun, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar } from "./primitives";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

const links: Array<{ to: "/dashboard" | "/tasks" | "/projects" | "/messages" | "/documents" | "/notifications" | "/team"; label: string; icon: typeof LayoutDashboard; count?: string; dot?: boolean }> = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/documents", label: "Documents", icon: BookOpen },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/team", label: "Team", icon: Users },
];

function Sidebar({ close }: { close?: () => void }) {
  const { user, activeWorkspace, workspaces, switchWorkspace } = useAuth();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border/70 bg-card/55 px-4 py-5 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2.5 px-2" onClick={close}>
        <span className="grid size-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground">C</span>
        <span>
          <span className="block font-display text-[15px] font-bold">CollabFlow</span>
          <span className="font-mono text-[10px] uppercase text-muted-foreground">Workspace</span>
        </span>
      </Link>

      {workspaces.length > 1 ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card/70 px-3 py-2.5 text-left text-sm transition hover:bg-card">
              <span className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-md bg-foreground text-[10px] font-bold text-background">
                  {activeWorkspace?.name?.[0]?.toUpperCase() ?? "W"}
                </span>
                {activeWorkspace?.name ?? "Select workspace"}
              </span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {workspaces.map((w) => (
              <DropdownMenuItem key={w.id} onClick={() => switchWorkspace(w.id)}>
                {w.name}
                {w.id === activeWorkspace?.id && <span className="ml-auto text-xs text-muted-foreground">Current</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-card/70 px-3 py-2.5 text-left text-sm">
          <span className="grid size-5 place-items-center rounded-md bg-foreground text-[10px] font-bold text-background">
            {activeWorkspace?.name?.[0]?.toUpperCase() ?? "W"}
          </span>
          {activeWorkspace?.name ?? "Workspace"}
        </div>
      )}

      <nav className="mt-6 flex flex-col gap-1">
        <p className="px-3 pb-1 font-mono text-[10px] uppercase text-muted-foreground">Menu</p>
        {links.map(({ to, label, icon: Icon, count, dot }) => (
          <Link
            key={to}
            to={to}
            onClick={close}
            activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
            inactiveProps={{ className: "text-muted-foreground hover:bg-card hover:text-foreground" }}
            className="relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition"
          >
            <Icon className="size-4" />
            {label}
            {count && <span className="ml-auto rounded bg-primary/10 px-1.5 font-mono text-[10px] text-primary">{count}</span>}
            {dot && <span className="ml-auto size-2 rounded-full bg-destructive" />}
          </Link>
        ))}
      </nav>

      <div className="mt-auto">
        <Link to="/settings" onClick={close} activeProps={{ className: "bg-primary/10 text-primary" }} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-card">
          <Settings className="size-4" />
          Settings
        </Link>
        <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-border bg-card/70 p-2">
          <Avatar name={user?.name ?? "?"} />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user?.name ?? "…"}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email ?? ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  async function onLogout() {
    await logout();
    navigate({ to: "/login" });
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="relative flex">
        <div className="sticky top-0 hidden h-screen md:block">
          <Sidebar />
        </div>
        {mobile && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button aria-label="Close navigation" className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobile(false)} />
            <div className="relative h-full w-64">
              <Sidebar close={() => setMobile(false)} />
              <Button aria-label="Close navigation" size="icon" variant="ghost" className="absolute right-2 top-2" onClick={() => setMobile(false)}>
                <X />
              </Button>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 bg-background/75 px-4 py-3 backdrop-blur-xl sm:px-6">
            <Button aria-label="Open navigation" size="icon" variant="outline" className="md:hidden" onClick={() => setMobile(true)}>
              <Menu />
            </Button>
            <div className="relative hidden max-w-md sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input aria-label="Global search" placeholder="Search projects, tasks, people…" className="bg-card/60 pl-9 pr-14" />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
            </div>
            <div className="col-start-3 flex items-center gap-2">
              <Button onClick={() => toast.success("Draft created", { description: "Your new item is ready to edit." })}>
                <Plus /> <span className="hidden sm:inline">Create</span>
              </Button>
              <Button aria-label={dark ? "Use light mode" : "Use dark mode"} size="icon" variant="outline" onClick={toggleTheme}>
                {dark ? <Sun /> : <Moon />}
              </Button>
              <Button asChild aria-label="Notifications" size="icon" variant="outline" className="relative">
                <Link to="/notifications">
                  <Bell />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="px-1.5 sm:pr-3">
                    <Avatar name={user?.name ?? "?"} size="sm" />
                    <span className="hidden sm:inline">{user?.name?.split(" ")[0] ?? ""}</span>
                    <ChevronDown className="hidden size-3 sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Profile & settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <div key={path} className="page-enter mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}