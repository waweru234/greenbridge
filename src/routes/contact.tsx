import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Greenbridge Energy" },
      { name: "description", content: "Get a free renewable energy consultation. Reach Greenbridge Energy in the UK or Kenya." },
      { property: "og:title", content: "Contact Greenbridge Energy" },
      { property: "og:description", content: "Get a free renewable energy consultation." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) {
        if (issue.path[0]) errs[String(issue.path[0])] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setStatus("loading");
    // Simulate send (no backend yet)
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("success");
    e.currentTarget.reset();
  }

  return (
    <>
      <section className="py-20 md:py-24 bg-gradient-soft">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Contact</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold leading-tight">
            Let's <span className="text-gradient-bridge">power what's next</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project. We typically respond within one business day with a free feasibility plan.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-5">
          {/* Info */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            {[
              { Icon: MapPin, t: "Offices", d: "London, United Kingdom\nNairobi, Kenya" },
              { Icon: Phone, t: "Phone", d: "+44 20 0000 0000\n+254 700 000 000" },
              { Icon: Mail, t: "Email", d: "hello@greenbridge-energy.com" },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="rounded-3xl bg-card p-6 shadow-soft">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-bridge text-white shadow-sun">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-1 text-muted-foreground whitespace-pre-line text-sm">{d}</p>
              </div>
            ))}
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <div className="rounded-3xl bg-card p-8 md:p-10 shadow-glow">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-12">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-bridge text-white shadow-sun">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold">Message received!</h2>
                  <p className="mt-2 text-muted-foreground max-w-md">
                    Thank you — our team will be in touch within one business day.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full px-5 py-2.5 text-sm font-semibold border border-border hover:bg-secondary"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full name" name="name" error={errors.name} />
                    <Field label="Email" name="email" type="email" error={errors.email} />
                    <Field label="Phone (optional)" name="phone" type="tel" error={errors.phone} />
                    <Field label="Location (optional)" name="location" error={errors.location} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="message">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:border-transparent transition"
                      placeholder="Tell us about your site, energy needs or project goals…"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-bridge text-white px-6 py-3.5 font-semibold shadow-sun hover:shadow-glow transition disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to be contacted by Greenbridge Energy regarding your enquiry.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:border-transparent transition"
      />
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}
