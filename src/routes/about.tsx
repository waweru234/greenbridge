import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Globe2, GraduationCap, Mail, Award, Quote, CheckCircle2, Link2, Leaf, Lightbulb, ShieldCheck, HandHeart, Sparkles } from "lucide-react";

import jimsley from "@/assets/jinsley Omari.png";
import story1 from "@/assets/uploads/story-1.jpg";
import story2 from "@/assets/uploads/story-2.jpg";
import story3 from "@/assets/uploads/story-3.jpg";
import story4 from "@/assets/uploads/story-4.jpg";
import pumpOpsVideo from "@/assets/new ones/istockphoto-881095546-640_adpp_is.mp4";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Greenbridge Energy" },
      { name: "description", content: "Meet the leadership behind Greenbridge Energy and learn how we bridge UK engineering with Africa's renewable potential." },
      { property: "og:title", content: "About Greenbridge Energy" },
      { property: "og:description", content: "Bridging UK engineering with Africa's renewable potential." },
    ],
  }),
  component: AboutPage,
});

const LEADERS = [
  {
    name: "Jimsley Omari",
    role: "Founder & Director",
    photo: jimsley,
    creds: ["PhD, Mechanical Engineering", "Energy Systems & Infrastructure"],
    bio: "PhD Mechanical Engineer with experience in energy systems, infrastructure, and business development. Jimsley brings a strong technical background and a strategic vision to bridge energy solutions between developed and emerging markets. He is passionate about sustainable development and expanding access to clean energy across Africa.",
  },
];

const CERTIFICATIONS = [
  { name: "MCS", full: "Microgeneration Certification Scheme", region: "United Kingdom" },
  { name: "RECC", full: "Renewable Energy Consumer Code", region: "United Kingdom" },
  { name: "HIES", full: "Home Insulation & Energy Systems", region: "United Kingdom" },
  { name: "Solar Energy UK", full: "Industry Membership", region: "United Kingdom" },
] as const;

