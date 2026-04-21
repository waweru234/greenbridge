import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, FolderKanban, Sun, Award, Quote, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

interface Stats {
  messages: number;
  unread: number;
  services: number;
  projects: number;
  testimonials: number;
  certifications: number;
}

function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<{ id: string; name: string; email: string; created_at: string }[]>([]);

  useEffect(() => {
    async function load() {
      const counts = await Promise.all([
        supabase.from("messages").select("*", { count: "exact", head: true }),
        supabase.from("messages").select("*", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }),
        supabase.from("certifications").select("*", { count: "exact", head: true }),
      ]);
      setStats({
        messages: counts[0].count ?? 0,
        unread: counts[1].count ?? 0,
        services: counts[2].count ?? 0,
        projects: counts[3].count ?? 0,
        testimonials: counts[4].count ?? 0,
        certifications: counts[5].count ?? 0,
      });
      const { data } = await supabase
        .from("messages")
        .select("id, name, email, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecent(data ?? []);
    }
    void load();
  }, []);

  const cards = [
    { label: "Messages", value: stats?.messages ?? 0, sub: `${stats?.unread ?? 0} unread`, Icon: MessageSquare },
    { label: "Services", value: stats?.services ?? 0, sub: "active offerings", Icon: Sun },
    { label: "Projects", value: stats?.projects ?? 0, sub: "case studies", Icon: FolderKanban },
    { label: "Certifications", value: stats?.certifications ?? 0, sub: "tracked", Icon: Award },
    { label: "Testimonials", value: stats?.testimonials ?? 0, sub: "live quotes", Icon: Quote },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening across Greenbridge.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl bg-card p-6 shadow-soft hover:shadow-glow transition border border-border"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{c.label}</div>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-bridge text-white">
                <c.Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-4xl font-display font-semibold text-gradient-bridge">{c.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-soft border border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent inquiries</h2>
          <a href="/admin/messages" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            View all <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="mt-4 divide-y divide-border">
          {recent.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">No messages yet.</div>
          ) : (
            recent.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.email}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
