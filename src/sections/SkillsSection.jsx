// src/sections/SkillsSection.jsx
// Week 3 — Skills section
// Floating badge cloud (Framer Motion) + radial SVG progress rings (GSAP)

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
    {
        label: "Backend",
        color: "indigo",
        skills: [
            { name: "Java", level: 88 },
            { name: "Spring Boot", level: 82 },
            { name: "REST APIs", level: 90 },
            { name: "Hibernate / JPA", level: 75 },
            { name: "MySQL", level: 78 },
            { name: "Spring Security", level: 68 },
        ],
    },
    {
        label: "Frontend",
        color: "violet",
        skills: [
            { name: "React", level: 85 },
            { name: "JavaScript", level: 83 },
            { name: "Tailwind CSS", level: 88 },
            { name: "Framer Motion", level: 74 },
            { name: "Three.js / R3F", level: 62 },
            { name: "Vite", level: 80 },
        ],
    },
    {
        label: "Tools & DevOps",
        color: "purple",
        skills: [
            { name: "Git / GitHub", level: 86 },
            { name: "VS Code", level: 92 },
            { name: "Postman", level: 84 },
            { name: "Maven", level: 75 },
            { name: "Eclipse IDE", level: 65 },
            { name: "Vercel / Netlify", level: 78 },
        ],
    },
];

// All tech badges for the floating cloud
const BADGE_CLOUD = [
    { name: "Java", bg: "bg-orange-50 dark:bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", ring: "ring-orange-200 dark:ring-orange-500/20" },
    { name: "Spring Boot", bg: "bg-green-50 dark:bg-green-500/10", text: "text-green-700 dark:text-green-400", ring: "ring-green-200 dark:ring-green-500/20" },
    { name: "React", bg: "bg-cyan-50 dark:bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", ring: "ring-cyan-200 dark:ring-cyan-500/20" },
    { name: "Tailwind", bg: "bg-sky-50 dark:bg-sky-500/10", text: "text-sky-600 dark:text-sky-400", ring: "ring-sky-200 dark:ring-sky-500/20" },
    { name: "MySQL", bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", ring: "ring-blue-200 dark:ring-blue-500/20" },
    { name: "Three.js", bg: "bg-zinc-100 dark:bg-zinc-700/40", text: "text-zinc-700 dark:text-zinc-300", ring: "ring-zinc-200 dark:ring-zinc-600/30" },
    { name: "JavaScript", bg: "bg-yellow-50 dark:bg-yellow-500/10", text: "text-yellow-700 dark:text-yellow-400", ring: "ring-yellow-200 dark:ring-yellow-500/20" },
    { name: "Git", bg: "bg-red-50 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400", ring: "ring-red-200 dark:ring-red-500/20" },
    { name: "Vite", bg: "bg-purple-50 dark:bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", ring: "ring-purple-200 dark:ring-purple-500/20" },
    { name: "Framer Motion", bg: "bg-indigo-50 dark:bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", ring: "ring-indigo-200 dark:ring-indigo-500/20" },
    { name: "REST API", bg: "bg-teal-50 dark:bg-teal-500/10", text: "text-teal-600 dark:text-teal-400", ring: "ring-teal-200 dark:ring-teal-500/20" },
    { name: "Maven", bg: "bg-rose-50 dark:bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", ring: "ring-rose-200 dark:ring-rose-500/20" },
    { name: "Postman", bg: "bg-orange-50 dark:bg-orange-500/10", text: "text-orange-700 dark:text-orange-300", ring: "ring-orange-200 dark:ring-orange-500/20" },
    { name: "Vercel", bg: "bg-zinc-100 dark:bg-zinc-700/40", text: "text-zinc-900 dark:text-zinc-100", ring: "ring-zinc-200 dark:ring-zinc-600/30" },
    { name: "Eclipse IDE", bg: "bg-yellow-50 dark:bg-yellow-500/10", text: "text-yellow-800 dark:text-yellow-300", ring: "ring-yellow-200 dark:ring-yellow-500/20" },
    { name: "GSAP", bg: "bg-green-50 dark:bg-green-500/10", text: "text-green-800 dark:text-green-300", ring: "ring-green-200 dark:ring-green-500/20" },
];

// Color accent mappings for categories
const CAT_COLOR = {
    indigo: { accent: "#6366f1", track: "#e0e7ff", trackDark: "#312e81" },
    violet: { accent: "#8b5cf6", track: "#ede9fe", trackDark: "#2e1065" },
    purple: { accent: "#9333ea", track: "#f3e8ff", trackDark: "#3b0764" },
};

// ── Floating Badge ────────────────────────────────────────────────────────────

function FloatingBadge({ badge, index }) {
    // Staggered entrance + continuous subtle float
    const delay = index * 0.06;
    const floatY = (index % 3 === 0) ? [-4, 4] : (index % 3 === 1) ? [4, -4] : [-2, 6];

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
                delay,
                type: "spring",
                stiffness: 200,
                damping: 18,
            }}
            animate={{
                y: floatY,
                transition: {
                    duration: 2.5 + (index % 4) * 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: index * 0.15,
                },
            }}
            whileHover={{ scale: 1.1, y: -4 }}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
        cursor-default select-none
        ring-1 ${badge.bg} ${badge.text} ${badge.ring}
        shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
            {badge.name}
        </motion.span>
    );
}

