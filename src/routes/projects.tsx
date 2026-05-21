import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Zap, Sparkles, PlayCircle } from "lucide-react";
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
import hotWaterPhoto from "@/assets/new ones/istockphoto-1033839510-612x612.jpg";
import solarPumpPhoto from "@/assets/new ones/istockphoto-1426367897-612x612.jpg";
import pressureTankPhoto from "@/assets/new ones/istockphoto-2145846502-612x612.jpg";
import pressureNetworkPhoto from "@/assets/new ones/istockphoto-2148663134-640x640.avif";
import waterKit6 from "@/assets/new ones/images (6).jfif?url";
import waterKit7 from "@/assets/new ones/images (7).jfif?url";
import tubewellVideo from "@/assets/new ones/stock-footage-water-flows-from-a-solar-powered-tubewell-beside-solar-panels-used-for-irrigating-nearby-farmland.mp4";
import pumpVideo1 from "@/assets/new ones/istockphoto-1925055660-640_adpp_is.mp4";
import pumpVideo2 from "@/assets/new ones/istockphoto-881095546-640_adpp_is.mp4";

const SITE_URL = "https://www.greenbridgeenergy.com";
const toAbsoluteUrl = (assetPath: string) => new URL(assetPath, SITE_URL).toString();

const PROJECTS_MEDIA_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/projects#webpage`,
      url: `${SITE_URL}/projects`,
      name: "Projects - Greenbridge Energy",
      description:
        "Featured renewable energy projects delivered across the UK and Africa, including solar and water-energy systems.",
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/projects#video-solar-tubewell`,
      name: "Solar-Powered Tubewell Irrigation",
      description:
        "Solar-powered tubewell pumping project delivering steady irrigation flow for farmland.",
      thumbnailUrl: [toAbsoluteUrl(solarPumpPhoto)],
      uploadDate: "2026-05-19",
      embedUrl: `${SITE_URL}/projects#solar-powered-tubewell-irrigation`,
      contentUrl: toAbsoluteUrl(tubewellVideo),
      isFamilyFriendly: true,
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/projects#video-pressure-network`,
      name: "Pressurized Non-Tower Water Supply",
      description:
        "Pressure tank and booster network pilot for stable non-tower water distribution.",
      thumbnailUrl: [toAbsoluteUrl(pressureTankPhoto)],
      uploadDate: "2026-05-19",
      embedUrl: `${SITE_URL}/projects#pressurized-non-tower-water-supply`,
      contentUrl: toAbsoluteUrl(pumpVideo1),
      isFamilyFriendly: true,
    },
    {
      "@type": "VideoObject",
      "@id": `${SITE_URL}/projects#video-solar-pump-commissioning`,
      name: "Solar Pump Commissioning and Operations",
      description:
        "Operational demonstration footage of solar-powered pumping hardware in a rural service zone.",
      thumbnailUrl: [toAbsoluteUrl(waterKit7)],
      uploadDate: "2026-05-19",
      embedUrl: `${SITE_URL}/projects#solar-pump-commissioning-and-operations`,
      contentUrl: toAbsoluteUrl(pumpVideo2),
      isFamilyFriendly: true,
    },
  ],
};

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects - Greenbridge Energy" },
      {
        name: "description",
        content:
          "Featured renewable energy projects delivered by Greenbridge across the UK and Africa, plus landmark Kenyan solar plants powering the region.",
      },
      { property: "og:title", content: "Projects - Greenbridge Energy" },
      { property: "og:description", content: "Solar, battery and hybrid systems delivered across the UK and Africa." },
    ],
  }),
  component: ProjectsPage,
});

