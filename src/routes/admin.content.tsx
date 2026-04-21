import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/content")({
  component: ContentEditor,
});

interface ContentRow {
  about: { heading: string; story1: string; story2: string };
  mission: { text: string };
  vision: { text: string };
  values: { items: string[] };
}

function ContentEditor() {
  const [data, setData] = useState<ContentRow | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    const { data: rows } = await supabase.from("site_content").select("key, value");
    const map: Record<string, unknown> = {};
    for (const r of rows ?? []) map[r.key] = r.value;
    setData({
      about: (map.about as ContentRow["about"]) ?? { heading: "", story1: "", story2: "" },
      mission: (map.mission as ContentRow["mission"]) ?? { text: "" },
      vision: (map.vision as ContentRow["vision"]) ?? { text: "" },
      values: (map.values as ContentRow["values"]) ?? { items: [] },
    });
  }

  async function save(key: keyof ContentRow) {
    if (!data) return;
    setSaving(key);
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value: data[key] as never }, { onConflict: "key" });
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success(`${key} saved`);
  }

  if (!data) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">About & Content</h1>
        <p className="text-muted-foreground mt-1">Edit your About page, mission, vision and values.</p>
      </div>

      {/* About */}
      <Section title="About" onSave={() => save("about")} saving={saving === "about"}>
        <Field label="Heading">
          <input
            value={data.about.heading}
            onChange={(e) => setData({ ...data, about: { ...data.about, heading: e.target.value } })}
            className="input"
          />
        </Field>
        <Field label="Paragraph 1">
          <textarea
            rows={4}
            value={data.about.story1}
            onChange={(e) => setData({ ...data, about: { ...data.about, story1: e.target.value } })}
            className="input"
          />
        </Field>
        <Field label="Paragraph 2">
          <textarea
            rows={4}
            value={data.about.story2}
            onChange={(e) => setData({ ...data, about: { ...data.about, story2: e.target.value } })}
            className="input"
          />
        </Field>
      </Section>

      {/* Mission */}
      <Section title="Mission" onSave={() => save("mission")} saving={saving === "mission"}>
        <Field label="Mission statement">
          <textarea
            rows={3}
            value={data.mission.text}
            onChange={(e) => setData({ ...data, mission: { text: e.target.value } })}
            className="input"
          />
        </Field>
      </Section>

      {/* Vision */}
      <Section title="Vision" onSave={() => save("vision")} saving={saving === "vision"}>
        <Field label="Vision statement">
          <textarea
            rows={3}
            value={data.vision.text}
            onChange={(e) => setData({ ...data, vision: { text: e.target.value } })}
            className="input"
          />
        </Field>
      </Section>

      {/* Values */}
      <Section title="Core Values" onSave={() => save("values")} saving={saving === "values"}>
        <div className="space-y-2">
          {data.values.items.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={v}
                onChange={(e) => {
                  const items = [...data.values.items];
                  items[i] = e.target.value;
                  setData({ ...data, values: { items } });
                }}
                className="input flex-1"
              />
              <button
                onClick={() => {
                  const items = data.values.items.filter((_, idx) => idx !== i);
                  setData({ ...data, values: { items } });
                }}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setData({ ...data, values: { items: [...data.values.items, ""] } })}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <Plus className="h-4 w-4" /> Add value
          </button>
        </div>
      </Section>

      <style>{`
        .input { width:100%; border-radius: 0.75rem; border:1px solid var(--input); background:var(--background); padding: 0.625rem 0.875rem; font-size: 0.875rem; outline:none; transition: box-shadow .15s; }
        .input:focus { box-shadow: 0 0 0 2px var(--ring); }
      `}</style>
    </div>
  );
}

function Section({ title, children, onSave, saving }: { title: string; children: React.ReactNode; onSave: () => void; saving: boolean }) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-soft border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-bridge text-white px-4 py-2 text-sm font-semibold shadow-sun hover:shadow-glow transition disabled:opacity-70"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}
