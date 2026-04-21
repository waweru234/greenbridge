import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

interface Contact {
  email: string;
  uk_phone: string;
  kenya_phone: string;
  uk_office: string;
  kenya_office: string;
  whatsapp: string;
}

function SettingsAdmin() {
  const [data, setData] = useState<Contact | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_content").select("value").eq("key", "contact").maybeSingle().then(({ data }) => {
      setData((data?.value as Contact) ?? { email: "", uk_phone: "", kenya_phone: "", uk_office: "", kenya_office: "", whatsapp: "" });
    });
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({ key: "contact", value: data as never }, { onConflict: "key" });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Contact info saved");
  }

  if (!data) return <Loader2 className="h-6 w-6 animate-spin text-primary" />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-semibold">Contact Info</h1>
        <p className="text-muted-foreground mt-1">Used in the footer, contact page and WhatsApp button.</p>
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-soft border border-border space-y-4">
        {([
          ["Email", "email"],
          ["UK office", "uk_office"],
          ["UK phone", "uk_phone"],
          ["Kenya office", "kenya_office"],
          ["Kenya phone", "kenya_phone"],
          ["WhatsApp number (digits only, with country code)", "whatsapp"],
        ] as const).map(([label, key]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1.5">{label}</label>
            <input
              value={data[key]}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
            />
          </div>
        ))}
        <button onClick={save} disabled={saving} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-bridge text-white px-5 py-2.5 text-sm font-semibold shadow-sun hover:shadow-glow disabled:opacity-70">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save
        </button>
      </div>
    </div>
  );
}
