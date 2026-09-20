import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Avatar({ name, size = "md", online = false }: { name: string; size?: "sm" | "md" | "lg"; online?: boolean }) {
  const initials = name.split(" ").map((word) => word[0]).join("").slice(0, 2);
  return <span className="relative inline-flex shrink-0"><span className={cn("grid place-items-center rounded-full bg-accent font-semibold text-accent-foreground", size === "sm" ? "size-7 text-[10px]" : size === "lg" ? "size-11 text-sm" : "size-9 text-xs")}>{initials}</span>{online && <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-card bg-success" />}</span>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "primary" | "success" | "warning" | "danger" }) {
  const tones = { neutral: "bg-muted text-muted-foreground", primary: "bg-primary/10 text-primary", success: "bg-success/12 text-success", warning: "bg-warning/12 text-warning", danger: "bg-destructive/10 text-destructive" };
  return <span className={cn("inline-flex w-fit items-center rounded-md px-2 py-1 text-[11px] font-semibold", tones[tone])}>{children}</span>;
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("surface rounded-xl", className)}>{children}</section>;
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"><div className="min-w-0"><h1 className="truncate font-display text-2xl font-bold sm:text-3xl">{title}</h1>{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}</div>{action && <div className="shrink-0">{action}</div>}</header>;
}

export function EmptyState({ title = "No projects yet", body = "Create your first project to start collaborating with your team.", action }: { title?: string; body?: string; action?: ReactNode }) {
  return <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 p-8 text-center"><div className="grid size-12 place-items-center rounded-xl bg-muted text-xl">◇</div><h3 className="mt-4 font-display text-lg font-semibold">{title}</h3><p className="mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>{action && <div className="mt-5">{action}</div>}</div>;
}