import { Outlet, createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Sun,
  FolderKanban,
  MessageSquare,
  Quote,
  Award,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Greenbridge Energy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Overview", Icon: LayoutDashboard, exact: true },
  { to: "/admin/content", label: "About & Content", Icon: FileText, exact: false },
  { to: "/admin/services", label: "Services", Icon: Sun, exact: false },
  { to: "/admin/projects", label: "Projects", Icon: FolderKanban, exact: false },
  { to: "/admin/testimonials", label: "Testimonials", Icon: Quote, exact: false },
  { to: "/admin/certifications", label: "Certifications", Icon: Award, exact: false },
  { to: "/admin/messages", label: "Messages", Icon: MessageSquare, exact: false },
  { to: "/admin/settings", label: "Contact Info", Icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      void navigate({ to: "/auth" });
    }
  }, [loading, user, isAdmin, navigate]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-soft">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Greenbridge" className="h-9 w-auto" />
          </Link>
          <div className="mt-3 text-xs text-muted-foreground">Admin Dashboard</div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, label, Icon, exact }) => {
            const active = exact ? location.pathname === to : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-gradient-bridge text-white shadow-sun"
                    : "text-foreground/75 hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user.email}</div>
          <button
            onClick={() => signOut().then(() => navigate({ to: "/" }))}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/75 hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <img src={logo} alt="Greenbridge" className="h-8 w-auto" />
          <button onClick={() => signOut().then(() => navigate({ to: "/" }))} className="text-sm text-muted-foreground">
            Sign out
          </button>
        </div>
        <div className="flex overflow-x-auto px-2 pb-2 gap-1">
          {NAV.map(({ to, label, Icon, exact }) => {
            const active = exact ? location.pathname === to : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                  active ? "bg-gradient-bridge text-white" : "bg-secondary text-foreground/70"
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="flex-1 min-w-0 pt-28 md:pt-0">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-6 md:p-10 max-w-6xl"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