interface Project {
  img: string;
  video?: string;
  location: string;
  title: string;
  capacity: string;
  desc: string;
  outcome: string;
  tag: string;
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const PROJECTS: Project[] = [
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
    img: solarBorehole,
    location: "Kisumu, Kenya",
    title: "Off-Grid Rural Mini-Grid",
    capacity: "15 kW Solar Mini-Grid",
    desc: "A community-scale solar mini-grid bringing dependable, clean electricity to a previously off-grid rural area.",
    outcome: "Powered 120+ homes and small businesses, unlocking new income and education opportunities.",
    tag: "Greenbridge build",
  },
  {
    img: homeLight,
    location: "UK & Kenya - Domestic",
    title: "Solar Home Lighting Roll-out",
    capacity: "Solar Lighting Kits",
    desc: "Affordable solar home lighting kits replacing kerosene lamps and grid dependence - clean, safe and instant light for every room.",
    outcome: "Brought reliable evening light to hundreds of homes - supporting study, safety and small home enterprise.",
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
    outcome: "Boosted energy availability after sunset and during cloudy weeks - true 24/7 hybrid renewable power.",
    tag: "Greenbridge build",
  },
  {
    img: hotWaterPhoto,
    location: "Nairobi & Mombasa, Kenya",
    title: "Solar Hot Water Systems",
    capacity: "Domestic & Commercial Solar Thermal",
    desc: "Solar water-heating systems for homes, lodges and institutions, integrated with insulated storage and controlled backup heating.",
    outcome: "Lowered water-heating energy bills while delivering dependable hot water every day.",
    tag: "Greenbridge water-energy",
  },
  {
    img: solarPumpPhoto,
    video: tubewellVideo,
    location: "Farmland Irrigation Corridor",
    title: "Solar-Powered Tubewell Irrigation",
    capacity: "Solar Pumping + Irrigation",
    desc: "A solar-powered tubewell pumping project delivering steady irrigation flow for nearby farmland using renewable daytime energy.",
    outcome: "Improved irrigation reliability and reduced dependence on diesel pump operation.",
    tag: "Greenbridge water-energy",
  },
  {
    img: pressureTankPhoto,
    video: pumpVideo1,
    location: "Estate Water Network Pilot",
    title: "Pressurized Non-Tower Water Supply",
    capacity: "Pressure Tank + Booster Network",
    desc: "A non-tower distribution design using pressure tanks and controlled pumping to maintain stable water delivery across users.",
    outcome: "Delivered consistent pressure and reduced downtime in the local supply network.",
    tag: "Greenbridge water-energy",
  },
  {
    img: waterKit7,
    video: pumpVideo2,
    location: "Rural Service Zone",
    title: "Solar Pump Commissioning & Operations",
    capacity: "Solar Pump Commissioning",
    desc: "Commissioning and operational demonstration of solar-powered pumping hardware for community and agricultural use.",
    outcome: "Enabled reliable daytime pumping with lower operating cost and simpler maintenance planning.",
    tag: "Greenbridge water-energy",
  },
  {
    img: pressureNetworkPhoto,
    location: "Campus & Facility Networks",
    title: "Compact Pressure Network Upgrade",
    capacity: "Pressurized Distribution Retrofit",
    desc: "Retrofit-friendly pressure-control installation supporting non-tower water delivery in dense facilities and compounds.",
    outcome: "Improved pressure stability, flow balancing and end-user water availability.",
    tag: "Greenbridge water-energy",
  },
  {
    img: waterKit6,
    location: "Community Water Points",
    title: "Water Supply Hardware Integration",
    capacity: "Pump + Tank Accessory Integration",
    desc: "Field integration of solar pumping accessories and fittings to improve reliability across distributed water points.",
    outcome: "Reduced leak points and improved service continuity in local supply lines.",
    tag: "Greenbridge water-energy",
  },
];

const KENYA_LANDMARKS = [
  {
    img: nasho,
    location: "Eastern Province, Rwanda",
    title: "Nasho Solar-Powered Irrigation Project",
    capacity: "Solar Irrigation",
    desc: "A landmark agricultural project in Rwanda's Eastern Province using solar technology to power irrigation across thousands of hectares of farmland.",
    outcome: "Powers irrigation for over 2,000 farmers - boosting food security, yields and rural livelihoods.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PROJECTS_MEDIA_STRUCTURED_DATA) }}
      />

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
              id={toSlug(p.title)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`grid gap-10 md:grid-cols-2 items-center ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-glow group">
                {p.video ? (
                  <video
                    src={p.video}
                    poster={p.img}
                    className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    aria-label={p.title}
                  />
                ) : (
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1280}
                    height={832}
                  />
                )}
                <div className="absolute top-4 left-4 glass rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                  {p.location}
                </div>
                {p.video && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 text-white px-3 py-1.5 text-xs font-semibold backdrop-blur">
                    <PlayCircle className="h-3.5 w-3.5" />
                    Video
                  </div>
                )}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-[color:var(--forest)]">
                  <Zap className="h-3.5 w-3.5 text-[color:var(--sun-deep)]" /> {p.capacity}
                </div>
                <h2 className="mt-4 text-4xl font-semibold leading-tight">{p.title}</h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{p.desc}</p>
                <div className="mt-5 rounded-2xl border border-[color:var(--leaf-deep)]/20 bg-[color:var(--leaf-deep)]/5 p-4 flex gap-3">
                  <Sparkles className="h-5 w-5 shrink-0 text-[color:var(--leaf-deep)] mt-0.5" />
                  <p className="text-sm text-foreground/85">
                    <span className="font-semibold">Outcome - </span>
                    {p.outcome}
                  </p>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{p.tag}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

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
              Landmark African solar projects
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Powering the continent, <span className="text-gradient-bridge">megawatt by megawatt</span>.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              The flagship utility-scale and agricultural solar projects shaping Africa's renewable future - and inspiring the work we do.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
