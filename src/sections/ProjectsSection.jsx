// src/sections/ProjectsSection.jsx
// Week 4 — Projects
// • Real project data from GitHub + Netlify
// • Live GitHub API stats (stars, forks, language, last push)
// • 3D card flip on click — front: overview, back: full details
// • Magnetic tilt on mouse move (Framer Motion springs)
// • Filter tabs by category
// • GSAP ScrollTrigger staggered entrance
// • Glow + live demo / code links

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Icons ─────────────────────────────────────────────────────────────────────

const GitHubIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const ExternalIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ForkIcon = () => (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
);

// ── Real Project Data ─────────────────────────────────────────────────────────

const PROJECTS = [
    {
        id: 1,
        title: "Expense Tracker",
        shortDesc: "Full stack app — Spring Boot + JWT Auth + React + MySQL. Live on Netlify.",
        longDesc:
            "A complete full-stack expense tracking application. Backend built with Spring Boot, Spring Security, JWT authentication, REST APIs, and MySQL. React frontend with category-wise expense management, dashboard, and secure login/register flow. Frontend deployed on Netlify, backend on Railway.",
        category: "Full Stack",
        role: "Full Stack Java Developer",
        tags: ["Spring Boot", "React", "MySQL", "JWT Auth", "REST API", "Spring Security"],
        github: "https://github.com/ankushbadgujar002/expense-tracker-frontend",
        githubBackend: "https://github.com/ankushbadgujar002/expense-tracker-backend",
        demo: "https://expense-tracker-ankush.netlify.app",
        repoSlug: "ankushbadgujar002/expense-tracker-frontend",
        gradient: "from-emerald-500 via-teal-500 to-cyan-600",
        glowColor: "rgba(16,185,129,0.18)",
        accentColor: "#10b981",
        icon: "💰",
        featured: true,
        year: "2025",
    },
    {
        id: 2,
        title: "TechBazzar",
        shortDesc: "Frontend e-commerce with localStorage auth, cart, and product listing.",
        longDesc:
            "A frontend e-commerce platform built with HTML, CSS, and JavaScript. Client-side authentication using localStorage — users register then log in to access the products page. Features product listing, add-to-cart UI, about page, and responsive design. Deployed on Netlify and GitHub Pages.",
        category: "Frontend",
        role: "Frontend Developer",
        tags: ["HTML5", "CSS3", "JavaScript", "localStorage Auth", "Cart System"],
        github: "https://github.com/ankushbadgujar002/TechBazzar",
        githubBackend: null,
        demo: "https://techbazzar-ankush.netlify.app",
        repoSlug: "ankushbadgujar002/TechBazzar",
        gradient: "from-orange-500 via-amber-500 to-yellow-500",
        glowColor: "rgba(249,115,22,0.18)",
        accentColor: "#f97316",
        icon: "🛒",
        featured: true,
        year: "2025",
    },
    {
        id: 3,
        title: "Todo List App",
        shortDesc: "React todo app — add, delete, complete tasks with dynamic UI updates.",
        longDesc:
            "An interactive todo list application built with React.js. Features add, delete, and mark-complete on tasks with dynamic UI updates powered by React Hooks. Clean component structure with CSS styling. Deployed on GitHub Pages via GitHub Actions workflow.",
        category: "Frontend",
        role: "Frontend Developer",
        tags: ["React", "JavaScript", "CSS", "React Hooks", "GitHub Actions"],
        github: "https://github.com/ankushbadgujar002/todo-list-project",
        githubBackend: null,
        demo: "https://ankushbadgujar002.github.io/todo-list-project",
        repoSlug: "ankushbadgujar002/todo-list-project",
        gradient: "from-violet-500 via-purple-500 to-indigo-500",
        glowColor: "rgba(139,92,246,0.18)",
        accentColor: "#8b5cf6",
        icon: "✅",
        featured: false,
        year: "2025",
    },
    {
        id: 4,
        title: "Weather Forecast App",
        shortDesc: "Real-time weather using OpenWeather API — city search, temp, humidity, wind.",
        longDesc:
            "A real-time weather forecast app that fetches live data from the OpenWeather API. Search any city worldwide and get current temperature, humidity, wind speed, and weather conditions with dynamic weather icons. Built with vanilla HTML, CSS, and JavaScript — no frameworks, clean and responsive.",
        category: "Frontend",
        role: "Frontend Developer",
        tags: ["HTML5", "CSS3", "JavaScript", "OpenWeather API", "Fetch API"],
        github: "https://github.com/ankushbadgujar002/weather-forecast-app",
        githubBackend: null,
        demo: "https://weather-forecast-new.netlify.app",
        repoSlug: "ankushbadgujar002/weather-forecast-app",
        gradient: "from-sky-500 via-blue-500 to-indigo-500",
        glowColor: "rgba(14,165,233,0.18)",
        accentColor: "#0ea5e9",
        icon: "🌤️",
        featured: false,
        year: "2024",
    },
    {
        id: 5,
        title: "Employee Management System",
        shortDesc: "Spring Boot + React CRUD app with MySQL, REST APIs, search, and JDBC.",
        longDesc:
            "A full-stack employee records management system built as a minor academic project. Java Spring Boot backend exposes REST APIs for full CRUD operations. React frontend with employee search, paginated listings, and a clean UI. MySQL for data persistence via JDBC. Version controlled with Git.",
        category: "Full Stack",
        role: "Full Stack Java Developer",
        tags: ["Java", "Spring Boot", "REST API", "React", "MySQL", "JDBC", "Git"],
        github: "https://github.com/ankushbadgujar002",
        githubBackend: null,
        demo: null,
        repoSlug: null,
        gradient: "from-indigo-500 via-violet-500 to-purple-600",
        glowColor: "rgba(99,102,241,0.18)",
        accentColor: "#6366f1",
        icon: "⚙️",
        featured: false,
        year: "2024",
    },
    {
        id: 6,
        title: "Animated Portfolio",
        shortDesc: "This site — React + Vite, Three.js R3F, GSAP, Framer Motion, Lenis.",
        longDesc:
            "A fully animated single-page portfolio built with React + Vite. Three.js R3F particle hero with mouse interaction, GSAP ScrollTrigger section reveals, Framer Motion 3D card flips, Lenis smooth scroll, custom magnetic cursor, dark mode, and mobile-responsive design. Deployed on Netlify.",
        category: "Frontend",
        role: "Frontend Developer",
        tags: ["React", "Vite", "Three.js", "GSAP", "Framer Motion", "Tailwind", "Lenis"],
        github: "https://github.com/ankushbadgujar002/ankush-portfolio",
        githubBackend: null,
        demo: "https://badgujar-portfolio.netlify.app",
        repoSlug: "ankushbadgujar002/ankush-portfolio",
        gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
        glowColor: "rgba(244,63,94,0.18)",
        accentColor: "#f43f5e",
        icon: "🚀",
        featured: true,
        year: "2025",
    },
];

