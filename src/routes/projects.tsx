import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Zap, Sparkles } from "lucide-react";
import africa from "@/assets/project-africa.jpg";
import uk from "@/assets/project-uk.jpg";
import install from "@/assets/project-install.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Greenbridge Energy" },
      { name: "description", content: "Featured renewable energy projects delivered by Greenbridge across the UK and Africa." },
      { property: "og:title", content: "Projects — Greenbridge Energy" },
      { property: "og:description", content: "Solar farms, wind installations and microgrids delivered across the UK and Africa." },
    ],
  }),
  component: ProjectsPage,
});

const PROJECTS = [
  {
    img: uk,
    location: "Birmingham, United Kingdom",
    title: "Residential Solar Installation",
    capacity: "6.5 kW Solar PV",
    desc: "A rooftop solar PV system designed for a family home, sized to maximise self-consumption and long-term return.",
    outcome: "Reduced household energy costs by 60% and significantly improved energy independence.",
  },
  {
    img: install,
    location: "Nairobi, Kenya",
    title: "Commercial Hybrid Solar System",
    capacity: "30 kW Hybrid Solar",
    desc: "A grid-tied hybrid solar + battery system powering a busy commercial site, with seamless backup during outages.",
    outcome: "Cut diesel generator usage by 70%, dramatically lowering operational and fuel costs.",
  },
  {
    img: africa,
    location: "Kisumu, Kenya",
    title: "Off-Grid Rural Electrification",
    capacity: "15 kW Solar Mini-Grid",
    desc: "A community-scale solar mini-grid bringing dependable, clean electricity to a previously off-grid rural area.",
    outcome: "Powered 120+ homes and small businesses, unlocking new income and education opportunities.",
  },
];

function ProjectsPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Projects</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold leading-tight">
            Renewable power, <span className="text-gradient-bridge">delivered.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            A snapshot of the projects bringing the Greenbridge mission to life across two continents.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 space-y-16">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid gap-10 md:grid-cols-2 items-center ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-glow group">
                <img src={p.img} alt={p.title} className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1280} height={832} />
                <div className="absolute top-4 left-4 glass rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                  {p.location}
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-[color:var(--forest)]">
                  <Zap className="h-3.5 w-3.5 text-[color:var(--sun-deep)]" /> {p.capacity}
                </div>
                <h2 className="mt-4 text-4xl font-semibold leading-tight">{p.title}</h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{p.desc}</p>
                <div className="mt-5 rounded-2xl border border-[color:var(--leaf-deep)]/20 bg-[color:var(--leaf-deep)]/5 p-4 flex gap-3">
                  <Sparkles className="h-5 w-5 shrink-0 text-[color:var(--leaf-deep)] mt-0.5" />
                  <p className="text-sm text-foreground/85"><span className="font-semibold">Outcome — </span>{p.outcome}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
