"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type CalculatorForm = {
  industry: string;
  teamSize: string;
  companySize: string;
  challenge: string;
  hours: string;
};

const regions = ["Europe", "USA", "Middle East", "Asia"];

const services = [
  ["AI Strategy", "Clarify the highest-value AI opportunities and a practical roadmap."],
  ["AI Product Consulting", "Define the right product, users, workflows, and business model."],
  ["Enterprise AI", "Design secure systems that can survive real enterprise scrutiny."],
  ["AI Agents", "Ship reliable agents for support, operations, and internal productivity."],
  ["Workflow Automation", "Remove repetitive work across teams and functions."],
  ["SaaS Development", "Build premium, scalable software products from concept to launch."],
  ["Custom Dashboards", "Turn operational data into executive-ready visibility."],
  ["Cloud Deployment", "Deploy production-grade solutions across modern cloud stacks."],
];

const processSteps = [
  "Discovery",
  "Research",
  "Strategy",
  "Architecture",
  "Design",
  "Development",
  "Testing",
  "Deployment",
  "Optimization",
];

const projects = [
  {
    name: "GlobalChainHub",
    title: "Enterprise Supply Chain Platform",
    tech: ["Next.js", "Python", "Azure", "PostgreSQL"],
    problem: "Fragmented partner workflows and slow visibility across the supply chain.",
    impact: "34% faster exception handling and a single command center for operations.",
    roi: "€420k annual operating impact",
  },
  {
    name: "AI Automation Suite",
    title: "AI CRM and workflow engine",
    tech: ["OpenAI", "n8n", "Supabase", "Vercel"],
    problem: "Sales and operations teams were wasting hours on manual handoffs and updates.",
    impact: "Cut repetitive CRM work by 61% and increased follow-up speed across the pipeline.",
    roi: "3.2x first-year return",
  },
  {
    name: "Knowledge Assistant",
    title: "Executive knowledge platform",
    tech: ["LangGraph", "Claude", "MCP", "Docker"],
    problem: "Critical knowledge was hidden in documents, calls, and long internal threads.",
    impact: "Enabled natural-language retrieval for leadership and project teams.",
    roi: "19 hours saved per week",
  },
  {
    name: "Analytics Dashboard",
    title: "Board-ready metrics suite",
    tech: ["React", "TypeScript", "Google Cloud", "BigQuery"],
    problem: "The leadership team lacked a fast way to track business health across markets.",
    impact: "Unified KPIs across regions with one secure and elegant reporting surface.",
    roi: "Decision cycles reduced from days to hours",
  },
];

const industries = [
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Logistics",
  "Real Estate",
  "Education",
  "Government",
  "Professional Services",
];

const techStack = [
  "OpenAI",
  "Claude",
  "Gemini",
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Supabase",
  "Docker",
  "AWS",
  "Azure",
  "Google Cloud",
  "Vercel",
  "PostgreSQL",
  "LangGraph",
  "MCP",
  "n8n",
];

const testimonials = [
  {
    company: "Northstar Ops",
    quote:
      "Rahul translated our AI ambitions into a concrete product and delivery plan that the board could actually approve.",
    person: "Chief Operating Officer",
  },
  {
    company: "Aurelia Health",
    quote:
      "He brought rare balance: strategic thinking, product judgment, and the discipline to ship secure enterprise software.",
    person: "VP Digital Transformation",
  },
  {
    company: "Arcline Group",
    quote:
      "The engagement felt like a partner, not a vendor. We left with a roadmap, a prototype, and confidence to execute.",
    person: "Founder",
  },
];

const insights = [
  {
    title: "The AI operating model for mid-market teams",
    category: "AI trends",
  },
  {
    title: "When to build, buy, or blend enterprise AI tools",
    category: "Case studies",
  },
  {
    title: "How product strategy should shape AI implementation",
    category: "Product strategy",
  },
];

