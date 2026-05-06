// src/sections/ExperienceSection.jsx
// Week 4 — Experience Section
// • GSAP ScrollTrigger vertical timeline
// • Animated line draw on scroll (scrub)
// • Card reveals with stagger
// • Matches About/Projects section conventions

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

const EXPERIENCES = [
    {
        id: 1,
        type: "work",
        period: "Jan 2023 – Jun 2023",
        duration: "6 months",
        title: "Full Stack Development Intern",
        company: "Paarsh InfoTech Pvt. Ltd.",
        location: "Nashik, Maharashtra",
        description:
            "Built and maintained full-stack web applications in a professional team environment. Took ownership of backend logic, database integration, and frontend UI — from requirements to deployment.",
        highlights: [
            "Developed full-stack web apps using Java, SQL, HTML, CSS, and JavaScript",
            "Implemented RESTful backend logic and integrated relational MySQL databases",
            "Collaborated with senior developers to design scalable, maintainable architectures",
            "Debugged production issues and optimised application performance under mentorship",
        ],
        tags: ["Java", "SQL", "HTML", "CSS", "JavaScript", "MySQL", "REST APIs"],
        icon: "💼",
        color: "indigo",
        accentColor: "#6366f1",
        gradient: "from-indigo-500 to-violet-600",
    },
    {
        id: 2,
        type: "education",
        period: "Aug 2024 – Aug 2025",
        duration: "1 year",
        title: "Professional Certification",
        company: "JSpiders — Java Training & Development",
        location: "Certificate No. JSP-25-G103",
        description:
            "Completed an intensive industry-focused program covering the full Java ecosystem — from Core Java fundamentals to J2EE enterprise patterns, modern frameworks, and React JS frontend development.",
        highlights: [
            "Core Java & OOP — Collections, Exception Handling, Multithreading",
            "J2EE — Servlets, JSP, JDBC, Spring Boot, Hibernate / JPA",
            "Web Technology — HTML, CSS, JavaScript, ReactJS",
            "SQL — MySQL, query optimisation, relational database design",
        ],
        tags: ["Core Java", "J2EE", "Spring Boot", "Hibernate", "React JS", "MySQL", "JDBC"],
        icon: "🏅",
        color: "violet",
        accentColor: "#8b5cf6",
        gradient: "from-violet-500 to-purple-600",
    },
];

// ── Color maps ────────────────────────────────────────────────────────────────

const COLOR = {
    indigo: {
        dot: "bg-indigo-500",
        ring: "ring-indigo-500/30",
        shadow: "shadow-indigo-500/20",
        badge: "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 ring-indigo-200 dark:ring-indigo-500/30",
        tag: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        highlight: "text-indigo-500 dark:text-indigo-400",
        border: "border-indigo-100 dark:border-indigo-500/20",
    },
    violet: {
        dot: "bg-violet-500",
        ring: "ring-violet-500/30",
        shadow: "shadow-violet-500/20",
        badge: "bg-violet-50 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 ring-violet-200 dark:ring-violet-500/30",
        tag: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
        highlight: "text-violet-500 dark:text-violet-400",
        border: "border-violet-100 dark:border-violet-500/20",
    },
};

// ── Type badge ────────────────────────────────────────────────────────────────

function TypeBadge({ type }) {
    if (type === "work") {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
        bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400
        ring-1 ring-emerald-200 dark:ring-emerald-500/30 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Work
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
      bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400
      ring-1 ring-amber-200 dark:ring-amber-500/30 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Certification
        </span>
    );
}

// ── Experience Card ───────────────────────────────────────────────────────────

