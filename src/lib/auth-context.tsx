import { createContext, useContext, useRef, useEffect, useState, type ReactNode } from "react";
import { api, setAccessToken, setWorkspaceId, ApiError } from "./api";

export type Workspace = { id: string; name: string; slug: string; logoUrl: string | null; role: string; isActive?: boolean };
export type AuthUser = { id: string; name: string; email: string; avatarUrl: string | null };

type AuthState = {
    user: AuthUser | null;
    workspaces: Workspace[];
    activeWorkspace: Workspace | null;
    status: "loading" | "signedIn" | "signedOut";
};

type AuthContextValue = AuthState & {
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, inviteToken?: string) => Promise<void>;
    logout: () => Promise<void>;
    switchWorkspace: (workspaceId: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({ user: null, workspaces: [], activeWorkspace: null, status: "loading" });
    const authInitRef = useRef<Promise<void> | null>(null);
    async function loadMe() {
        const { user, workspaces } = await api<{ user: AuthUser; workspaces: Workspace[] }>("/auth/me");
        const active = workspaces.find((w) => w.isActive) ?? workspaces[0] ?? null;
        if (active) setWorkspaceId(active.id);
        setState({ user, workspaces, activeWorkspace: active, status: "signedIn" });
    }

    // On first load, there's no access token yet — try the refresh cookie before giving up.
    useEffect(() => {
        const init = (async () => {
            try {
                const { accessToken } = await api<{ accessToken: string }>(
                    "/auth/refresh",
                    { method: "POST" },
                );

                setAccessToken(accessToken);
                await loadMe();
            } catch {
                setState((s) => ({
                    ...s,
                    status: "signedOut",
                }));
            }
        })();

        authInitRef.current = init;
    }, []);

    async function login(email: string, password: string) {
        // Wait for the initial refresh check to finish.
        if (authInitRef.current) {
            await authInitRef.current;
        }

        const { accessToken } = await api<{ accessToken: string }>(
            "/auth/login",
            {
                method: "POST",
                body: { email, password },
            },
        );

        setAccessToken(accessToken);

        await loadMe();
    }

    async function register(name: string, email: string, password: string, inviteToken?: string) {
        const { accessToken } = await api<{ accessToken: string }>("/auth/register", {
            method: "POST",
            body: { name, email, password, inviteToken },
        });
        setAccessToken(accessToken);
        await loadMe();
    }

    async function logout() {
        try {
            await api("/auth/logout", { method: "POST" });
        } finally {
            setAccessToken(null);
            setWorkspaceId(null);
            setState({ user: null, workspaces: [], activeWorkspace: null, status: "signedOut" });
        }
    }

    async function switchWorkspace(workspaceId: string) {
        await api("/workspaces/switch", { method: "POST", body: { workspaceId } });
        setWorkspaceId(workspaceId);
        await loadMe();
    }

    async function forgotPassword(email: string) {
        await api("/auth/forgot-password", { method: "POST", body: { email } });
    }

    async function resetPassword(token: string, password: string) {
        await api("/auth/reset-password", { method: "POST", body: { token, password } });
    }

    return (
        <AuthContext.Provider
            value={{ ...state, login, register, logout, switchWorkspace, forgotPassword, resetPassword }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}

export { ApiError };