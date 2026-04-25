import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Sun, Battery, Cpu, Building2, LineChart, Zap, Leaf, Sparkles, MapPin, TrendingDown, Users, Quote, Star } from "lucide-react";
import hero from "@/assets/hero-solar.jpg";
import projectUk from "@/assets/project-uk.jpg";
import projectInstall from "@/assets/project-install.jpg";
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
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = Math.round(v).toLocaleString() + suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, value, suffix, motionVal]);

  return <span ref={ref}>0{suffix}</span>;
}

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ y: heroY, scale: heroScale }}>
          <img
            src={hero}
            alt="Solar farm at sunrise with wind turbines"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in oklab, var(--forest) 78%, transparent), color-mix(in oklab, var(--forest) 38%, transparent) 50%, var(--background))",
            }}
          />
          {/* sun glow */}
          <motion.div
            className="absolute top-24 right-10 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating leaf orbs */}
          <motion.div
            className="absolute bottom-32 left-10 h-40 w-40 rounded-full blur-2xl"
            style={{ background: "radial-gradient(circle, var(--leaf) 0%, transparent 70%)" }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-32 md:pb-44">
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
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="h-3.5 w-3.5 text-[color:var(--sun)]" />
              </motion.span>
              Renewable Energy · UK & Africa
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.05]"
            >
              Bridging{" "}
              <span className="relative inline-block">
                <span className="text-[color:var(--sun)]">Clean Energy</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-1 origin-left rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--sun), var(--leaf))" }}
                />
              </span>{" "}
              between the UK and Africa
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-white/85 leading-relaxed">
              We design, finance and deliver solar, wind and grid systems that
              power homes, businesses and communities — sustainably and at scale.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-bridge text-white px-7 py-3.5 font-semibold shadow-sun hover:shadow-glow transition-all"
                >
                  Get Free Energy Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-full glass-dark text-white px-6 py-3.5 font-medium hover:bg-white/15 transition"
                >
                  View Our Projects
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
              {[
                { v: 120, suffix: "MW+", l: "Clean capacity" },
                { v: 14, suffix: "", l: "Active sites" },
                { v: 2, suffix: "", l: "Continents" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="glass-dark rounded-2xl px-4 py-3"
                >
                  <div className="text-2xl md:text-3xl font-display font-semibold text-[color:var(--sun)]">
                    <AnimatedNumber value={s.v} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-white/75 mt-1">{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-5 rounded-full border border-white/40 flex justify-center pt-1.5"
          >
            <span className="h-1.5 w-1 rounded-full bg-white/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee partners strip */}
      <section className="py-6 border-y border-border bg-card overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap">
          <motion.div
            className="flex gap-12 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].flatMap((_, dup) =>
              [
                "ISO 9001 aligned",
                "MCS-ready",
                "IFC Performance Standards",
                "IEC 61215 modules",
                "G99 grid-tie",
                "EPC certified",
                "Net-zero partner",
              ].map((label, i) => (
                <div key={`${dup}-${i}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                  {label}
                </div>
              )),
            )}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">
              What we do
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold">
              End-to-end <span className="text-gradient-bridge">renewable solutions</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From feasibility to switch-on, we deliver every layer of the clean energy stack.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: Sun,
                t: "Solar PV Systems",
                d: "Utility-scale farms, commercial rooftops and off-grid kits engineered for African sun and UK climate.",
              },
              {
                Icon: Wind,
                t: "Wind & Hybrid",
                d: "Wind turbines and hybrid solar-wind installations with intelligent storage for 24/7 reliability.",
              },
              {
                Icon: Zap,
                t: "Grid & Storage",
                d: "Battery storage, microgrids and grid-tie engineering that keeps the lights on, sustainably.",
              },
            ].map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-card p-8 shadow-soft hover:shadow-glow transition-all overflow-hidden"
              >
                <motion.div
                  className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }}
                />
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-bridge text-white shadow-sun"
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="relative mt-6 text-2xl font-semibold">{t}</h3>
                <p className="relative mt-3 text-muted-foreground leading-relaxed">{d}</p>
                <Link
                  to="/services"
                  className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--leaf-deep)] hover:gap-2 transition-all"
                >
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
            <motion.img
              src={projectAfrica}
              alt="Solar farm in Africa"
              className="w-full h-[480px] object-cover"
              loading="lazy"
              width={1280}
              height={832}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute bottom-5 left-5 glass rounded-2xl px-5 py-3"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--leaf)] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--leaf-deep)]" />
                </span>
                Live project
              </div>
              <div className="font-semibold">Naivasha Solar Farm · 45 MW</div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">
              Real impact
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Power that travels{" "}
              <em className="not-italic text-gradient-bridge">further</em>.
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
              ].map(({ Icon, t, d }, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -3, borderColor: "var(--leaf)" }}
                  className="rounded-2xl border border-border p-4 transition"
                >
                  <Icon className="h-5 w-5 text-[color:var(--leaf-deep)]" />
                  <div className="mt-2 font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-white shadow-glow"
            style={{ background: "var(--gradient-hero)" }}
          >
            <motion.div
              className="absolute -top-20 -right-20 h-80 w-80 rounded-full"
              style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full"
              style={{ background: "radial-gradient(circle, var(--leaf) 0%, transparent 70%)" }}
              animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                Ready to switch to{" "}
                <span className="text-[color:var(--sun)]">clean energy</span>?
              </h2>
              <p className="mt-4 text-white/85 text-lg">
                Tell us about your site or community. We'll send back a no-obligation feasibility plan within 48 hours.
              </p>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="inline-block mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--forest)] px-7 py-3.5 font-semibold transition"
                >
                  Start your consultation <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