const globalDelivery = [
  {
    title: "Global clients",
    subtitle: "Europe, USA, Middle East, Asia",
    emphasis: true,
  },
  { title: "Rahul", subtitle: "AI Product Consultant", emphasis: true },
  { title: "Strategy", subtitle: "Discovery", emphasis: false },
  { title: "Product Vision", subtitle: "Business Consulting", emphasis: false },
  { title: "AI Architecture", subtitle: "Engineering Direction", emphasis: false },
  { title: "Global Engineering Team", subtitle: "Frontend · Backend · AI · Cloud", emphasis: true },
  { title: "Security & Compliance", subtitle: "Testing · GDPR · Governance", emphasis: false },
  { title: "Deployment", subtitle: "Monitoring · Automation", emphasis: false },
  { title: "Growth", subtitle: "Maintenance · Optimization · AI Evolution", emphasis: false },
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-[var(--foreground)] sm:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">{description}</p>
    </div>
  );
}

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 22 });
  const rounded = useTransform(spring, (value) => Math.round(value));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) {
      mv.set(end);
    }
  }, [end, inView, mv]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (value) => {
      setDisplay(String(value));
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function GlowingIcon({ index }: { index: number }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/70 text-sm text-slate-950 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:bg-slate-950/70 dark:text-white">
      <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.35),transparent_60%)] opacity-80" />
      <span className="relative font-semibold">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const heroX = useTransform(pointerX, [-0.5, 0.5], [-20, 20]);
  const heroY = useTransform(pointerY, [-0.5, 0.5], [-20, 20]);
  const [form, setForm] = useState<CalculatorForm>({
    industry: "Professional Services",
    teamSize: "25",
    companySize: "Mid-market",
    challenge: "Manual operations",
    hours: "160",
  });
  const [results, setResults] = useState<null | {
    opportunities: string;
    savings: string;
    roadmap: string;
    timeline: string;
  }>(null);

  const parallax = useMemo(
    () => ({
      onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => {
        if (!heroRef.current) return;
        const bounds = heroRef.current.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        pointerX.set(x);
        pointerY.set(y);
      },
      onMouseLeave: () => {
        pointerX.set(0);
        pointerY.set(0);
      },
    }),
    [pointerX, pointerY],
  );

  const calculateOpportunity = () => {
    const hours = Number(form.hours || 0);
    const team = Number(form.teamSize || 1);
    const savings = Math.round(hours * 145 * Math.max(1.2, team / 12));
    const operationsScore = Math.min(5, Math.max(2, Math.round(hours / 40)));

    setResults({
      opportunities: `${operationsScore} high-value automation opportunities`,
      savings: `Estimated annual savings of €${savings.toLocaleString()}`,
      roadmap:
        form.challenge === "Manual operations"
          ? "AI intake, workflow orchestration, and executive reporting"
          : form.challenge === "Sales enablement"
            ? "Knowledge assistant, lead qualification, and CRM augmentation"
            : "Data consolidation, decision support, and intelligent automation",
      timeline: team > 50 ? "10-14 weeks for first delivery wave" : "6-10 weeks for first delivery wave",
    });
  };

  return (
    <main className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-0 -z-10 noise-layer opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.24),transparent_45%),radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.18),transparent_30%)]" />

      <section
        ref={heroRef}
        className="section-shell relative px-6 pb-20 pt-8 sm:px-10 lg:px-12 lg:pb-28 lg:pt-12"
        onMouseMove={parallax.onMouseMove}
        onMouseLeave={parallax.onMouseLeave}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <header className="flex items-center justify-between gap-6 rounded-full border border-white/10 bg-white/60 px-5 py-3 text-sm backdrop-blur-xl dark:bg-slate-950/55">
            <div>
              <p className="font-semibold tracking-[0.22em] uppercase">Rahul</p>
              <p className="text-xs text-[var(--muted)]">AI Product Consultant · AI Entrepreneur · Founder</p>
            </div>
                    <nav className="hidden items-center gap-6 text-xs text-[var(--muted)] md:flex">
                      <a href="#services">Services</a>
                      <a href="#contact">Contact</a>
                    </nav>
                    <a
                      href="mailto:rahulinberlinn@gmail.com"
                      className="rounded-full bg-slate-950 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:bg-slate-900 dark:bg-white dark:text-slate-950"
                    >
                      Email Rahul
                    </a>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <motion.div
              style={{ x: heroX, y: heroY }}
              className="relative max-w-4xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/65 px-4 py-2 text-xs text-[var(--muted)] backdrop-blur-xl dark:bg-slate-950/55">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.85)]" />
                Europe · North America · Middle East · Global Delivery
              </div>
              <h1 className="max-w-4xl text-balance text-[clamp(2.75rem,5.6vw,4.8rem)] font-semibold leading-tight tracking-tight">
                Building intelligent AI products that transform businesses.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
                I help startups, SMEs and enterprises define strategy, build AI products, and scale reliable automation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:rahulinberlinn@gmail.com"
                  className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_rgba(14,165,233,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(14,165,233,0.3)] dark:bg-white dark:text-slate-950"
                >
                  Get in touch
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  ["25+", "markets reached"],
                  ["€M", "in automation value unlocked"],
                  ["6-10w", "typical first delivery wave"],
                ].map(([value, label]) => (
                  <div key={label} className="glass-panel rounded-[1.75rem] p-5">
                    <div className="text-3xl font-semibold tracking-tight">{value}</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.28),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.25),transparent_40%)] blur-2xl" />
              <div className="glass-panel glow-ring relative overflow-hidden rounded-[2.5rem] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.18)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),transparent_30%,transparent_70%,rgba(255,255,255,0.08))]" />
                <div className="relative grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-4 text-white dark:bg-white/92 dark:text-slate-950">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 dark:text-cyan-700">Delivery model</p>
                      <p className="mt-6 text-2xl font-semibold">Consulting + product + engineering</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/60 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Focus</p>
                      <p className="mt-6 text-2xl font-semibold">Revenue, efficiency, and trust</p>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/70 p-5 dark:bg-slate-950/65">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Capabilities</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[var(--muted)] sm:grid-cols-3">
                      {[
                        "AI Strategy",
                        "Enterprise AI",
                        "Automation",
                        "Product Vision",
                        "Cloud",
                        "Security",
                      ].map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/70 px-3 py-2 text-center dark:bg-white/5">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/70 p-5 dark:bg-slate-950/65">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[var(--muted)]">Engagement style</p>
                      <p className="text-sm font-medium text-cyan-500">Board-ready, delivery-focused</p>
                    </div>
                    <div className="mt-4 h-24 rounded-[1.25rem] bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.34),transparent_30%),radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.36),transparent_34%),linear-gradient(135deg,rgba(8,10,16,0.94),rgba(18,22,35,0.88))]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="global-model" className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Global delivery model"
            title="A consulting-led operating model that scales from strategy to deployment."
            description="This is the signature operating model: clients engage Rahul for strategic clarity, then move through architecture, engineering, governance, and continuous optimization with one coordinated team."
          />

          <div className="mx-auto mt-14 max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/60 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:bg-slate-950/60 sm:p-10">
            <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
              {globalDelivery.map((item, index) => (
                <RevealCard key={item.title} delay={index * 0.04}>
                  <div className={`glass-panel relative overflow-hidden rounded-[1.75rem] p-5 ${item.emphasis ? "lg:col-span-3" : ""}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.1),transparent_30%,transparent_70%,rgba(139,92,246,0.08))]" />
                    <div className="relative flex items-center gap-4">
                      <GlowingIcon index={index} />
                      <div>
                        <p className="text-lg font-semibold">{item.title}</p>
                        <p className="text-sm text-[var(--muted)]">{item.subtitle}</p>
                      </div>
                    </div>
                    {index < globalDelivery.length - 1 ? (
                      <div className="mt-5 h-px w-full timeline-line opacity-60" />
                    ) : null}
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive world map removed per request */}

      <section id="services" className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="My services"
            title="Everything is designed around strategy, execution, and measurable business value."
            description="Each engagement starts with the business problem and ends with a system that actually ships, scales, and gets adopted."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {services.map(([title, description], index) => (
              <RevealCard key={title} delay={index * 0.03}>
                <div className="glass-panel group h-full rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(14,165,233,0.12)]">
                  <div className="mb-5 flex items-center justify-between">
                    <GlowingIcon index={index} />
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[var(--muted)]">Premium</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="AI opportunity calculator"
            title="Estimate where AI can remove work, save cost, and create leverage."
            description="This fast assessment turns operational context into a practical first-pass AI roadmap."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  Industry
                  <select
                    value={form.industry}
                    onChange={(event) => setForm({ ...form, industry: event.target.value })}
                    className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none dark:bg-slate-950/70"
                  >
                    {industries.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm">
                  Team Size
                  <input
                    value={form.teamSize}
                    onChange={(event) => setForm({ ...form, teamSize: event.target.value })}
                    className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none dark:bg-slate-950/70"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  Company Size
                  <select
                    value={form.companySize}
                    onChange={(event) => setForm({ ...form, companySize: event.target.value })}
                    className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none dark:bg-slate-950/70"
                  >
                    {[
                      "Startup",
                      "SME",
                      "Mid-market",
                      "Enterprise",
                    ].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm">
                  Current Challenges
                  <select
                    value={form.challenge}
                    onChange={(event) => setForm({ ...form, challenge: event.target.value })}
                    className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none dark:bg-slate-950/70"
                  >
                    {[
                      "Manual operations",
                      "Sales enablement",
                      "Support overload",
                      "Data fragmentation",
                    ].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm sm:col-span-2">
                  Hours spent on repetitive work per month
                  <input
                    value={form.hours}
                    onChange={(event) => setForm({ ...form, hours: event.target.value })}
                    className="rounded-2xl border border-white/10 bg-white/70 px-4 py-3 outline-none dark:bg-slate-950/70"
                  />
                </label>
              </div>
              <button
                onClick={calculateOpportunity}
                className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
              >
                Calculate
              </button>
            </div>

            <AnimatePresence mode="wait">
              {results ? (
                <motion.div
                  key="calculator-results"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  className="glass-panel rounded-[2rem] p-6 sm:p-8"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Estimated outputs</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {[
                      results.opportunities,
                      results.savings,
                      results.roadmap,
                      results.timeline,
                    ].map((item) => (
                      <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/70 p-5 dark:bg-slate-950/70">
                        <p className="text-sm leading-7 text-[var(--muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
                  >
                    Book Free AI Strategy Session
                  </a>
                </motion.div>
              ) : (
                <div className="glass-panel flex min-h-[20rem] items-center justify-center rounded-[2rem] p-6 text-center text-[var(--muted)]">
                  Run the calculator to reveal opportunities, savings, and a roadmap.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Process timeline"
            title="A disciplined timeline that moves from discovery to optimization."
            description="This is intentionally structured to feel like a board-level program rather than a loose creative project."
          />
          <div className="mt-16 overflow-x-auto pb-4">
            <div className="relative min-w-[920px] rounded-[2rem] border border-white/10 bg-white/60 p-6 dark:bg-slate-950/60">
              <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 timeline-line opacity-80" />
              <div className="relative grid grid-cols-9 gap-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/80 shadow-lg dark:bg-slate-950/80">
                      <span className="text-sm font-semibold text-cyan-500">{index + 1}</span>
                    </div>
                    <p className="text-sm font-medium">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects / case studies removed — will add live project when provided */}

      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Technology stack"
            title="A modern delivery stack that supports AI systems, products, and enterprise infrastructure."
            description="Floating tags keep the section light while signaling depth across model providers, cloud platforms, and product tooling."
          />
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                className="glass-panel rounded-full px-4 py-2 text-sm font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Industries"
            title="Experience across regulated, operational, and high-growth sectors."
            description="The value proposition stays consistent: practical AI that improves decision-making, productivity, and execution quality."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {industries.map((industry, index) => (
              <RevealCard key={industry} delay={index * 0.03}>
                <div className="glass-panel rounded-[1.5rem] px-5 py-6 text-center text-lg font-medium transition hover:-translate-y-1">
                  {industry}
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why work with Rahul"
            title="Business-first thinking, enterprise delivery, and global execution."
            description="The positioning is deliberate: strategic enough for executives, hands-on enough to ship, and structured enough for enterprise environments."
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {[
              ["Business First", "Technology should create measurable business value."],
              ["Enterprise Mindset", "Scalable, secure, production-ready systems."],
              ["Global Delivery", "Consulting from Europe. Engineering from India. Worldwide execution."],
            ].map(([title, description], index) => (
              <RevealCard key={title} delay={index * 0.04}>
                <div className="glass-panel h-full rounded-[1.75rem] p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                    <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">{title}</p>
                  </div>
                  <p className="text-lg font-medium leading-8">{description}</p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Testimonials"
            title="Client feedback that reflects trust, clarity, and delivery quality."
            description="Presented like a luxury brand carousel, but built with simple, accessible motion and strong hierarchy."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <RevealCard key={testimonial.company} delay={index * 0.05}>
                <div className="glass-panel h-full rounded-[2rem] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{testimonial.company}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{testimonial.person}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-[linear-gradient(135deg,rgba(14,165,233,0.5),rgba(139,92,246,0.45))]" />
                  </div>
                  <p className="mt-6 text-lg leading-8 text-[var(--muted)]">“{testimonial.quote}”</p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Insights"
            title="Thought leadership for founders and decision-makers exploring AI adoption."
            description="Latest articles and case studies positioned as useful, high-signal reading rather than generic blog filler."
          />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {insights.map((insight, index) => (
              <RevealCard key={insight.title} delay={index * 0.04}>
                <div className="glass-panel rounded-[1.75rem] p-6 transition hover:-translate-y-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">{insight.category}</p>
                  <h3 className="mt-4 text-xl font-semibold leading-8">{insight.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    A concise, executive-friendly breakdown of the ideas shaping product strategy and AI delivery.
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.18),transparent_28%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Contact</p>
                <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                  Ready to Transform Your Business with AI?
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  If you need a clear AI strategy, a product roadmap, or a partner to design and ship enterprise-grade
                  solutions, start with a discovery call.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#contact" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-slate-950">
                    Book a Strategy Session
                  </a>
                  <a href="#contact" className="rounded-full border border-white/10 bg-white/70 px-6 py-3 text-sm font-medium dark:bg-slate-950/60">
                    Schedule Discovery Call
                  </a>
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  ["Email", "rahulinberlinn@gmail.com"],
                  ["LinkedIn", "linkedin.com/in/rahulai"],
                  ["GitHub", "github.com/rahulai"],
                  ["Calendly", "calendly.com/rahulai"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/75 px-5 py-4 dark:bg-slate-950/70">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{label}</p>
                    <p className="mt-2 text-lg font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-10 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[var(--foreground)]">rahulai.com</p>
            <p>AI Product Consultant · Founder · Enterprise Transformation</p>
          </div>
            <div className="flex flex-wrap gap-5">
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a href="#global-model">Delivery Model</a>
          </div>
        </div>
      </footer>
    </main>
  );
}