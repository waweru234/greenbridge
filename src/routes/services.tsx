import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sun, Wind, Battery, Cpu, HardHat, LineChart, ArrowRight, Check, ZoomIn,
} from "lucide-react";
import solarImg from "@/assets/service-solar.jpg";
import windImg from "@/assets/service-wind.jpg";
import batteryImg from "@/assets/service-battery.jpg";
import microgridImg from "@/assets/service-microgrid.jpg";
import epcImg from "@/assets/service-epc.jpg";
import advisoryImg from "@/assets/service-advisory.jpg";
import solar2 from "@/assets/gallery/solar-2.jpg";
import solar3 from "@/assets/gallery/solar-3.jpg";
import wind2 from "@/assets/gallery/wind-2.jpg";
import wind3 from "@/assets/gallery/wind-3.jpg";
import battery2 from "@/assets/gallery/battery-2.jpg";
import battery3 from "@/assets/gallery/battery-3.jpg";
import microgrid2 from "@/assets/gallery/microgrid-2.jpg";
import microgrid3 from "@/assets/gallery/microgrid-3.jpg";
import epc2 from "@/assets/gallery/epc-2.jpg";
import epc3 from "@/assets/gallery/epc-3.jpg";
import advisory2 from "@/assets/gallery/advisory-2.jpg";
import advisory3 from "@/assets/gallery/advisory-3.jpg";
import { Lightbox, type LightboxImage } from "@/components/Lightbox";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Greenbridge Energy" },
      { name: "description", content: "Solar PV, wind, battery storage, microgrids, EPC and energy advisory across the UK and Africa — engineered end-to-end." },
      { property: "og:title", content: "Services — Greenbridge Energy" },
      { property: "og:description", content: "End-to-end renewable energy services across the UK and Africa." },
      { property: "og:image", content: solarImg },
      { name: "twitter:image", content: solarImg },
    ],
  }),
  component: ServicesPage,
});

interface Service {
  Icon: typeof Sun;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  useCases: string[];
  image: string;
  gallery: LightboxImage[];
}

