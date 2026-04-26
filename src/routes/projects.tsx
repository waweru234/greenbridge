import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Zap, Sparkles } from "lucide-react";
import africa from "@/assets/project-africa.jpg";
import groundMount from "@/assets/uploads/ground-mount-residential.jpg";
import installTeam from "@/assets/uploads/install-team-roof.jpg";
import solarBorehole from "@/assets/uploads/solar-borehole.jpg";
import roofCloseup from "@/assets/uploads/roof-panels-closeup.jpg";
import siteInstall from "@/assets/uploads/site-installation.jpg";
import nasho from "@/assets/uploads/nasho-irrigation.jpg";
import windTurbine1 from "@/assets/uploads/wind-turbine-1.jpg";
import securityLight from "@/assets/uploads/security-light.jpg";
import homeLight from "@/assets/uploads/home-solar-light.jpg";


export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Greenbridge Energy" },
      { name: "description", content: "Featured renewable energy projects delivered by Greenbridge across the UK and Africa, plus landmark Kenyan solar plants powering the region." },
      { property: "og:title", content: "Projects — Greenbridge Energy" },
      { property: "og:description", content: "Solar, battery and hybrid systems delivered across the UK and Africa." },
    ],
  }),
  component: ProjectsPage,
});

const PROJECTS = [
  {
    img: groundMount,
    location: "Birmingham, United Kingdom",
    title: "Residential Solar Installation",
    capacity: "6.5 kW Solar PV",
    desc: "A rooftop solar PV system designed for a family home, sized to maximise self-consumption and long-term return.",
    outcome: "Reduced household energy costs by 60% and significantly improved energy independence.",
    tag: "Greenbridge build",
  },
  {
    img: installTeam,
    location: "Nairobi, Kenya",
    title: "Commercial Hybrid Solar System",
    capacity: "30 kW Hybrid Solar",
    desc: "A grid-tied hybrid solar + battery system powering a busy commercial site, with seamless backup during outages.",
    outcome: "Cut diesel generator usage by 70%, dramatically lowering operational and fuel costs.",
    tag: "Greenbridge build",
  },
  {
    img: homeLight,
    location: "UK & Kenya — Domestic",
    title: "Solar Home Lighting Roll-out",
    capacity: "Solar Lighting Kits",
    desc: "Affordable solar home lighting kits replacing kerosene lamps and grid dependence — clean, safe and instant light for every room.",
    outcome: "Brought reliable evening light to hundreds of homes — supporting study, safety and small home enterprise.",
    tag: "Greenbridge build",
  },
  {
    img: securityLight,
    location: "Estates & Compounds",
    title: "Solar Security Lighting",
    capacity: "All-in-one Solar Floodlights",
    desc: "Motion-activated solar security lights protecting compounds, schools, businesses and public spaces with zero running cost.",
    outcome: "Improved community safety while removing grid and fuel costs entirely.",
    tag: "Greenbridge build",
  },
  {
    img: windTurbine1,
    location: "Coastal Kenya",
    title: "Hybrid Wind Power Generator",
    capacity: "Small-scale Wind Turbines",
    desc: "Small-scale wind turbines paired with solar to deliver round-the-clock generation in windy coastal and highland sites.",
    outcome: "Boosted energy availability after sunset and during cloudy weeks — true 24/7 hybrid renewable power.",
    tag: "Greenbridge build",
  },
];

const KENYA_LANDMARKS = [
  {
    img: nasho,
    location: "Eastern Province, Rwanda",
    title: "Nasho Solar-Powered Irrigation Project",
    capacity: "Solar Irrigation",
    desc: "A landmark agricultural project in Rwanda's Eastern Province using solar technology to power irrigation across thousands of hectares of farmland.",
    outcome: "Powers irrigation for over 2,000 farmers — boosting food security, yields and rural livelihoods.",
  },
  {
    img: africa,
    location: "Garissa, Kenya",
    title: "Garissa Solar Power Plant",
    capacity: "50 MW Utility Solar",
    desc: "The largest grid-connected solar plant in East and Central Africa, feeding clean electricity directly into the national grid.",
    outcome: "Powers tens of thousands of homes and offsets significant fossil-fuel generation across the region.",
  },
  {
    img: roofCloseup,
    location: "Malindi, Kenya",
    title: "Malindi Solar Project",
    capacity: "52 MW Utility Solar",
    desc: "A major utility-scale solar plant near Malindi developed by Globeleq, supplying the Kenyan national grid.",
    outcome: "Adds substantial low-carbon capacity to the coastal region and supports Kenya's renewable energy targets.",
  },
  {
    img: siteInstall,
    location: "Eldoret (Kesses), Kenya",
    title: "Kesses Solar Project",
    capacity: "40 MW Utility Solar",
    desc: "A utility-scale solar plant located in Eldoret, improving energy access and grid reliability across the Rift Valley.",
    outcome: "Strengthens energy access for the Rift Valley and supports industrial growth in western Kenya.",
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

      {/* KENYA LANDMARK SOLAR PROJECTS */}
      <section className="py-20 bg-gradient-soft border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">
              Landmark Kenyan solar plants
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Powering the nation, <span className="text-gradient-bridge">megawatt by megawatt</span>.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              The utility-scale projects shaping Kenya's renewable energy future — and inspiring the work we do.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {KENYA_LANDMARKS.map((p, i) => (
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
                    <Zap className="h-3 w-3 text-[color:var(--sun-deep)]" /> {p.capacity}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-5 flex gap-2.5 rounded-2xl border border-[color:var(--leaf-deep)]/20 bg-[color:var(--leaf-deep)]/5 p-3">
                    <Sparkles className="h-4 w-4 shrink-0 text-[color:var(--leaf-deep)] mt-0.5" />
                    <p className="text-xs text-foreground/85 leading-relaxed">{p.outcome}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
