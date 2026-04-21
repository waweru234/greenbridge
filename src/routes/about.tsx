import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Globe2 } from "lucide-react";
import team from "@/assets/about-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Greenbridge Energy" },
      { name: "description", content: "Greenbridge Energy connects UK engineering with African renewable potential. Learn our mission, vision and values." },
      { property: "og:title", content: "About Greenbridge Energy" },
      { property: "og:description", content: "Bridging UK engineering with Africa's renewable potential." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-gradient-soft">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold uppercase tracking-wider text-[color:var(--leaf-deep)]">About us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-5xl md:text-6xl font-semibold leading-tight">
            A bridge built from <span className="text-gradient-bridge">sun, wind & purpose</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Greenbridge Energy Limited is a renewable energy company connecting British engineering excellence with Africa's vast solar and wind potential — accelerating the journey to a zero-carbon future on both continents.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-[2rem] overflow-hidden shadow-glow">
            <img src={team} alt="Greenbridge engineering team" className="w-full h-[460px] object-cover" loading="lazy" width={1280} height={832} />
          </motion.div>
          <div>
            <h2 className="text-4xl font-semibold">Our story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founded by engineers who saw two worlds — one rich in clean-tech know-how, the other rich in untapped renewable potential — Greenbridge exists to close that gap.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work hand-in-hand with local communities, governments and industrial partners to deliver renewable systems that don't just generate megawatts, but generate jobs, savings and lasting change.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { Icon: Target, t: "Mission", d: "To accelerate the global energy transition by delivering reliable, affordable renewable solutions across the UK and Africa." },
              { Icon: Eye, t: "Vision", d: "A world where every home, business and community is powered by clean, abundant, locally-generated energy." },
              { Icon: Heart, t: "Values", d: "Integrity in engineering. Respect for community. Relentless focus on long-term, measurable impact." },
            ].map(({ Icon, t, d }, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-3xl bg-card p-8 shadow-soft"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-bridge text-white shadow-sun">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
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
