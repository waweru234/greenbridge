import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sun, Wind, Battery, Cpu, HardHat, LineChart, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Greenbridge Energy" },
      { name: "description", content: "Solar PV, wind, battery storage, microgrids, EPC and energy advisory across the UK and Africa." },
      { property: "og:title", content: "Services — Greenbridge Energy" },
      { property: "og:description", content: "End-to-end renewable energy services across the UK and Africa." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { Icon: Sun, t: "Solar PV Systems", d: "Utility-scale solar farms, commercial rooftops and off-grid kits — engineered for maximum yield in every climate." },
  { Icon: Wind, t: "Wind Energy", d: "Onshore wind turbines and hybrid solar-wind plants designed for high-availability, low-maintenance operation." },
  { Icon: Battery, t: "Battery Storage", d: "Lithium-ion and flow battery systems that store the sun, smooth the grid and unlock 24/7 renewable power." },
  { Icon: Cpu, t: "Microgrids & Smart Grid", d: "Intelligent microgrids for villages, campuses and industrial sites — with real-time monitoring and control." },
  { Icon: HardHat, t: "EPC & Installation", d: "End-to-end Engineering, Procurement and Construction. We deliver on-time, on-budget, on-spec." },
  { Icon: LineChart, t: "Energy Advisory", d: "Feasibility studies, financial modelling and carbon strategy for governments, developers and corporates." },
];

function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Services</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold leading-tight">
            Every layer of the <span className="text-gradient-bridge">clean energy stack</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            From the first feasibility study to switch-on day and beyond, we engineer, build and maintain renewable energy infrastructure tailored to your site.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ Icon, t, d }, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative rounded-3xl bg-card p-7 border border-border hover:border-[color:var(--leaf)] hover:shadow-glow transition-all hover:-translate-y-1"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-bridge text-white shadow-sun">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-14 text-white shadow-glow" style={{ background: "var(--gradient-hero)" }}>
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full animate-sun" style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }} />
            <div className="relative md:flex items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-semibold">Not sure which service fits?</h2>
                <p className="mt-3 text-white/85">Our engineers will assess your site and recommend the right mix — for free.</p>
              </div>
              <Link to="/contact" className="mt-6 md:mt-0 inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--forest)] px-6 py-3 font-semibold hover:-translate-y-0.5 transition">
                Talk to an engineer <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
