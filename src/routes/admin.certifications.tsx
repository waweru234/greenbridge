import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/certifications")({
  component: CertsAdmin,
});

type Status = "in_progress" | "achieved" | "planned";

interface Row {
  id: string;
  name: string;
  issuer: string;
  status: Status;
  year: string | null;
  logo_url: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
}

function CertsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => { void load(); }, []);
  async function load() {
    setLoading(true);
    const { data } = await supabase.from("certifications").select("*").order("sort_order");
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }
  async function save(r: Row) {
    setSaving(r.id);
    const { id, ...patch } = r;
    if (id.startsWith("new-")) {
      const { data, error } = await supabase.from("certifications").insert(patch).select().single();
      setSaving(null);
      if (error) return toast.error(error.message);
      if (data) setRows((rs) => rs.map((x) => x.id === id ? (data as Row) : x));
      toast.success("Created");
    } else {
      const { error } = await supabase.from("certifications").update(patch).eq("id", id);
      setSaving(null);
      if (error) return toast.error(error.message);
      toast.success("Saved");
    }
  }
  async function remove(id: string) {
    if (id.startsWith("new-")) { setRows((rs) => rs.filter((r) => r.id !== id)); return; }
    if (!confirm("Delete?")) return;
    const { error } = await supabase.from("certifications").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast.success("Deleted");
  }
  function add() {
    setRows((rs) => [...rs, { id: `new-${Date.now()}`, name: "", issuer: "", status: "in_progress", year: "", logo_url: "", description: "", sort_order: rs.length + 1, is_active: true }]);
  }

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Certifications</h1>
          <p className="text-muted-foreground mt-1">Track achieved, in-progress and planned certifications.</p>
        </div>
        <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-bridge text-white px-4 py-2 text-sm font-semibold shadow-sun">
          <Plus className="h-4 w-4" /> Add certification
        </button>
      </div>

      {rows.map((r) => (
        <div key={r.id} className="rounded-2xl bg-card p-5 shadow-soft border border-border space-y-3">
          <div className="grid gap-3 md:grid-cols-12">
            <input className="input md:col-span-5" placeholder="Name (e.g. ISO 9001)" value={r.name} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, name: e.target.value } : x))} />
            <input className="input md:col-span-4" placeholder="Issuer" value={r.issuer} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, issuer: e.target.value } : x))} />
            <select className="input md:col-span-2" value={r.status} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, status: e.target.value as Status } : x))}>
              <option value="achieved">Achieved</option>
              <option value="in_progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
            <input className="input md:col-span-1" placeholder="Year" value={r.year ?? ""} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, year: e.target.value } : x))} />
          </div>
          <textarea rows={2} className="input" placeholder="Description (optional)" value={r.description ?? ""} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, description: e.target.value } : x))} />
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={r.is_active} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, is_active: e.target.checked } : x))} />
              Show on website
            </label>
            <div className="flex gap-2">
              <button onClick={() => save(r)} disabled={saving === r.id} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-bridge text-white px-4 py-2 text-sm font-semibold disabled:opacity-70">
                {saving === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
              </button>
              <button onClick={() => remove(r.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .input { width:100%; border-radius: 0.625rem; border:1px solid var(--input); background:var(--background); padding: 0.5rem 0.75rem; font-size: 0.875rem; outline:none; }
        .input:focus { box-shadow: 0 0 0 2px var(--ring); }
      `}</style>
    </div>
  );
}
