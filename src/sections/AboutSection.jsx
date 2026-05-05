// src/sections/AboutSection.jsx
// Week 3 — About section
// GSAP ScrollTrigger reveals + animated vertical timeline

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: "Feb - 2020",
    title: "Completed HSC — Science Stream",
    org: "Maharashtra State Board · 64.31%",
    desc: "Completed higher secondary with Science, laying the analytical foundation before stepping into engineering. First exposure to structured problem solving and mathematics.",
    icon: "📚",
    color: "indigo",
  },
  {
    year: "Aug - 2020",
    title: "Started B.Tech in Information Technology",
    org: "G.H. Raisoni College of Engineering & Management, Jalgaon",
    desc: "Joined the IT program and dove into core CS fundamentals — OOP, data structures, DBMS, and computer networks. Started writing Java seriously for the first time.",
    icon: "🎓",
    color: "violet",
  },
  {
    year: "Jan–Jun 2023",
    title: "Full Stack Development Intern",
    org: "Paarsh InfoTech Pvt. Ltd., Nashik",
    desc: "Built full-stack web applications using Java, SQL, HTML, CSS, and JavaScript. Implemented backend logic, integrated relational databases, and worked with a team to design scalable solutions. First real-world taste of debugging and performance optimisation.",
    icon: "💼",
    color: "purple",
  },
  {
    year: "2024",
    title: "Cancer Symptoms Detection — ML Project",
    org: "Academic Project · Role - Frontend Developer",
    desc: "Developed a machine learning system to detect early cancer symptoms using CNN, Sentence-BERT, and XGBoost. Built the full React + REST API frontend for symptom input and risk prediction. Presented at NC-ISEM-2K23 national conference. Graduated B.Tech with 68%",
    icon: "🧬",
    color: "indigo",
  },
  {
    year: "2024 - 2025(Aug)",
    title: "Professional Course Certification",
    org: "JSpiders — Java Training & Development",
    desc: "Successfully completed a comprehensive professional course covering Core Java, J2EE, SQL, Web Technology, Frameworks, and React JS. Issued by JSpiders (www.jspiders.com) on 15 August 2025.",
    icon: "🏅",
    color: "violet",
  },
  {
    year: "2025",
    title: "Expense Tracker — Full Stack",
    org: "Role - Full Stack Java Developer",
    desc: "Independently built a complete CRUD web app with Spring Boot REST APIs, MySQL, and a React frontend. Implemented search functionality, JDBC integration, JWT Token, and a clean UI.",
    icon: "⚙️",
    color: "purple",
  },
  {
    year: "2026",
    title: "Actively Seeking Full Stack Roles",
    org: "Open to Work · Java + React",
    desc: "Post-graduation and post-certification, ready to bring Spring Boot backend reliability and React frontend polish to a product team. Building this animated portfolio to demonstrate what I can ship — looking for opportunities to grow fast and contribute from day one.",
    icon: "🚀",
    color: "indigo",
  },
];

// colour maps to Tailwind classes
const COLOR = {
  indigo: {
    dot: "bg-indigo-500",
    ring: "ring-indigo-500/30",
    badge: "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 ring-indigo-200 dark:ring-indigo-500/30",
    line: "from-indigo-500",
  },
  violet: {
    dot: "bg-violet-500",
    ring: "ring-violet-500/30",
    badge: "bg-violet-50 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 ring-violet-200 dark:ring-violet-500/30",
    line: "from-violet-500",
  },
  purple: {
    dot: "bg-purple-600",
    ring: "ring-purple-500/30",
    badge: "bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 ring-purple-200 dark:ring-purple-500/30",
    line: "from-purple-600",
  },
};

// ── Timeline Item ─────────────────────────────────────────────────────────────