const TESTIMONIALS = [
  {
    quote: "Greenbridge Energy transformed our business by providing a reliable solar solution. We've cut costs significantly.",
    author: "Business Owner",
    location: "Nairobi, Kenya",
  },
  {
    quote: "Professional, efficient, and highly knowledgeable team.",
    author: "Homeowner",
    location: "United Kingdom",
  },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <video
          src={pumpOpsVideo}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/40 to-black/60" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold uppercase tracking-wider text-white/85">About us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-5xl md:text-6xl font-semibold leading-tight text-white">
            A bridge built from <span className="text-[color:var(--sun)]">sun, wind & purpose</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            Greenbridge Energy Limited is a renewable energy company focused on solar power, battery storage, and off-grid energy solutions - operating between the UK and Africa to bridge the energy gap with modern, sustainable technology.
          </motion.p>
        </div>
      </section>

      {/* About Us — narrative */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              <img src={story1} alt="Solar installation in progress" className="rounded-2xl shadow-soft w-full h-56 object-cover" loading="lazy" />
              <img src={story2} alt="Wind power generation" className="rounded-2xl shadow-soft w-full h-56 object-cover mt-8" loading="lazy" />
              <img src={story3} alt="Community solar lighting" className="rounded-2xl shadow-soft w-full h-56 object-cover -mt-4" loading="lazy" />
              <img src={story4} alt="Engineering team on site" className="rounded-2xl shadow-soft w-full h-56 object-cover mt-4" loading="lazy" />
            </div>
            <motion.div
              className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[color:var(--sun)] blur-3xl opacity-40 -z-10"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">About us</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">Two continents. <span className="text-gradient-bridge">One energy story.</span></h2>
            <p className="mt-5 text-muted-foreground leading-relaxed text-[1.02rem]">
              Greenbridge Energy Limited is a renewable energy company focused on solar power, battery storage, and off-grid energy solutions. Operating between the UK and Africa, we specialize in designing and deploying systems that address both advanced energy efficiency needs and energy access challenges.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-[1.02rem]">
              In the UK, we provide compliant, high-quality solar installations for residential and commercial clients. In Africa, we focus on off-grid and hybrid systems that bring reliable electricity to underserved communities and businesses.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-[1.02rem]">
              Our approach combines engineering expertise, global partnerships, and a strong commitment to sustainability — turning sunshine and wind into power, opportunity and lasting change.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                Icon: Target,
                t: "Mission Statement",
                d: "Greenbridge Energy Limited is committed to delivering reliable, affordable, and sustainable energy solutions across the United Kingdom and Africa. We bridge the energy gap by deploying modern renewable technologies that empower communities, support businesses, and accelerate the transition to a low-carbon future.",
              },
              {
                Icon: Eye,
                t: "Vision",
                d: "To become a leading cross-continental renewable energy company, transforming how energy is generated, distributed, and consumed in emerging and developed markets.",
              },
            ].map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl bg-card p-8 md:p-10 shadow-soft hover:shadow-glow transition-shadow"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-bridge text-white shadow-sun">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-3xl font-semibold">{t}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed text-[1.02rem]">{d}</p>
              </motion.div>
            ))}
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto">
              <Heart className="h-9 w-9 mx-auto text-[color:var(--leaf-deep)]" />
              <h3 className="mt-3 text-3xl md:text-4xl font-semibold">Our Core Values</h3>
              <p className="mt-3 text-muted-foreground">The five principles guiding every project we deliver.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { Icon: Leaf, t: "Sustainability", d: "Engineering for the planet, not just the project." },
                { Icon: Lightbulb, t: "Innovation", d: "Smarter systems, better outcomes." },
                { Icon: ShieldCheck, t: "Integrity", d: "Honest engineering and transparent delivery." },
                { Icon: HandHeart, t: "Accessibility", d: "Clean energy within reach of every community." },
                { Icon: Sparkles, t: "Impact-driven", d: "Solutions measured by the change they create." },
              ].map((v, i) => (
                <motion.div
                  key={v.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-card p-5 shadow-soft hover:shadow-glow transition-all border border-border"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-bridge text-white shadow-sun">
                    <v.Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-3 font-semibold">{v.t}</h4>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{v.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Leadership</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              The people <span className="text-gradient-bridge">behind the bridge</span>.
            </motion.h2>
            <p className="mt-5 text-muted-foreground text-lg">Engineers, strategists and changemakers driving Greenbridge's mission across two continents.</p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
            {LEADERS.map((leader, i) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative rounded-[2rem] bg-card shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden md:col-span-2"
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Photo */}
                  <div className="relative md:col-span-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-bridge opacity-20 mix-blend-multiply z-10 pointer-events-none" />
                    <img
                      src={leader.photo}
                      alt={`Portrait of ${leader.name}`}
                      className="w-full h-full min-h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={896}
                      height={1152}
                    />
                    <motion.div
                      className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[color:var(--sun)] blur-3xl opacity-40"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-[color:var(--forest)]">
                      <GraduationCap className="h-3.5 w-3.5 text-[color:var(--leaf-deep)]" />
                      {leader.role}
                    </div>
                    <h3 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight">{leader.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {leader.creds.map((c) => (
                        <span key={c} className="text-xs font-medium rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 text-muted-foreground leading-relaxed text-[15px]">{leader.bio}</p>

                    <div className="mt-6 flex items-center gap-3">
                      <a
                        href="mailto:hello@greenbridge.energy"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-bridge text-white px-4 py-2 text-sm font-semibold shadow-sun hover:opacity-95 transition"
                      >
                        <Mail className="h-4 w-4" /> Contact
                      </a>
                      <a
                        href="#"
                        aria-label="LinkedIn"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-[color:var(--leaf-deep)] hover:border-[color:var(--leaf-deep)] transition"
                      >
                        <Link2 className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <Award className="h-10 w-10 mx-auto text-[color:var(--leaf-deep)]" />
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              Credentials & <span className="text-gradient-bridge">Certifications</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg">
              Our work is aligned with recognized UK renewable-energy standards and professional accreditation frameworks.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-3xl bg-card p-6 shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-bridge text-white shadow-sun">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-tight">{c.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.full}</p>
                <p className="mt-3 text-xs font-medium text-[color:var(--leaf-deep)]">{c.region}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            <CheckCircle2 className="inline h-4 w-4 mr-1 text-[color:var(--leaf-deep)] -mt-0.5" />
            All projects already delivered to ISO-aligned engineering standards.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">Testimonials</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight">
              What our <span className="text-gradient-bridge">clients say</span>.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.author + t.location}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-3xl bg-card p-8 md:p-10 shadow-soft hover:shadow-glow transition-shadow"
              >
                <Quote className="absolute -top-4 left-8 h-10 w-10 text-[color:var(--sun)] drop-shadow" />
                <blockquote className="text-lg md:text-xl leading-relaxed font-medium text-foreground/90">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-bridge text-white inline-flex items-center justify-center font-semibold shadow-sun">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Two continents */}
      <section className="py-20 bg-gradient-soft">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Globe2 className="h-10 w-10 mx-auto text-[color:var(--leaf-deep)]" />
          <h2 className="mt-4 text-4xl font-semibold">Two continents. <span className="text-gradient-bridge">One mission.</span></h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            From offices in London and Nairobi, our engineers and project teams collaborate around the clock to deliver renewable infrastructure that performs — and lasts.
          </p>
        </div>
      </section>
    </>
  );
}