const SERVICES: Service[] = [
  {
    Icon: Sun,
    title: "Solar PV Systems",
    tagline: "Turn sunlight into bankable, long-term energy assets.",
    description:
      "From utility-scale solar farms feeding the national grid to commercial rooftops slashing factory bills and off-grid kits powering remote villages, our solar PV solutions are engineered for the climates we work in. We handle site assessment, panel selection, mounting design, inverter sizing, grid interconnection and 25+ year performance monitoring — so every kilowatt-hour of sunshine becomes a measurable return.",
    benefits: [
      "Up to 60% reduction in energy costs within year one",
      "25-year performance warranties on tier-1 panels",
      "Bifacial & tracker designs for 15-25% extra yield",
      "Real-time monitoring via mobile dashboard",
    ],
    useCases: ["Utility solar farms", "Industrial rooftops", "Rural electrification", "Solar-powered water pumping"],
    image: solarImg,
    gallery: [
      { src: solarImg, caption: "Utility-scale solar farm at golden hour — capturing peak yield." },
      { src: solar2, caption: "High-efficiency monocrystalline cells engineered for harsh climates." },
      { src: solar3, caption: "Commercial rooftop installation — turning unused space into revenue." },
    ],
  },
  {
    Icon: Wind,
    title: "Wind Energy",
    tagline: "Harness consistent, high-yield power from the wind.",
    description:
      "Wind complements solar perfectly — generating most when the sun isn't shining. We design and deliver onshore wind turbines and hybrid solar-wind plants tailored to local wind regimes. From wind resource assessment using on-site met masts to turbine selection, foundation engineering and grid integration, we build wind assets that deliver 30+ years of low-maintenance, high-availability power.",
    benefits: [
      "Capacity factors of 35-45% in optimal sites",
      "Hybrid solar-wind designs for 24-hour generation",
      "Lower LCOE than diesel within 3-5 years",
      "Minimal land footprint — farming continues underneath",
    ],
    useCases: ["Onshore wind farms", "Hybrid solar-wind plants", "Industrial self-generation", "Coastal & highland sites"],
    image: windImg,
    gallery: [
      { src: windImg, caption: "Highland wind farm at sunrise — consistent prevailing winds year-round." },
      { src: wind2, caption: "Modern 4 MW turbines with 80m+ blade spans for maximum sweep area." },
      { src: wind3, caption: "Coastal wind farm at dusk — high capacity factors near the shoreline." },
    ],
  },
  {
    Icon: Battery,
    title: "Battery Energy Storage",
    tagline: "Store the sun. Smooth the grid. Power the night.",
    description:
      "Battery storage is the missing piece that makes renewables truly 24/7. We deploy lithium-ion BESS for grid-scale energy shifting, commercial peak-shaving, and flow batteries for long-duration storage. Our systems include intelligent battery management, fire suppression, thermal control, and grid-forming inverters that can black-start an entire network.",
    benefits: [
      "Shift midday solar to evening peak demand",
      "Replace diesel backup with silent, zero-emission power",
      "Provide grid services: frequency, voltage, reserve",
      "Modular: scale from 100 kWh to 100+ MWh",
    ],
    useCases: ["Grid-scale BESS", "Commercial peak-shaving", "Backup & UPS replacement", "Microgrid storage core"],
    image: batteryImg,
    gallery: [
      { src: batteryImg, caption: "Containerised BESS deployed alongside a solar plant for evening dispatch." },
      { src: battery2, caption: "Inside the container — modular lithium-ion racks with full BMS monitoring." },
      { src: battery3, caption: "Field engineer commissioning a commercial peak-shaving battery system." },
    ],
  },
  {
    Icon: Cpu,
    title: "Microgrids & Smart Grid",
    tagline: "Intelligent energy networks that work even when the grid fails.",
    description:
      "A microgrid is a self-contained energy system — solar, wind, batteries, and (if needed) backup generators — coordinated by smart controls that balance supply and demand in real time. We design microgrids for villages, university campuses, mines, hospitals, and industrial parks. They can run grid-tied or fully islanded, and pay for themselves in 4-7 years compared to grid extension or diesel.",
    benefits: [
      "Energy independence with islanded operation",
      "AI-driven load balancing & predictive dispatch",
      "Remote monitoring from anywhere in the world",
      "Future-proof: add capacity as demand grows",
    ],
    useCases: ["Rural village microgrids", "Campus & hospital networks", "Mining & industrial sites", "Island & remote communities"],
    image: microgridImg,
    gallery: [
      { src: microgridImg, caption: "24/7 control room — operators monitoring microgrid performance live." },
      { src: microgrid2, caption: "A village transformed: solar microgrid delivers light and safety after dark." },
      { src: microgrid3, caption: "Smart grid orchestration — AI balancing solar, wind, batteries and load." },
    ],
  },
  {
    Icon: HardHat,
    title: "EPC & Installation",
    tagline: "One contract. One team. End-to-end delivery.",
    description:
      "Engineering, Procurement and Construction (EPC) is where vision meets reality. We take single-point responsibility for the entire build — detailed engineering, equipment procurement, civil works, mechanical & electrical installation, testing, commissioning, and handover. Our crews are trained to international HSE standards and deliver on-time, on-budget, on-spec across the UK and Africa.",
    benefits: [
      "Single point of accountability — no finger-pointing",
      "Fixed-price, fixed-timeline contracts available",
      "International-standard HSE & quality management",
      "Local workforce training & job creation",
    ],
    useCases: ["Turnkey solar plants", "Wind farm construction", "BESS installation", "Grid interconnection works"],
    image: epcImg,
    gallery: [
      { src: epcImg, caption: "Site engineers performing final QA on a commercial PV install." },
      { src: epc2, caption: "Mounting structures and panel rows going down on a utility-scale build." },
      { src: epc3, caption: "Electrical commissioning of inverter and combiner cabinets." },
    ],
  },
  {
    Icon: LineChart,
    title: "Energy Advisory & Consulting",
    tagline: "Strategy, finance and policy for the energy transition.",
    description:
      "Before a single panel is mounted, the right strategy must be in place. Our advisory team supports governments, developers, banks and corporates with feasibility studies, technical due diligence, financial modelling, PPA structuring, carbon strategy and policy advice. We help you de-risk decisions, attract investment and align with global standards like IFC Performance Standards and the SDGs.",
    benefits: [
      "Bankable feasibility studies for project finance",
      "Independent technical due diligence for investors",
      "Carbon credits & ESG reporting frameworks",
      "Policy & regulatory advisory for governments",
    ],
    useCases: ["Project feasibility", "Investor due diligence", "Net-zero roadmaps", "PPA & tariff design"],
    image: advisoryImg,
    gallery: [
      { src: advisoryImg, caption: "Boardroom briefing — translating energy data into investor-ready insight." },
      { src: advisory2, caption: "Multi-disciplinary advisory team co-designing a bankable project." },
      { src: advisory3, caption: "Live financial modelling on-site at a candidate solar development." },
    ],
  },
];

