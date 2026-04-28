import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sun, Battery, Cpu, Building2, LineChart, Zap, Leaf, Sparkles, MapPin, TrendingDown, Users, Quote, Star, Lightbulb, Wind } from "lucide-react";
import hero from "@/assets/hero-solar.jpg";
import heroVideo from "@/assets/Hailuo_Video_Just make it look like the sun_505142339831885827.mp4";
import aerialSolarVideo from "@/assets/new ones/stock-footage-aerial-drone-view-into-large-solar-panels-at-a-solar-farm-at-bright-sunset-solar-cell-power-plants.mp4";
import waterFlowVideo from "@/assets/new ones/stock-footage-water-flows-from-a-solar-powered-tubewell-beside-solar-panels-used-for-irrigating-nearby-farmland.mp4";
import projectUk from "@/assets/uploads/ground-mount-residential.jpg";
import projectInstall from "@/assets/uploads/install-team-roof.jpg";
import projectAfrica from "@/assets/uploads/solar-borehole.jpg";

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
  const [canPlayVideo, setCanPlayVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // keep the hero muted by default for autoplay compatibility
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  // Try to start playback programmatically; if browser blocks autoplay, show a play control
  useEffect(() => {
    if (!videoRef.current || !canPlayVideo) return;
    const vid = videoRef.current;
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setAutoplayBlocked(true);
      });
    }
  }, [videoRef, canPlayVideo]);

  function handleStartPlayback() {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setAutoplayBlocked(false);
    }).catch(() => {
      // still blocked, keep the control visible
      setAutoplayBlocked(true);
    });
  }

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={{ y: heroY, scale: heroScale }}>
          {/* Video background with poster fallback. Respects muted state. If user prefers reduced motion the poster will be shown via CSS (motion-reduce). */}
          {canPlayVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={heroVideo}
              preload="metadata"
              poster={hero}
              autoPlay
              loop
              playsInline
              muted={true}
              // prevent tab focus on background media
              aria-hidden="true"
              onError={() => setCanPlayVideo(false)}
              onLoadedData={() => {
                // debug hook: confirm video loaded
                // eslint-disable-next-line no-console
                console.log('Hero video loaded:', heroVideo);
              }}
              onPlay={() => {
                // eslint-disable-next-line no-console
                console.log('Hero video playing');
              }}
            />
          ) : (
            <img
              src={hero}
              alt="Solar farm at sunrise with wind turbines"
              className="h-full w-full object-cover hero-fallback-poster"
              width={1920}
              height={1080}
            />
          )}
          <div className="absolute inset-0 hero-video-overlay" />

          {/* Decorative overlays: color wash, vignette and animated light streak */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 hero-color-overlay" />
            <div className="absolute inset-0 hero-vignette" />
            <div className="absolute inset-0 hero-light-streak" />
          </div>
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

        {/* mute control removed for a clean hero — video stays muted for autoplay */}

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

      {/* Energy in motion */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">
              Energy in motion
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Live project footage, <span className="text-gradient-bridge">real field conditions</span>.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Aerial and on-ground video from solar and water projects to show how systems perform in real environments.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 rounded-3xl overflow-hidden border border-border shadow-soft bg-card"
            >
              <div className="relative">
                <video
                  src={aerialSolarVideo}
                  className="w-full h-[280px] md:h-[420px] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="Aerial drone view of solar farm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-xs uppercase tracking-[0.16em] font-semibold text-white/80">Drone footage</p>
                  <p className="text-lg md:text-2xl font-semibold">Utility-scale solar arrays at sunset</p>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl overflow-hidden border border-border shadow-soft bg-card"
            >
              <div className="relative h-full min-h-[280px] md:min-h-[420px]">
                <video
                  src={waterFlowVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="Water flowing from solar-powered tubewell"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white pr-4">
                  <p className="text-xs uppercase tracking-[0.16em] font-semibold text-white/80">Field footage</p>
                  <p className="text-base md:text-xl font-semibold leading-tight">Solar-powered tubewell irrigation in operation</p>
                </div>
              </div>
            </motion.article>
          </div>
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
              From feasibility to switch-on, we deliver every layer of the clean energy stack — across the UK and Africa.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { Icon: Sun, t: "Solar PV Installation", d: "Residential, commercial and utility-scale solar PV systems engineered for the UK climate and African sun.", tag: "UK & Africa" },
              { Icon: Battery, t: "Battery Storage Solutions", d: "Lithium-ion battery systems that store solar by day and power your site through the evening peak — or a blackout.", tag: "Backup & Peak-shaving" },
              { Icon: Cpu, t: "Off-Grid & Hybrid Systems", d: "Solar + battery + (optional) generator microgrids bringing 24/7 reliable power to off-grid homes, clinics and villages.", tag: "Africa Focus" },
              { Icon: Building2, t: "Commercial & Industrial Energy Solutions", d: "Turnkey C&I solar and storage cutting energy bills, diesel use and carbon for factories, hotels and agribusinesses.", tag: "C&I Energy" },
              { Icon: Lightbulb, t: "Solar Lighting (Home & Security)", d: "Solar lights for domestic homes and motion-activated security floodlights — clean, instant, zero-running-cost light wherever you need it.", tag: "Domestic & Security" },
              { Icon: Wind, t: "Wind Power Generators", d: "Small-scale wind turbines paired with solar to deliver true 24/7 renewable generation in windy coastal and highland sites.", tag: "Hybrid Renewable" },
              { Icon: LineChart, t: "Energy Consultation & System Design", d: "Independent feasibility studies, system sizing, financial modelling and bankable system design.", tag: "Advisory" },
            ].map(({ Icon, t, d, tag }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-card p-7 shadow-soft hover:shadow-glow transition-all overflow-hidden border border-border"
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
                <div className="relative mt-5 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-[color:var(--forest)]">
                  {tag}
                </div>
                <h3 className="relative mt-3 text-xl font-semibold leading-snug">{t}</h3>
                <p className="relative mt-2 text-muted-foreground leading-relaxed text-sm">{d}</p>
                <Link
                  to="/services"
                  className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--leaf-deep)] hover:gap-2 transition-all"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS / IMPACT */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">
              Projects & impact
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Real systems. <span className="text-gradient-bridge">Measurable results.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              A snapshot of recent installations and the impact they're delivering for homes, businesses and communities.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { img: projectUk, location: "Birmingham, UK", title: "UK Residential Solar", capacity: "6.5 kW Solar PV", Icon: TrendingDown, metric: "60%", metricLabel: "energy bill savings", desc: "Rooftop solar PV for a family home, sized for maximum self-consumption and long-term return." },
              { img: projectInstall, location: "Nairobi, Kenya", title: "Nairobi Commercial Solar", capacity: "30 kW Hybrid Solar", Icon: Zap, metric: "70%", metricLabel: "diesel reduction", desc: "Grid-tied hybrid solar + battery powering a busy commercial site with seamless backup during outages." },
              { img: projectAfrica, location: "Kisumu, Kenya", title: "Kisumu Mini-Grid", capacity: "15 kW Solar Mini-Grid", Icon: Users, metric: "120+", metricLabel: "homes powered", desc: "Community solar mini-grid bringing dependable, clean electricity to a previously off-grid rural area." },
            ].map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl overflow-hidden bg-card shadow-soft hover:shadow-glow transition-all border border-border flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={1280} height={832} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--forest)]/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-[color:var(--leaf-deep)]" /> {p.location}
                  </div>
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-[color:var(--forest)]">
                    <Sparkles className="h-3 w-3 text-[color:var(--sun-deep)]" /> {p.capacity}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[color:var(--leaf-deep)]/20 bg-[color:var(--leaf-deep)]/5 p-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-bridge text-white shrink-0">
                      <p.Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-2xl font-display font-semibold leading-none text-[color:var(--leaf-deep)]">{p.metric}</div>
                      <div className="text-xs text-muted-foreground mt-1">{p.metricLabel}</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-bridge text-white px-6 py-3 font-semibold shadow-sun hover:-translate-y-0.5 transition"
            >
              See all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
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
              Testimonials
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Trusted across <span className="text-gradient-bridge">two continents</span>.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              What our clients say about working with the Greenbridge team.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { quote: "Greenbridge transformed our business by providing a reliable solar solution. We've cut our energy costs significantly and our operations no longer stop when the grid does.", name: "James M.", role: "Business Owner", location: "Nairobi" },
              { quote: "Professional, efficient and highly knowledgeable team. From the first site visit to switch-on, every step felt considered. Our home runs on the sun now.", name: "Sarah W.", role: "Homeowner", location: "United Kingdom" },
              { quote: "Our village finally has dependable electricity after dark. Children can study, the clinic stays open, and small businesses are thriving. It changed everything.", name: "Daniel O.", role: "Community Leader", location: "Kisumu" },
            ].map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl bg-card p-8 shadow-soft hover:shadow-glow transition-all border border-border flex flex-col"
              >
                <Quote className="h-8 w-8 text-[color:var(--leaf-deep)]/25" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-[color:var(--sun)] text-[color:var(--sun)]" />
                  ))}
                </div>
                <blockquote className="mt-4 text-foreground/90 leading-relaxed flex-1">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold leading-tight">{t.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t.role}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-[color:var(--forest)] shrink-0">
                    <MapPin className="h-3 w-3 text-[color:var(--leaf-deep)]" /> {t.location}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
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