// ── Radial Progress Ring ──────────────────────────────────────────────────────

function RadialRing({ skill, color, index }) {
    const ringRef = useRef(null);
    const labelRef = useRef(null);
    const isInView = useInView(ringRef, { once: false, amount: 0.5 });

    const SIZE = 80;
    const STROKE = 6;
    const RADIUS = (SIZE - STROKE) / 2;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
    const accent = CAT_COLOR[color].accent;

    useEffect(() => {
        if (!ringRef.current || !isInView) return;

        const dashOffset = CIRCUMFERENCE * (1 - skill.level / 100);

        // Animate the SVG stroke
        gsap.fromTo(
            ringRef.current,
            { strokeDashoffset: CIRCUMFERENCE },
            {
                strokeDashoffset: dashOffset,
                duration: 1.2,
                ease: "power3.out",
                delay: index * 0.08,
            }
        );

        // Count up the number label
        const obj = { val: 0 };
        gsap.to(obj, {
            val: skill.level,
            duration: 1.1,
            ease: "power2.out",
            delay: index * 0.08,
            onUpdate() {
                if (labelRef.current) {
                    labelRef.current.textContent = `${Math.round(obj.val)}%`;
                }
            },
        });
    }, [isInView, skill.level, CIRCUMFERENCE, index]);

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative">
                <svg width={SIZE} height={SIZE} className="-rotate-90">
                    {/* Track */}
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={STROKE}
                        className="text-zinc-100 dark:text-zinc-800"
                    />
                    {/* Progress arc */}
                    <circle
                        ref={ringRef}
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke={accent}
                        strokeWidth={STROKE}
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE} // start at 0, GSAP animates this
                    />
                </svg>
                {/* Percentage label — rotated back upright */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        ref={labelRef}
                        className="text-xs font-bold text-zinc-800 dark:text-zinc-200"
                    >
                        0%
                    </span>
                </div>
            </div>
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 text-center leading-tight max-w-18">
                {skill.name}
            </span>
        </div>
    );
}

// ── Skill Category Block ──────────────────────────────────────────────────────

function SkillCategory({ category, index }) {
    const blockRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            blockRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                delay: index * 0.12,
                scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [index]);

    return (
        <div
            ref={blockRef}
            className="p-6 rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-100 dark:border-zinc-800
        shadow-sm"
        >
            <h3 className="text-xs font-semibold tracking-widest uppercase
        text-zinc-400 dark:text-zinc-500 mb-6">
                {category.label}
            </h3>

            <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, i) => (
                    <RadialRing
                        key={skill.name}
                        skill={skill}
                        color={category.color}
                        index={i}
                    />
                ))}
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SkillsSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cloudRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 28 },
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

            gsap.fromTo(
                cloudRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cloudRef.current,
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
            id="skills"
            ref={sectionRef}
            className="relative py-24 md:py-32
        bg-white dark:bg-zinc-950
        overflow-hidden"
        >
            {/* Ambient blobs */}
            <div
                className="absolute top-1/4 left-0 w-125 h-125 rounded-full
          bg-indigo-100/30 dark:bg-indigo-950/20
          blur-[120px] pointer-events-none"
            />
            <div
                className="absolute bottom-0 right-0 w-100 h-100 rounded-full
          bg-purple-100/20 dark:bg-purple-950/15
          blur-[100px] pointer-events-none"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">

                {/* ── Header ── */}
                <div ref={headingRef} className="mb-12">
                    <span className="text-xs font-semibold tracking-widest uppercase
            text-indigo-500 dark:text-indigo-400">
                        Skills
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold
            text-zinc-900 dark:text-white leading-tight">
                        Tools I{" "}
                        <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
              bg-clip-text text-transparent">
                            actually use
                        </span>
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
                        A mix of backend reliability, frontend polish, and dev tooling that keeps projects
                        moving from idea to deployed product.
                    </p>
                </div>

                {/* ── Floating badge cloud ── */}
                <div
                    ref={cloudRef}
                    className="mb-14 p-6 rounded-2xl
            bg-zinc-50 dark:bg-zinc-900
            border border-zinc-100 dark:border-zinc-800"
                >
                    <p className="text-xs font-semibold tracking-widest uppercase
            text-zinc-400 dark:text-zinc-500 mb-5">
                        Tech Cloud
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {BADGE_CLOUD.map((badge, i) => (
                            <FloatingBadge key={badge.name} badge={badge} index={i} />
                        ))}
                    </div>
                </div>

                {/* ── Radial progress rings — by category ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SKILL_CATEGORIES.map((cat, i) => (
                        <SkillCategory key={cat.label} category={cat} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}