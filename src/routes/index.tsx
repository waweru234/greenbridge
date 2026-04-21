import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sun, Wind, Zap, Leaf, Globe2, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-solar.jpg";
import projectAfrica from "@/assets/project-africa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Greenbridge Energy — Clean Power for the UK & Africa" },
      {
        name: "description",
        content:
          "Solar, wind and smart-grid solutions bridging the UK and Africa. Get a free energy consultation today.",
      },
      { property: "og:title", content: "Greenbridge Energy" },
      { property: "og:description", content: "Bridging Clean Energy between the UK and Africa." },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={hero}
            alt="Solar farm at sunrise with wind turbines"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/50 to-background" style={{ background: "linear-gradient(to bottom, color-mix(in oklab, var(--forest) 75%, transparent), color-mix(in oklab, var(--forest) 35%, transparent) 50%, var(--background))" }} />
          {/* sun glow */}
          <div className="absolute top-24 right-10 h-72 w-72 rounded-full animate-sun" style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-32 md:pb-44">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-3xl text-white"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
            >
              <Leaf className="h-3.5 w-3.5 text-[color:var(--sun)]" />
              Renewable Energy · UK & Africa
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.05]"
            >
              Bridging{" "}
              <span className="text-[color:var(--sun)]">Clean Energy</span>{" "}
              between the UK and Africa
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-white/85 leading-relaxed">
              We design, finance and deliver solar, wind and grid systems that
              power homes, businesses and communities — sustainably and at scale.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-bridge text-white px-7 py-3.5 font-semibold shadow-sun hover:shadow-glow transition-all hover:-translate-y-0.5"
              >
                Get Free Energy Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full glass-dark text-white px-6 py-3.5 font-medium hover:bg-white/15 transition"
              >
                View Our Projects
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
              {[
                { k: "120MW+", v: "Clean capacity" },
                { k: "14", v: "Active sites" },
                { k: "2", v: "Continents" },
              ].map((s) => (
                <div key={s.v} className="glass-dark rounded-2xl px-4 py-3">
                  <div className="text-2xl md:text-3xl font-display font-semibold text-[color:var(--sun)]">{s.k}</div>
                  <div className="text-xs text-white/75 mt-1">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">What we do</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold">
              End-to-end <span className="text-gradient-bridge">renewable solutions</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From feasibility to switch-on, we deliver every layer of the clean energy stack.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { Icon: Sun, t: "Solar PV Systems", d: "Utility-scale farms, commercial rooftops and off-grid kits engineered for African sun and UK climate." },
              { Icon: Wind, t: "Wind & Hybrid", d: "Wind turbines and hybrid solar-wind installations with intelligent storage for 24/7 reliability." },
              { Icon: Zap, t: "Grid & Storage", d: "Battery storage, microgrids and grid-tie engineering that keeps the lights on, sustainably." },
            ].map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-3xl bg-card p-8 shadow-soft hover:shadow-glow transition-all hover:-translate-y-1"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-bridge text-white shadow-sun">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
                <Link to="/services" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--leaf-deep)] hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT split */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] overflow-hidden shadow-glow"
          >
            <img src={projectAfrica} alt="Solar farm in Africa" className="w-full h-[480px] object-cover" loading="lazy" width={1280} height={832} />
            <div className="absolute bottom-5 left-5 glass rounded-2xl px-5 py-3">
              <div className="text-xs text-muted-foreground">Live project</div>
              <div className="font-semibold">Naivasha Solar Farm · 45 MW</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Real impact</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Power that travels <em className="not-italic text-gradient-bridge">further</em>.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Every Greenbridge project is engineered to lower carbon, lower bills, and unlock opportunity for the people it serves — from rural Kenyan villages to British industrial parks.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { Icon: Globe2, t: "2 continents", d: "UK + Africa coverage" },
                { Icon: ShieldCheck, t: "ISO-aligned", d: "Engineering excellence" },
                { Icon: Leaf, t: "85k tCO₂e", d: "Avoided annually" },
                { Icon: Zap, t: "24/7", d: "Monitoring & support" },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="rounded-2xl border border-border p-4 hover:border-[color:var(--leaf)] transition">
                  <Icon className="h-5 w-5 text-[color:var(--leaf-deep)]" />
                  <div className="mt-2 font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-white shadow-glow" style={{ background: "var(--gradient-hero)" }}>
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full animate-sun" style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }} />
            <div className="relative max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                Ready to switch to <span className="text-[color:var(--sun)]">clean energy</span>?
              </h2>
              <p className="mt-4 text-white/85 text-lg">
                Tell us about your site or community. We'll send back a no-obligation feasibility plan within 48 hours.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--forest)] px-7 py-3.5 font-semibold hover:-translate-y-0.5 transition"
              >
                Start your consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