const FILTERS = ["All", "Full Stack", "Frontend"];

// ── GitHub Stats Hook ─────────────────────────────────────────────────────────

function useGitHubStats(repoSlug) {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!repoSlug) return;
        fetch(`https://api.github.com/repos/${repoSlug}`)
            .then((r) => r.ok ? r.json() : null)
            .then((data) => {
                if (data?.stargazers_count !== undefined) {
                    setStats({
                        stars: data.stargazers_count,
                        forks: data.forks_count,
                        language: data.language,
                        updated: new Date(data.pushed_at).toLocaleDateString("en-IN", {
                            month: "short",
                            year: "numeric",
                        }),
                    });
                }
            })
            .catch(() => { });
    }, [repoSlug]);

    return stats;
}

// ── Tilt wrapper ──────────────────────────────────────────────────────────────

function TiltCard({ children, glowColor, flipped }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const cfg = { stiffness: 180, damping: 22, mass: 0.4 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), cfg);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), cfg);
    const glowX = useSpring(useTransform(x, [-0.5, 0.5], [20, 80]), cfg);
    const glowY = useSpring(useTransform(y, [-0.5, 0.5], [20, 80]), cfg);

    const onMove = useCallback((e) => {
        if (flipped) return; // disable tilt on back face
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
    }, [x, y, flipped]);

    const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
            className="relative h-full"
        >
            {/* Glow follow */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0
          group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor} 0%, transparent 65%)`,
                }}
            />
            {children}
        </motion.div>
    );
}

// ── Single Project Card ───────────────────────────────────────────────────────

function ProjectCard({ project, index }) {
    const [flipped, setFlipped] = useState(false);
    const wrapRef = useRef(null);
    const stats = useGitHubStats(project.repoSlug);

    useEffect(() => {
        gsap.fromTo(
            wrapRef.current,
            { opacity: 0, y: 56, scale: 0.94 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.7,
                ease: "power3.out",
                delay: index * 0.12,
                scrollTrigger: {
                    trigger: wrapRef.current,
                    start: "top 89%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [index]);

    return (
        <div
            ref={wrapRef}
            className="group relative h-107.5"
            style={{ perspective: "1100px" }}
        >
            <TiltCard glowColor={project.glowColor} flipped={flipped}>
                {/* ── Flip container ── */}
                <motion.div
                    className="relative w-full h-full cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                    onClick={() => setFlipped((f) => !f)}
                >

                    {/* ════════════ FRONT ════════════ */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col
              bg-white dark:bg-zinc-900
              border border-zinc-100 dark:border-zinc-800
              shadow-sm group-hover:shadow-xl group-hover:shadow-black/10
              transition-shadow duration-300"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {/* Gradient header band */}
                        <div className={`relative h-36 shrink-0 bg-linear-to-br ${project.gradient} overflow-hidden`}>
                            {/* Decorative circles */}
                            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
                            <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full bg-white/10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-20 h-20 rounded-full bg-white/5 blur-md" />

                            {/* Top row */}
                            <div className="relative z-10 flex items-start justify-between p-4">
                                <span className="text-4xl drop-shadow-lg select-none">{project.icon}</span>
                                <div className="flex flex-col items-end gap-1.5">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full
                    bg-white/25 text-white backdrop-blur-sm tracking-wide">
                                        {project.year}
                                    </span>
                                    {project.featured && (
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full
                      bg-white/25 text-white backdrop-blur-sm">
                                            ⭐ Featured
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* GitHub stats row */}
                            {stats && (
                                <div className="absolute bottom-3 left-4 flex items-center gap-3 z-10">
                                    <span className="flex items-center gap-1 text-[11px] text-white/90 font-medium">
                                        <StarIcon /> {stats.stars}
                                    </span>
                                    <span className="flex items-center gap-1 text-[11px] text-white/90 font-medium">
                                        <ForkIcon /> {stats.forks}
                                    </span>
                                    {stats.language && (
                                        <span className="text-[11px] text-white/80 font-medium">
                                            {stats.language}
                                        </span>
                                    )}
                                    <span className="text-[11px] text-white/70">
                                        {stats.updated}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Card body */}
                        <div className="flex flex-col flex-1 p-4 gap-3 overflow-hidden">
                            <div>
                                <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium mt-0.5">
                                    {project.role}
                                </p>
                            </div>

                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                                {project.shortDesc}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {project.tags.slice(0, 4).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 text-[10px] font-medium rounded-md
                      bg-zinc-100 dark:bg-zinc-800
                      text-zinc-600 dark:text-zinc-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 4 && (
                                    <span className="px-2 py-0.5 text-[10px] font-medium rounded-md
                    bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                        +{project.tags.length - 4}
                                    </span>
                                )}
                            </div>

                            {/* Action links */}
                            <div className="flex items-center gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-zinc-900 dark:bg-white text-white dark:text-zinc-900
                    hover:opacity-80 transition-opacity"
                                >
                                    <GitHubIcon /> Code
                                </a>

                                {project.githubBackend && (
                                    <a
                                        href={project.githubBackend}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                      border border-zinc-200 dark:border-zinc-700
                      text-zinc-700 dark:text-zinc-300
                      hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        <GitHubIcon /> Backend
                                    </a>
                                )}

                                {project.demo ? (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ background: project.accentColor }}
                                        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                      text-xs font-medium text-white hover:opacity-90 transition-opacity"
                                    >
                                        Live <ExternalIcon />
                                    </a>
                                ) : (
                                    <span className="ml-auto text-[10px] text-zinc-400 dark:text-zinc-600 italic">
                                        No live demo
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Flip hint */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2
              text-[10px] text-white/60 font-medium tracking-wide
              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            click to flip
                        </div>
                    </div>

                    {/* ════════════ BACK ════════════ */}
                    <div
                        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col
              bg-zinc-950 dark:bg-zinc-900
              border border-zinc-800"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        {/* Accent top bar */}
                        <div
                            className="h-1.5 shrink-0"
                            style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
                        />

                        <div className="flex flex-col flex-1 p-5 gap-4 overflow-y-auto">
                            {/* Title */}
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{project.icon}</span>
                                <div>
                                    <h3 className="text-sm font-bold text-white leading-tight">
                                        {project.title}
                                    </h3>
                                    <p className="text-[11px] font-medium mt-0.5"
                                        style={{ color: project.accentColor }}>
                                        {project.category}
                                    </p>
                                </div>
                            </div>

                            {/* Full description */}
                            <p className="text-xs text-zinc-300 leading-relaxed">
                                {project.longDesc}
                            </p>

                            {/* All tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 text-[10px] font-medium rounded-md
                      bg-zinc-800 text-zinc-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex flex-wrap gap-2 mt-auto pt-3
                border-t border-zinc-800">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
                                >
                                    <GitHubIcon />
                                    {project.githubBackend ? "Frontend Repo" : "View Code"}
                                </a>

                                {project.githubBackend && (
                                    <a
                                        href={project.githubBackend}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                      bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
                                    >
                                        <GitHubIcon /> Backend Repo
                                    </a>
                                )}

                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                      text-xs font-medium text-white hover:opacity-90 transition-opacity"
                                        style={{ background: project.accentColor }}
                                    >
                                        Live Demo <ExternalIcon />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Flip back hint */}
                        <div className="pb-3 flex justify-center">
                            <span className="text-[10px] text-zinc-600 font-medium tracking-wide">
                                click to flip back
                            </span>
                        </div>
                    </div>

                </motion.div>
            </TiltCard>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState("All");
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    const filtered = activeFilter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 32 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-24 md:py-32
        bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
        >
            {/* Ambient blobs */}
            <div className="absolute top-0 left-1/4 w-150 h-150 rounded-full
        bg-indigo-100/30 dark:bg-indigo-950/20 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full
        bg-violet-100/20 dark:bg-violet-950/15 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">

                {/* Header */}
                <div ref={headingRef} className="mb-10">
                    <span className="text-xs font-semibold tracking-widest uppercase
            text-indigo-500 dark:text-indigo-400">
                        Projects
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold
            text-zinc-900 dark:text-white leading-tight">
                        Things I've{" "}
                        <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
              bg-clip-text text-transparent">
                            actually built
                        </span>
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
                        From Spring Boot REST APIs to animated React frontends.{" "}
                        <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                            Click any card to flip it for full details.
                        </span>
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-2 mb-10 flex-wrap">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                ${activeFilter === f
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                                    : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                                }`}
                        >
                            {f}
                            <span className={`ml-1.5 text-[10px] ${activeFilter === f ? "text-indigo-200" : "text-zinc-400"}`}>
                                {f === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === f).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Cards grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filtered.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </motion.div>

                {/* GitHub CTA */}
                <motion.div
                    className="mt-14 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "power3.out" }}
                >
                    <a
                        href="https://github.com/ankushbadgujar002"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 px-6 py-3 rounded-xl
              border border-zinc-200 dark:border-zinc-700
              bg-white dark:bg-zinc-900
              text-sm font-medium text-zinc-700 dark:text-zinc-300
              hover:border-indigo-400 dark:hover:border-indigo-600
              hover:shadow-lg hover:shadow-indigo-500/10
              transition-all duration-200"
                    >
                        <GitHubIcon />
                        View all repositories on GitHub
                        <ExternalIcon />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}