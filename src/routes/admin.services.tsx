import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ICON_OPTIONS } from "@/lib/icons";

export const Route = createFileRoute("/admin/services")({
  component: ServicesAdmin,
});

interface Row {
  id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

function ServicesAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }

  async function save(r: Row) {
    setSaving(r.id);
    const { id, ...patch } = r;
    const { error } = id.startsWith("new-")
      ? await supabase.from("services").insert(patch).select().single().then((res) => {
          if (res.data) setRows((rs) => rs.map((x) => (x.id === id ? (res.data as Row) : x)));
          return res;
        })
      : await supabase.from("services").update(patch).eq("id", id);
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  }

  async function remove(id: string) {
    if (id.startsWith("new-")) {
      setRows((rs) => rs.filter((r) => r.id !== id));
      return;
    }
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast.success("Deleted");
  }

  function add() {
    setRows((rs) => [
      ...rs,
      {
        id: `new-${Date.now()}`,
        title: "",
        description: "",
        icon: "Sun",
        sort_order: rs.length + 1,
        is_active: true,
      },
    ]);
  }

  if (loading) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Services</h1>
          <p className="text-muted-foreground mt-1">Edit your service offerings.</p>
        </div>
        <button onClick={add} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-bridge text-white px-4 py-2 text-sm font-semibold shadow-sun">
          <Plus className="h-4 w-4" /> Add service
        </button>
      </div>

      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl bg-card p-5 shadow-soft border border-border">
            <div className="grid gap-3 md:grid-cols-12">
              <input className="input md:col-span-4" placeholder="Title" value={r.title} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, title: e.target.value } : x))} />
              <select className="input md:col-span-2" value={r.icon} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, icon: e.target.value } : x))}>
                {ICON_OPTIONS.map((i) => <option key={i}>{i}</option>)}
              </select>
              <input type="number" className="input md:col-span-1" value={r.sort_order} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, sort_order: Number(e.target.value) } : x))} />
              <label className="inline-flex items-center gap-2 md:col-span-2 text-sm">
                <input type="checkbox" checked={r.is_active} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, is_active: e.target.checked } : x))} />
                Active
              </label>
              <div className="md:col-span-3 flex gap-2 justify-end">
                <button onClick={() => save(r)} disabled={saving === r.id} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-bridge text-white px-4 py-2 text-sm font-semibold disabled:opacity-70">
                  {saving === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save
                </button>
                <button onClick={() => remove(r.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea rows={2} className="input md:col-span-12" placeholder="Description" value={r.description} onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, description: e.target.value } : x))} />
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-center text-muted-foreground py-12">No services yet. Add one above.</p>}
      </div>

      <style>{`
        .input { border-radius: 0.625rem; border:1px solid var(--input); background:var(--background); padding: 0.5rem 0.75rem; font-size: 0.875rem; outline:none; }
        .input:focus { box-shadow: 0 0 0 2px var(--ring); }
      `}</style>
    </div>
  );
}
