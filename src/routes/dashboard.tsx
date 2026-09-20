import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/collabflow/app-shell";
import { Avatar, Badge, PageHeader, Panel } from "@/components/collabflow/primitives";
import { projects, tasks } from "@/components/collabflow/data";

export const Route = createFileRoute("/dashboard")({
    head: () => ({
        meta: [
            { title: "Dashboard — CollabFlow" },
            {
                name: "description",
                content: "Your workspace project and task overview.",
            },
            { property: "og:title", content: "Dashboard — CollabFlow" },
            {
                property: "og:description",
                content: "Your workspace project and task overview.",
            },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary" },
        ],
    }),

    component: DashboardPage,
});

function DashboardPage() {
    const stats = [
        ["Total Projects", "12", "2 this week"],
        ["Active Tasks", "48", "14 in review"],
        ["Completed Tasks", "126", "9 today"],
        ["Team Members", "24", "8 online now"],
    ];

    return (
        <AppShell>
            <PageHeader
                title="Good morning, Priya 👋"
                description="Here's what's happening across your workspace."
            />

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stats.map(([label, value, note]) => (
                    <Panel key={label} className="p-4">
                        <p className="font-mono text-[10px] uppercase text-muted-foreground">
                            {label}
                        </p>

                        <p className="mt-2 font-display text-3xl font-bold">
                            {value}
                        </p>

                        <p className="mt-1 text-xs text-success">
                            {note}
                        </p>
                    </Panel>
                ))}
            </div>

            {/* My Tasks */}
            <Panel className="mt-4 overflow-hidden">
                <SectionHead
                    title="My Tasks"
                    action={
                        <Link
                            to="/tasks"
                            className="text-xs font-medium text-primary"
                        >
                            View all
                        </Link>
                    }
                />

                <div className="overflow-x-auto">
                    <div className="min-w-190">
                        <div className="grid grid-cols-[1.5fr_1fr_.8fr_.7fr_.7fr] gap-3 border-b px-5 py-2 font-mono text-[10px] uppercase text-muted-foreground">
                            <span>Task</span>
                            <span>Project</span>
                            <span>Status</span>
                            <span>Priority</span>
                            <span>Due</span>
                        </div>

                        {tasks.map((task) => (
                            <Link
                                key={task.title}
                                to="/tasks/$taskId"
                                params={{ taskId: "create-login-page" }}
                                className="grid grid-cols-[1.5fr_1fr_.8fr_.7fr_.7fr] items-center gap-3 border-b border-border/70 px-5 py-3 text-sm transition last:border-0 hover:bg-card/80"
                            >
                                <b>{task.title}</b>

                                <span className="text-muted-foreground">
                                    {task.project}
                                </span>

                                <Status value={task.status} />

                                <Priority value={task.priority} />

                                <span className="text-xs text-muted-foreground">
                                    {task.due}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Panel>

            {/* Projects + Activity */}
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <Panel className="lg:col-span-2">
                    <SectionHead
                        title="Project Overview"
                        action={
                            <Link
                                to="/projects"
                                className="text-xs text-primary"
                            >
                                View projects
                            </Link>
                        }
                    />

                    <div className="grid gap-3 p-4 sm:grid-cols-2">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.name}
                                project={project}
                            />
                        ))}
                    </div>
                </Panel>

                <Panel>
                    <SectionHead title="Recent Activity" />

                    <div className="space-y-4 p-4">
                        {[
                            "Rahul moved Login Page to Review",
                            "Ankit commented on API Integration",
                            "Emma completed Dashboard UI",
                            "John uploaded a new file",
                        ].map((activity, index) => (
                            <div
                                key={activity}
                                className="flex gap-3"
                            >
                                <Avatar
                                    name={["Rahul", "Ankit", "Emma", "John"][index] ?? "Team"}
                                    size="sm"
                                    online={index < 3}
                                />

                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    {activity}

                                    <span className="block font-mono text-[10px] opacity-70">
                                        {["12m", "48m", "2h", "5h"][index]} ago
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </Panel>
            </div>
        </AppShell>
    );
}

function SectionHead({
    title,
    action,
}: {
    title: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between border-b px-5 py-3">
            <h2 className="font-display text-sm font-semibold">
                {title}
            </h2>

            {action}
        </div>
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
            className={
                value === "High"
                    ? "text-xs font-medium text-destructive"
                    : value === "Medium"
                        ? "text-xs font-medium text-warning"
                        : "text-xs text-muted-foreground"
            }
        >
            {value}
        </span>
    );
}

function ProjectCard({
    project,
}: {
    project: (typeof projects)[number];
}) {
    return (
        <div className="rounded-lg border bg-card p-4 transition hover:border-primary/30">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold">
                        {project.name}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {project.description}
                    </p>
                </div>

                <Badge>{project.status}</Badge>
            </div>

            <div className="mt-4">
                <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full rounded-full bg-primary"
                        style={{
                            width: `${project.progress}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}