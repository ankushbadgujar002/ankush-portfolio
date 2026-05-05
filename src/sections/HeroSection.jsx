// src/sections/HeroSection.jsx
// Split layout hero — text left, photo right
// Framer Motion stagger entrance + floating photo + subtle bg shape

import { motion } from "framer-motion";
import ankushImg from "../assets/ankush.png";
import HeroText from "../components/HeroText";

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 20 } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ── Pill badge ────────────────────────────────────────────────────────────────

const Badge = ({ children }) => (
    <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
               bg-indigo-50 dark:bg-indigo-500/15
               text-indigo-600 dark:text-indigo-400
               ring-1 ring-indigo-200 dark:ring-indigo-500/30"
    >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        {children}
    </motion.span>
);

// ── Main component ────────────────────────────────────────────────────────────

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center
                 bg-white dark:bg-zinc-950
                 px-6 md:px-16 lg:px-24"
        >
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2
                      gap-12 md:gap-8 items-center py-24 md:py-0">

                {/* ── LEFT — Text ───────────────────────────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-5 order-2 md:order-1"
                >
                    <Badge>Available for work</Badge>

                    <HeroText />

                    {/* Tech stack pills */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                        {["Java", "Spring Boot", "Rest API", "React", "Tailwind Css", "Vite", "MySQL"].map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs font-medium rounded-md
                           bg-zinc-100 dark:bg-zinc-800
                           text-zinc-600 dark:text-zinc-400"
                            >
                                {tech}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div variants={fadeUp} className="flex items-center gap-3 pt-1">
                        <motion.a
                            href="#projects"
                            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="px-5 py-2.5 rounded-lg text-sm font-semibold
                         bg-indigo-600 hover:bg-indigo-700
                         text-white shadow-lg shadow-indigo-500/25
                         transition-colors duration-150"
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            View Projects
                        </motion.a>

                        <motion.a
                            href="#contact"
                            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                            className="px-5 py-2.5 rounded-lg text-sm font-semibold
                         border border-zinc-200 dark:border-zinc-700
                         text-zinc-700 dark:text-zinc-300
                         hover:bg-zinc-50 dark:hover:bg-zinc-800
                         transition-colors duration-150"
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        variants={fadeUp}
                        className="flex items-center gap-4 pt-1"
                    >
                        <a
                            href="https://github.com/ankushbadgujar002"
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com/in/ankush-badgujar-908904256"
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <span className="text-zinc-300 dark:text-zinc-700 text-sm">
                            ankushbadgujar1122002@gmail.com
                        </span>
                    </motion.div>
                </motion.div>

                {/* ── RIGHT — Photo ─────────────────────────────────────────── */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="relative flex justify-center items-center order-1 md:order-2"
                >
                    {/* Background blob shape */}
                    <div
                        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-[60%_40%_55%_45%/50%_60%_40%_50%]
                       bg-indigo-100 dark:bg-indigo-950/60
                       blur-sm -z-10"
                    />

                    {/* Floating wrapper */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                    >
                        {/* Decorative corner accents */}
                        <span className="absolute -top-3 -left-3 w-6 h-6
                             border-t-2 border-l-2 border-indigo-500 rounded-tl-lg" />
                        <span className="absolute -bottom-3 -right-3 w-6 h-6
                             border-b-2 border-r-2 border-indigo-500 rounded-br-lg" />

                        {/* Photo */}
                        <motion.img
                            src={ankushImg}
                            alt="Ankush Badgujar"
                            className="w-64 h-72 md:w-80 md:h-96
                         object-cover object-top
                         rounded-2xl
                         shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/10"
                            whileHover={{ scale: 1.02, rotate: 0.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            draggable={false}
                        />

                        {/* Floating experience badge */}
                        <motion.div
                            className="absolute -left-10 bottom-10 md:-left-14
                         bg-white dark:bg-zinc-900
                         border border-zinc-100 dark:border-zinc-800
                         rounded-xl px-3 py-2 shadow-lg shadow-zinc-200/80 dark:shadow-zinc-900/80
                         flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, type: "spring", stiffness: 180 }}
                        >
                            <span className="text-xl">💼</span>
                            <div>
                                <p className="text-xs font-semibold text-zinc-900 dark:text-white leading-none">
                                    Full Stack
                                </p>
                                <p className="text-[10px] text-zinc-400 mt-0.5">Java + React</p>
                            </div>
                        </motion.div>

                        {/* Floating tech badge */}
                        <motion.div
                            className="absolute -right-8 top-10 md:-right-12
                         bg-white dark:bg-zinc-900
                         border border-zinc-100 dark:border-zinc-800
                         rounded-xl px-3 py-2 shadow-lg shadow-zinc-200/80 dark:shadow-zinc-900/80
                         flex items-center gap-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, type: "spring", stiffness: 180 }}
                        >
                            <span className="text-xl">⚡</span>
                            <div>
                                <p className="text-xs font-semibold text-zinc-900 dark:text-white leading-none">
                                    Open to work
                                </p>
                                <p className="text-[10px] text-zinc-400 mt-0.5">Actively looking</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}