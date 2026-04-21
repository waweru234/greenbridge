import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Trash2, Mail, Phone, MapPin, CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/messages")({
  component: MessagesAdmin,
});

interface Row {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

function MessagesAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Row | null>(null);

  useEffect(() => { void load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }
  async function toggleRead(r: Row) {
    const { error } = await supabase.from("messages").update({ is_read: !r.is_read }).eq("id", r.id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, is_read: !r.is_read } : x));
  }
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.filter((r) => r.id !== id));
    setOpen(null);
    toast.success("Deleted");
  }
  function exportCsv() {
    const header = ["Date", "Name", "Email", "Phone", "Location", "Message", "Read"];
    const rowsCsv = rows.map((r) => [
      new Date(r.created_at).toISOString(),
      r.name, r.email, r.phone ?? "", r.location ?? "",
      r.message.replace(/\n/g, " "), r.is_read ? "yes" : "no",
    ]);
    const csv = [header, ...rowsCsv].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `greenbridge-messages-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Messages</h1>
          <p className="text-muted-foreground mt-1">{rows.filter((r) => !r.is_read).length} unread of {rows.length} total</p>
        </div>
        <button onClick={exportCsv} className="rounded-full bg-secondary text-foreground px-4 py-2 text-sm font-semibold hover:bg-muted transition">
          Export CSV
        </button>
      </div>

      <div className="rounded-2xl bg-card shadow-soft border border-border overflow-hidden">
        {rows.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">No messages yet.</div>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li key={r.id} className={`p-4 hover:bg-secondary/40 transition cursor-pointer ${!r.is_read ? "bg-secondary/20" : ""}`} onClick={() => setOpen(r)}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {r.is_read ? <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" /> : <Circle className="h-4 w-4 text-[color:var(--sun-deep)] shrink-0 fill-current" />}
                    <div className="min-w-0">
                      <div className={`truncate ${!r.is_read ? "font-semibold" : ""}`}>{r.name} <span className="text-muted-foreground font-normal">· {r.email}</span></div>
                      <div className="text-sm text-muted-foreground truncate">{r.message}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{new Date(r.created_at).toLocaleDateString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setOpen(null)}>
          <div className="bg-card rounded-3xl max-w-lg w-full p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold">{open.name}</h3>
            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a href={`mailto:${open.email}`} className="hover:text-primary">{open.email}</a></div>
              {open.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {open.phone}</div>}
              {open.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {open.location}</div>}
            </div>
            <div className="mt-4 rounded-xl bg-secondary p-4 text-sm whitespace-pre-wrap">{open.message}</div>
            <div className="mt-5 flex items-center justify-between">
              <button onClick={() => toggleRead(open).then(() => setOpen({ ...open, is_read: !open.is_read }))} className="text-sm text-primary hover:underline">
                Mark as {open.is_read ? "unread" : "read"}
              </button>
              <div className="flex gap-2">
                <button onClick={() => setOpen(null)} className="rounded-full px-4 py-2 text-sm border border-border hover:bg-secondary">Close</button>
                <button onClick={() => remove(open.id)} className="inline-flex items-center gap-1.5 rounded-full bg-destructive text-destructive-foreground px-4 py-2 text-sm font-semibold">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