function TimelineItem({ item, index }) {
  const itemRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: isEven ? -48 : 48,
        y: 20,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [isEven]);

  const c = COLOR[item.color];

  return (
    <div
      ref={itemRef}
      className={`relative flex items-start gap-4 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* ── Card ── */}
      <div className={`w-full md:w-[calc(50%-2.5rem)] ${isEven ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}>
        <div
          className="group relative p-5 rounded-2xl
            bg-white dark:bg-zinc-900
            border border-zinc-100 dark:border-zinc-800
            shadow-sm hover:shadow-lg hover:shadow-indigo-500/5
            transition-shadow duration-300"
        >
          {/* year badge */}
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
              ring-1 mb-3 ${c.badge}`}
          >
            {item.year}
          </span>

          <div className={`flex items-start gap-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
            <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mt-0.5">
                {item.org}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Centre dot ── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
        <div
          className={`w-4 h-4 rounded-full ${c.dot} ring-4 ${c.ring} ring-offset-2
            ring-offset-white dark:ring-offset-zinc-950`}
        />
      </div>

      {/* Mobile left dot */}
      <div className={`flex md:hidden shrink-0 mt-1.5`}>
        <div className={`w-3 h-3 rounded-full ${c.dot} ring-2 ${c.ring}`} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bio text
      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats row
      gsap.fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timeline vertical line draw — from height 0 → full height
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32
        bg-zinc-50 dark:bg-zinc-900
        overflow-hidden"
    >
      {/* Subtle parallax bg blob */}
      <div
        className="absolute top-0 right-0 w-150 h-150 rounded-full
          bg-indigo-100/40 dark:bg-indigo-950/30
          blur-[120px] pointer-events-none z-0"
      />
      <div
        className="absolute bottom-0 left-0 w-100 h-100 rounded-full
          bg-violet-100/30 dark:bg-violet-950/20
          blur-[100px] pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">

        {/* ── Section header ── */}
        <div ref={headingRef} className="mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase
            text-indigo-500 dark:text-indigo-400">
            About Me
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold
            text-zinc-900 dark:text-white leading-tight">
            Building things that{" "}
            <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
              bg-clip-text text-transparent">
              work & feel great
            </span>
          </h2>
        </div>

        {/* ── Bio ── */}
        <p
          ref={bioRef}
          className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10"
        >
          I'm a Full Stack Developer with a strong backend foundation in{" "}
          <span className="text-zinc-900 dark:text-white font-medium">Java & Spring Boot</span>{" "}
          and a growing passion for crafting interactive, animated frontends with{" "}
          <span className="text-zinc-900 dark:text-white font-medium">React</span>. I care about
          both the architecture underneath and the experience on top — clean APIs, performant UIs,
          and transitions that make people smile.
        </p>

        {/* ── Stats row ── */}
        <div ref={statsRef} className="flex flex-wrap gap-4 mb-20">
          {[
            { value: "3+", label: "Years coding" },
            { value: "10+", label: "Projects shipped" },
            { value: "5+", label: "Tech stacks" },
            { value: "∞", label: "Curiosity" },
          ].map((s) => (
            <div
              key={s.label}
              className="px-5 py-3 rounded-xl
                bg-white dark:bg-zinc-800
                border border-zinc-100 dark:border-zinc-700
                shadow-sm"
            >
              <p className="text-2xl font-bold text-zinc-900 dark:text-white leading-none">
                {s.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold tracking-widest uppercase
            text-zinc-400 dark:text-zinc-500 mb-10">
            Journey
          </h3>

          <div className="relative">
            {/* Vertical line — desktop only, GSAP draws it */}
            <div
              ref={lineRef}
              className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0
                w-px bg-linear-to-b from-indigo-500 via-violet-500 to-purple-600
                origin-top"
            />

            {/* Mobile vertical line */}
            <div
              className="md:hidden absolute left-1.5 top-0 bottom-0
                w-px bg-linear-to-b from-indigo-500 via-violet-500 to-purple-600"
            />

            <div className="flex flex-col gap-10 md:gap-12 pl-8 md:pl-0">
              {TIMELINE.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}