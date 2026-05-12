import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// ── Icons ─────────────────────────────────────────

const MailIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.9 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.4-2 1.03-2.7-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0112 6.8c.85 0 1.7.12 2.5.34 1.9-1.3 2.74-1.03 2.74-1.03.55 1.37.2 2.4.1 2.64.63.7 1.02 1.6 1.02 2.7 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4v14h-4V8zm7 0h3.6v2h.05c.5-.9 1.7-2 3.5-2 3.75 0 4.45 2.47 4.45 5.68V22h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.85-2.72 3.76V22h-4V8z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.92 11.92 0 0012.05 0C5.49 0 .16 5.34.16 11.91c0 2.1.55 4.14 1.6 5.94L0 24l6.36-1.67a11.9 11.9 0 005.69 1.45h.01c6.56 0 11.89-5.34 11.89-11.91 0-3.18-1.24-6.16-3.43-8.39zM12.06 21.6a9.63 9.63 0 01-4.9-1.35l-.35-.2-3.78.99 1-3.69-.23-.38a9.6 9.6 0 011.48-11.94 9.6 9.6 0 0113.58 0 9.6 9.6 0 010 13.57 9.57 9.57 0 01-6.8 2.8zm5.37-7.2c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.44-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.5h-.55c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.06 2.89 1.21 3.09.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.7-.69 1.94-1.35.24-.66.24-1.22.17-1.35-.07-.12-.26-.2-.55-.35z" />
    </svg>
);

// ── Component ─────────────────────────────────────

export default function ContactSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess(false);

        try {
            await emailjs.send(
                "service_6d0ceuv",
                "template_35fds1d",
                form,
                "85P4oPswuxZuSLsCf"
            );

            setSuccess(true);
            setForm({ name: "", email: "", message: "" });

        } catch {
            window.location.href =
                `mailto:ankushbadgujar1122002@gmail.com?subject=Portfolio Contact&body=${form.message}`;
        }

        setLoading(false);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-24 md:py-32
            bg-zinc-50 dark:bg-zinc-900 overflow-hidden"
        >
            {/* Ambient Glow (MATCH PROJECTS) */}
            <div className="absolute top-0 left-1/3 w-150 h-150 rounded-full
                bg-indigo-100/30 dark:bg-indigo-950/20 blur-[130px]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">

                {/* Header */}
                <div ref={headingRef} className="mb-12 text-center">
                    <span className="text-xs uppercase tracking-widest
                        text-indigo-500 dark:text-indigo-400">
                        Contact
                    </span>

                    <h2 className="mt-2 text-3xl md:text-4xl font-bold
                        text-zinc-900 dark:text-white">
                        Let’s build something{" "}
                        <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
                            bg-clip-text text-transparent">
                            real
                        </span>
                    </h2>

                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                        Serious projects only. If you’re building — I’m listening.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* LEFT */}
                    <div className="space-y-6">

                        <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                            Direct Contact
                        </h3>

                        <a
                            href="mailto:ankushbadgujar002@gmail.com"
                            className="flex items-center gap-3 p-4 rounded-xl
                            bg-white dark:bg-zinc-900
                            border border-zinc-200 dark:border-zinc-800
                            hover:border-indigo-400 dark:hover:border-indigo-600
                            hover:shadow-lg hover:shadow-indigo-500/10
                            transition"
                        >
                            <MailIcon />
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                ankushbadgujar112002@gmail.com
                            </span>
                        </a>

                        {/* Socials */}
                        <div className="flex gap-4 pt-2">

                            <a
                                href="https://github.com/ankushbadgujar002"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        hover:border-indigo-400 dark:hover:border-indigo-600
        hover:shadow-lg hover:shadow-indigo-500/10
        transition"
                            >
                                <GitHubIcon />
                            </a>

                            <a
                                href="https://linkedin.com/in/ankush-badgujar-908904256"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        hover:border-indigo-400 dark:hover:border-indigo-600
        hover:shadow-lg hover:shadow-indigo-500/10
        transition"
                            >
                                <LinkedInIcon />
                            </a>

                            <a
                                href="https://wa.me/9172479138"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl
        bg-green-500 text-white
        hover:bg-green-600
        shadow-lg shadow-green-500/20
        transition"
                            >
                                <WhatsAppIcon />
                            </a>

                        </div>

                        <p className="text-xs text-zinc-400">
                            Response time: 24–48 hours.
                        </p>
                    </div>

                    {/* FORM */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        {["name", "email"].map((field) => (
                            <input
                                key={field}
                                type={field === "email" ? "email" : "text"}
                                name={field}
                                value={form[field]}
                                onChange={handleChange}
                                placeholder={`Your ${field}`}
                                className="w-full p-3 rounded-lg
                                bg-white dark:bg-zinc-900
                                border border-zinc-200 dark:border-zinc-800
                                text-sm text-zinc-900 dark:text-white
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                            />
                        ))}

                        <textarea
                            name="message"
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Your message"
                            className="w-full p-3 rounded-lg
                            bg-white dark:bg-zinc-900
                            border border-zinc-200 dark:border-zinc-800
                            text-sm text-zinc-900 dark:text-white
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg text-white text-sm font-medium
                            bg-indigo-600 hover:bg-indigo-500
                            transition shadow-lg shadow-indigo-500/20"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                        {success && (
                            <p className="text-xs text-green-500">
                                Message sent successfully ✅
                            </p>
                        )}
                    </motion.form>

                </div>
            </div>
        </section>
    );
}