function ExperienceCard({ exp, index }) {
    const cardRef = useRef(null);
    const dotRef = useRef(null);
    const c = COLOR[exp.color];

    useEffect(() => {
        const card = cardRef.current;
        const dot = dotRef.current;
        if (!card || !dot) return;

        // Card slide-in from left
        gsap.fromTo(
            card,
            { opacity: 0, x: -48, y: 16 },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 87%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // Dot pop-in
        gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.45,
                ease: "back.out(2)",
                delay: 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 87%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <div className="relative flex gap-6 md:gap-10 pl-10 md:pl-14">

            {/* ── Timeline dot ── */}
            <div
                ref={dotRef}
                className={`absolute left-0 top-6 w-5 h-5 rounded-full shrink-0
          ${c.dot} ring-4 ${c.ring} ring-offset-2
          ring-offset-zinc-50 dark:ring-offset-zinc-900
          shadow-lg ${c.shadow} z-10`}
            />

            {/* ── Card ── */}
            <div
                ref={cardRef}
                className={`w-full rounded-2xl overflow-hidden
          bg-white dark:bg-zinc-900
          border border-zinc-100 dark:border-zinc-800
          shadow-sm hover:shadow-xl hover:shadow-black/5
          transition-shadow duration-300 group`}
            >
                {/* Gradient top bar */}
                <div className={`h-1 bg-linear-to-r ${exp.gradient}`} />

                <div className="p-5 md:p-6">

                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl select-none">{exp.icon}</span>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <TypeBadge type={exp.type} />
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 ${c.badge}`}>
                                        {exp.duration}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight">
                                    {exp.title}
                                </h3>
                                <p className={`text-xs font-semibold mt-0.5 ${c.highlight}`}>
                                    {exp.company}
                                </p>
                            </div>
                        </div>

                        {/* Period + location */}
                        <div className="text-right shrink-0">
                            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                {exp.period}
                            </p>
                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 flex items-center justify-end gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {exp.location}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                        {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className={`space-y-2 mb-4 pl-0`}>
                        {exp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                                <span
                                    className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: exp.accentColor }}
                                />
                                {h}
                            </li>
                        ))}
                    </ul>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-1.5 pt-4 border-t ${c.border}`}>
                        {exp.tags.map((tag) => (
                            <span
                                key={tag}
                                className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-md ${c.tag}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ExperienceSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const openToWorkRef = useRef(null);

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

            // Line draw on scroll scrub
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: lineRef.current,
                        start: "top 80%",
                        end: "bottom 30%",
                        scrub: 0.8,
                    },
                }
            );

            // "Open to work" banner
            gsap.fromTo(
                openToWorkRef.current,
                { opacity: 0, y: 24, scale: 0.97 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: openToWorkRef.current,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative py-24 md:py-32
        bg-white dark:bg-zinc-950 overflow-hidden"
        >
            {/* Ambient blobs */}
            <div className="absolute top-0 right-0 w-150 h-150 rounded-full
        bg-violet-100/30 dark:bg-violet-950/20 blur-[130px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full
        bg-indigo-100/20 dark:bg-indigo-950/15 blur-[100px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 lg:px-24">

                {/* ── Section header ── */}
                <div ref={headingRef} className="mb-12">
                    <span className="text-xs font-semibold tracking-widest uppercase
            text-indigo-500 dark:text-indigo-400">
                        Experience
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold
            text-zinc-900 dark:text-white leading-tight">
                        Where I've{" "}
                        <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
              bg-clip-text text-transparent">
                            learned & grown
                        </span>
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
                        Real-world internship experience and industry certification that shaped
                        how I think about building software.
                    </p>
                </div>

                {/* ── Timeline ── */}
                <div className="relative">

                    {/* Vertical line */}
                    <div
                        ref={lineRef}
                        className="absolute left-2.25 top-0 bottom-0 w-px
              bg-linear-to-b from-indigo-500 via-violet-500 to-purple-600
              origin-top"
                    />

                    <div className="flex flex-col gap-10 md:gap-12">
                        {EXPERIENCES.map((exp, i) => (
                            <ExperienceCard key={exp.id} exp={exp} index={i} />
                        ))}
                    </div>
                </div>

                {/* ── Open to work banner ── */}
                <div ref={openToWorkRef} className="mt-12 ml-10 md:ml-14">
                    <div className="relative overflow-hidden rounded-2xl p-5 md:p-6
            bg-linear-to-r from-indigo-500/10 via-violet-500/10 to-purple-600/10
            dark:from-indigo-500/15 dark:via-violet-500/15 dark:to-purple-600/15
            border border-indigo-100 dark:border-indigo-500/20">

                        {/* Decorative glow */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full
              bg-linear-to-br from-indigo-400/20 to-violet-500/20 blur-2xl" />

                        <div className="relative flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🚀</span>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                                            Open to Work
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-zinc-800 dark:text-white">
                                        Available for Full Stack Java Developer roles
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                        Spring Boot · React · MySQL · REST APIs
                                    </p>
                                </div>
                            </div>

                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl
                  text-sm font-bold text-white
                  bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
                  shadow-lg shadow-indigo-500/30
                  hover:shadow-indigo-500/50 transition-shadow duration-200 group"
                            >
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  bg-linear-to-r from-transparent via-white/20 to-transparent
                  transition-transform duration-500 ease-in-out" />
                                Let's Talk
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}