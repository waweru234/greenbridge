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
      <section className="relative py-20 md:py-24 bg-gradient-soft overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-[color:var(--sun)]/20 blur-3xl animate-float" />
        <div aria-hidden className="pointer-events-none absolute top-10 -right-10 h-80 w-80 rounded-full bg-[color:var(--leaf-deep)]/15 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Contact</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold leading-tight">
            Let's <span className="text-gradient-bridge">power what's next</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your project. We typically respond within one business day with a free feasibility plan.
          </p>
        </div>
      </section>

      {/* Office Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Our Offices</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Two continents. <span className="text-gradient-bridge">One mission.</span></h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                flag: "🇬🇧",
                region: "United Kingdom Office",
                company: "Greenbridge Energy Limited",
                address: ["34 Lullington Close", "Manchester, M22 1LY", "England"],
                phone: "+44 7520 674133",
                accent: "from-[#1a3a8f] via-[#2456b8] to-[#cf142b]",
              },
              {
                flag: "🇰🇪",
                region: "Kenya Office — Africa Operations Hub",
                company: "Triomah Solution Ltd (Partner Office)",
                address: ["Mombasa Road – Beijing Road", "P.O. Box 871-00241", "Nairobi, Kenya"],
                phone: "+254 723 363636",
                accent: "from-[#006600] via-[#000000] to-[#bb0000]",
              },
            ].map((o) => (
              <motion.div
                key={o.region}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-glow transition-shadow"
              >
                <div className={`h-2 w-full bg-gradient-to-r ${o.accent}`} />
                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl leading-none">{o.flag}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{o.region}</p>
                      <h3 className="text-xl font-semibold">{o.company}</h3>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-bridge text-white shadow-sun shrink-0">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <div className="text-sm leading-relaxed">
                        {o.address.map((l) => <div key={l}>{l}</div>)}
                      </div>
                    </div>
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-3 hover:bg-secondary transition-colors">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-bridge text-white shadow-sun shrink-0">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span className="font-semibold tracking-wide">{o.phone}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-5">
          {/* Email card */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="rounded-3xl bg-gradient-bridge p-7 text-white shadow-glow relative overflow-hidden">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/15 blur-2xl animate-pulse" />
              <Mail className="h-6 w-6 relative" />
              <h3 className="mt-4 text-lg font-semibold relative">Email us anytime</h3>
              <p className="mt-1 text-white/85 text-sm relative">We typically respond within one business day.</p>
              <a href="mailto:greenbridgegy@outlook.com" className="mt-4 inline-block font-semibold underline-offset-4 hover:underline relative">
                greenbridgegy@outlook.com
              </a>
            </div>
            <a
              href="https://instagram.com/greenbridgeenergyltd"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl p-7 text-white shadow-glow relative overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 relative">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <h3 className="mt-4 text-lg font-semibold relative">Follow us on Instagram</h3>
              <p className="mt-1 text-white/90 text-sm relative">See projects, behind-the-scenes & impact stories.</p>
              <span className="mt-4 inline-block font-semibold underline-offset-4 group-hover:underline relative">
                @greenbridgeenergyltd →
              </span>
            </a>
            <div className="rounded-3xl bg-card p-7 shadow-soft">
              <h3 className="font-semibold">Office hours</h3>
              <p className="mt-2 text-sm text-muted-foreground">Mon – Fri · 09:00 – 18:00 (local time)</p>
              <p className="mt-1 text-sm text-muted-foreground">Emergency support available 24/7 for active projects.</p>
            </div>
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
