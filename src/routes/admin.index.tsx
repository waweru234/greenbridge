import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Award,
  ExternalLink,
  FolderKanban,
  MessageSquare,
  Quote,
  Sun,
  Users,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
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

type TrafficRange = "24h" | "7d";

interface VisitRow {
  created_at: string;
  session_id: string;
}

interface TrafficPoint {
  label: string;
  pageViews: number;
  visitors: number;
}

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const trafficChartConfig = {
  pageViews: { label: "Page views", color: "hsl(var(--primary))" },
  visitors: { label: "Unique visitors", color: "hsl(var(--accent))" },
} satisfies ChartConfig;

function getTrafficWindow(range: TrafficRange) {
  const now = new Date();
  const bucketCount = range === "24h" ? 24 : 7;
  const bucketMs = range === "24h" ? HOUR_MS : DAY_MS;
  const start = new Date(now);

  if (range === "24h") {
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() - (bucketCount - 1));
  } else {
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (bucketCount - 1));
  }

  return { start, bucketCount, bucketMs };
}

function buildTrafficSeries(
  rows: VisitRow[],
  range: TrafficRange,
  window: ReturnType<typeof getTrafficWindow>,
) {
  const { start, bucketCount, bucketMs } = window;
  const startMs = start.getTime();
  const points: Array<TrafficPoint & { uniqueSessions: Set<string> }> = Array.from(
    { length: bucketCount },
    (_, index) => {
      const bucketStart = new Date(startMs + index * bucketMs);
      return {
        label:
          range === "24h"
            ? bucketStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : bucketStart.toLocaleDateString([], { month: "short", day: "numeric" }),
        pageViews: 0,
        visitors: 0,
        uniqueSessions: new Set<string>(),
      };
    },
  );

  for (const row of rows) {
    const visitTimeMs = new Date(row.created_at).getTime();
    const bucketIndex = Math.floor((visitTimeMs - startMs) / bucketMs);
    if (bucketIndex < 0 || bucketIndex >= bucketCount) continue;

    const point = points[bucketIndex];
    point.pageViews += 1;
    point.uniqueSessions.add(row.session_id);
  }

  return points.map((point) => ({
    label: point.label,
    pageViews: point.pageViews,
    visitors: point.uniqueSessions.size,
  }));
}

function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<
    { id: string; name: string; email: string; created_at: string }[]
  >([]);
  const [trafficRange, setTrafficRange] = useState<TrafficRange>("24h");
  const [trafficData, setTrafficData] = useState<TrafficPoint[]>([]);
  const [trafficTotals, setTrafficTotals] = useState({ pageViews: 0, visitors: 0 });
  const [trafficLoading, setTrafficLoading] = useState(true);

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

  useEffect(() => {
    let active = true;

    async function loadTraffic() {
      setTrafficLoading(true);

      const window = getTrafficWindow(trafficRange);
      const { data, error } = await supabase
        .from("site_visits")
        .select("created_at, session_id")
        .gte("created_at", window.start.toISOString())
        .order("created_at", { ascending: true });

      if (!active) return;

      if (error) {
        console.warn("Failed to load traffic analytics", error.message);
        setTrafficData([]);
        setTrafficTotals({ pageViews: 0, visitors: 0 });
        setTrafficLoading(false);
        return;
      }

      const rows = (data ?? []) as VisitRow[];
      const chartPoints = buildTrafficSeries(rows, trafficRange, window);
      const uniqueVisitors = new Set(rows.map((row) => row.session_id)).size;

      setTrafficData(chartPoints);
      setTrafficTotals({
        pageViews: rows.length,
        visitors: uniqueVisitors,
      });
      setTrafficLoading(false);
    }

    void loadTraffic();
    return () => {
      active = false;
    };
  }, [trafficRange]);

  const trafficCards =
    trafficRange === "24h"
      ? [
          { label: "Visitors (24h)", value: trafficTotals.visitors, Icon: Users },
          { label: "Page views (24h)", value: trafficTotals.pageViews, Icon: Activity },
        ]
      : [
          { label: "Visitors (7d)", value: trafficTotals.visitors, Icon: Users },
          { label: "Page views (7d)", value: trafficTotals.pageViews, Icon: Activity },
        ];

  const cards = [
    {
      label: "Messages",
      value: stats?.messages ?? 0,
      sub: `${stats?.unread ?? 0} unread`,
      Icon: MessageSquare,
    },
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
            <div className="mt-3 text-4xl font-display font-semibold text-gradient-bridge">
              {c.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-soft border border-border">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Website traffic</h2>
            <p className="text-sm text-muted-foreground">See visitors and page views over time.</p>
          </div>
          <div className="inline-flex rounded-full bg-secondary p-1">
            {(["24h", "7d"] as TrafficRange[]).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTrafficRange(range)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  trafficRange === range
                    ? "bg-gradient-bridge text-white shadow-sun"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range === "24h" ? "Last 24 hours" : "Last 7 days"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {trafficCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-border bg-background/40 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{card.label}</div>
                <card.Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-2xl font-semibold">{card.value.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {trafficLoading ? (
            <div className="rounded-xl border border-border bg-background/40 p-12 text-center text-sm text-muted-foreground">
              Loading traffic chart...
            </div>
          ) : (
            <ChartContainer config={trafficChartConfig} className="h-[280px] w-full">
              <AreaChart data={trafficData} margin={{ left: 6, right: 14, top: 8, bottom: 2 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={14}
                />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={34} />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(value) => `Time: ${value}`}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  stroke="var(--color-pageViews)"
                  fill="var(--color-pageViews)"
                  fillOpacity={0.18}
                  strokeWidth={2}
                  name="Page views"
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-visitors)"
                  fill="var(--color-visitors)"
                  fillOpacity={0.12}
                  strokeWidth={2}
                  name="Unique visitors"
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-soft border border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent inquiries</h2>
          <a
            href="/admin/messages"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
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