function ServicesPage() {
  // One lightbox state shared across all sections; tracks which service + image
  const [lightbox, setLightbox] = useState<{ service: number; image: number } | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-soft overflow-hidden">
        <div className="absolute -top-32 -right-20 h-96 w-96 rounded-full opacity-20 animate-sun"
          style={{ background: "radial-gradient(circle, var(--sun) 0%, transparent 70%)" }} />
        <div className="mx-auto max-w-5xl px-6 text-center relative">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]"
          >
            Our Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-5xl md:text-6xl font-semibold leading-tight"
          >
            Every layer of the <span className="text-gradient-bridge">clean energy stack</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            From the first feasibility study to switch-on day and decades of performance beyond, Greenbridge engineers, builds and maintains renewable energy infrastructure tailored to your site, your climate, and your goals.
          </motion.p>
        </div>
      </section>

      {/* Quick service grid */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ Icon, title, tagline }, i) => (
              <motion.a
                key={title}
                href={`#${title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="group rounded-2xl bg-card p-5 border border-border hover:border-[color:var(--leaf)] hover:shadow-glow transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-bridge text-white shadow-sun shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{tagline}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed service sections */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6 space-y-24 md:space-y-32">
          {SERVICES.map(({ Icon, title, tagline, description, benefits, useCases, image, gallery }, i) => {
            const reverse = i % 2 === 1;
            const slug = title.toLowerCase().replace(/[^a-z]+/g, "-");
            return (
              <motion.div
                id={slug}
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -inset-4 bg-gradient-bridge opacity-20 blur-2xl rounded-[2.5rem]" />
                    <button
                      type="button"
                      onClick={() => setLightbox({ service: i, image: 0 })}
                      className="relative block w-full overflow-hidden rounded-[2rem] shadow-glow border border-border group cursor-zoom-in"
                      aria-label={`Open gallery for ${title}`}
                    >
                      <img
                        src={image}
                        alt={title}
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--forest)]/40 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-5 left-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-[color:var(--leaf-deep)] shadow-soft">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-medium px-3 py-1.5 opacity-0 group-hover:opacity-100 transition">
                        <ZoomIn className="h-3.5 w-3.5" /> View gallery
                      </div>
                    </button>
                  </motion.div>

                  {/* Text */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--leaf-deep)]">
                      0{i + 1} — Service
                    </p>
                    <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">{title}</h2>
                    <p className="mt-4 text-lg text-[color:var(--forest)] font-medium italic">{tagline}</p>
                    <p className="mt-5 text-muted-foreground leading-relaxed text-[1.02rem]">{description}</p>

                    <div className="mt-7">
                      <p className="text-sm font-semibold uppercase tracking-wider text-foreground/80 mb-3">Key benefits</p>
                      <ul className="grid sm:grid-cols-2 gap-2.5">
                        {benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2.5">
                            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--leaf)]/15 text-[color:var(--leaf-deep)] shrink-0">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <span className="text-sm text-foreground/90 leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-semibold uppercase tracking-wider text-foreground/80 mb-3">Where we deploy it</p>
                      <div className="flex flex-wrap gap-2">
                        {useCases.map((u) => (
                          <span key={u} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/contact"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-bridge text-white px-6 py-3 font-semibold shadow-sun hover:-translate-y-0.5 transition"
                    >
                      Discuss your {title.toLowerCase()} project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Gallery */}
                <div className="mt-12">
                  <div className="flex items-end justify-between mb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--leaf-deep)]">Gallery</p>
                      <h3 className="mt-1 text-2xl font-semibold">{title} in the field</h3>
                    </div>
                    <p className="hidden md:block text-xs text-muted-foreground">Click any image to enlarge</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gallery.map((g, gi) => (
                      <motion.button
                        key={g.src}
                        type="button"
                        onClick={() => setLightbox({ service: i, image: gi })}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: gi * 0.08 }}
                        className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft hover:shadow-glow transition-all hover:-translate-y-1 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[color:var(--leaf)]"
                        aria-label={`Open image: ${g.caption}`}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={g.src}
                            alt={g.alt ?? g.caption}
                            width={1280}
                            height={800}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[color:var(--leaf-deep)] shadow-soft opacity-0 group-hover:opacity-100 transition">
                          <ZoomIn className="h-4 w-4" />
                        </div>
                        <figcaption className="p-4 text-sm text-foreground/90 leading-snug">
                          {g.caption}
                        </figcaption>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process strip */}
      <section className="py-20 mt-12 bg-gradient-soft">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Our process</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold">From idea to switch-on, in four steps</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "Discover", d: "We listen, assess your site and map your energy goals." },
              { n: "02", t: "Design", d: "Engineering, modelling and bankable feasibility studies." },
              { n: "03", t: "Deliver", d: "Procurement, construction, commissioning — done right." },
              { n: "04", t: "Sustain", d: "Monitoring, maintenance and 25+ years of performance." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-card p-6 border border-border shadow-soft"
              >
                <p className="text-3xl font-bold text-gradient-bridge">{s.n}</p>
                <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
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

      {/* Lightbox */}
      <Lightbox
        images={lightbox !== null ? SERVICES[lightbox.service].gallery : []}
        index={lightbox?.image ?? null}
        onClose={() => setLightbox(null)}
        onChange={(image) => setLightbox((prev) => (prev ? { ...prev, image } : prev))}
      />
    </>
  );
}
