// Drop-in replacement for the text block inside HeroSection.jsx
// Typewriter role rotator + gradient name + refined copy

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ROLES = ["Full Stack Developer", "Java Developer", "Software Engineer"];

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 20 } },
};

function useTypewriter(words, { typeSpeed = 80, deleteSpeed = 45, pause = 1800 } = {}) {
    const [display, setDisplay] = useState("");
    const [wordIdx, setWordIdx] = useState(0);
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        const current = words[wordIdx];

        if (typing) {
            if (display.length < current.length) {
                const t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typeSpeed);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setTyping(false), pause);
                return () => clearTimeout(t);
            }
        } else {
            if (display.length > 0) {
                const t = setTimeout(() => setDisplay(display.slice(0, -1)), deleteSpeed);
                return () => clearTimeout(t);
            } else {
                setWordIdx((i) => (i + 1) % words.length);
                setTyping(true);
            }
        }
    }, [display, typing, wordIdx]);

    return display;
}

export default function HeroText({ fadeUp: _fadeUp }) {
    const role = useTypewriter(ROLES);

    return (
        <div className="flex flex-col gap-4">

            {/* Role line — typewriter */}
            <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 h-6"
            >
                <span
                    className="text-sm font-semibold tracking-[0.2em] uppercase
                     bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500
                     bg-clip-text text-transparent"
                >
                    {role}
                </span>
                {/* Blinking cursor */}
                <motion.span
                    className="inline-block w-0.5 h-4 rounded-full bg-indigo-500"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            {/* Name */}
            <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold
                   leading-[1.08] tracking-tight"
            >
                {/* Greeting line */}
                <span className="block text-zinc-400 dark:text-zinc-500 text-2xl sm:text-3xl
                         font-medium tracking-normal mb-1">
                    Hey there, I'm
                </span>

                {/* Name with gradient */}
                <span
                    className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
                     dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400
                     bg-clip-text text-transparent"
                >
                    Ankush Badgujar
                </span>

                {/* Underline accent — animates in */}
                <motion.span
                    className="block h-0.75 rounded-full mt-2
                     bg-linear-to-r from-indigo-500 via-violet-500 to-purple-500"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
            </motion.h1>

            {/* Bio */}
            <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-zinc-500 dark:text-zinc-400
                   max-w-md leading-relaxed"
            >
                I build fast, scalable web applications — Java on the backend,
                React on the front. Currently crafting experiences that
                recruiters actually remember.
            </motion.p>

        </div>
    );
}