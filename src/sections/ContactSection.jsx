// src/sections/ContactSection.jsx
// Matches ProjectsSection design language:
// • zinc-50/zinc-900 bg, same ambient blobs
// • indigo/violet/purple gradient accents
// • Same heading pattern (label → h2 with gradient span → subtitle)
// • GSAP ScrollTrigger entrance (same settings as Projects)
// • Framer Motion whileInView cards
// • Consistent border/shadow/hover tokens

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// ── Icons ─────────────────────────────────────────────────────────────────────

const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M3 8a2 2 0 00-2 2v6a2 2 0 002 2h18a2 2 0 002-2V10a2 2 0 00-2-2H3z" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4v14h-4V8zm7 0h3.6v2h.05c.5-.9 1.7-2 3.5-2 3.75 0 4.45 2.47 4.45 5.68V22h-4v-7.1c0-1.7-.03-3.88-2.36-3.88-2.36 0-2.72 1.85-2.72 3.76V22h-4V8z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.92 11.92 0 0012.05 0C5.49 0 .16 5.34.16 11.91c0 2.1.55 4.14 1.6 5.94L0 24l6.36-1.67a11.9 11.9 0 005.69 1.45h.01c6.56 0 11.89-5.34 11.89-11.91 0-3.18-1.24-6.16-3.43-8.39zM12.06 21.6a9.63 9.63 0 01-4.9-1.35l-.35-.2-3.78.99 1-3.69-.23-.38a9.6 9.6 0 011.48-11.94 9.6 9.6 0 0113.58 0 9.6 9.6 0 010 13.57 9.57 9.57 0 01-6.8 2.8zm5.37-7.2c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.44-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.52-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.49-.64-.5h-.55c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.49 0 1.47 1.06 2.89 1.21 3.09.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.7-.69 1.94-1.35.24-.66.24-1.22.17-1.35-.07-.12-.26-.2-.55-.35z" />
    </svg>
);

const ExternalIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

// ── Contact detail items ───────────────────────────────────────────────────────

const CONTACT_LINKS = [
    {
        id: "email",
        label: "ankushbadgujar1122002@gmail.com",
        sublabel: "Best way to reach me",
        href: "mailto:ankushbadgujar1122002@gmail.com",
        icon: <MailIcon />,
        gradient: "from-indigo-500 via-violet-500 to-purple-600",
        accentColor: "#6366f1",
    },
    {
        id: "phone",
        label: "+91 91724 79138",
        sublabel: "WhatsApp preferred",
        href: "https://wa.me/919172479138",
        icon: <PhoneIcon />,
        gradient: "from-emerald-500 via-teal-500 to-cyan-600",
        accentColor: "#10b981",
    },
];

const SOCIAL_LINKS = [
    {
        id: "github",
        label: "GitHub",
        sublabel: "ankushbadgujar002",
        href: "https://github.com/ankushbadgujar002",
        icon: <GitHubIcon />,
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        sublabel: "ankush-badgujar",
        href: "https://linkedin.com/in/ankush-badgujar-908904256",
        icon: <LinkedInIcon />,
    },
    {
        id: "whatsapp",
        label: "WhatsApp",
        sublabel: "Quick replies",
        href: "https://wa.me/919172479138",
        icon: <WhatsAppIcon />,
        green: true,
    },
];

// ── Contact card (mirrors ProjectCard entrance animation style) ────────────────

function ContactCard({ item, index }) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 0, y: 40, scale: 0.96 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.65,
                ease: "power3.out",
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 89%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [index]);

    return (
        <div ref={ref} className="group">
            <a
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl
                    bg-white dark:bg-zinc-900
                    border border-zinc-100 dark:border-zinc-800
                    shadow-sm group-hover:shadow-xl group-hover:shadow-black/10
                    hover:border-indigo-300 dark:hover:border-indigo-700
                    transition-all duration-300"
            >
                {/* Icon badge — mirrors gradient header band from ProjectCard */}
                <div className={`relative flex items-center justify-center w-12 h-12 shrink-0
                    rounded-xl bg-linear-to-br ${item.gradient} text-white
                    shadow-sm overflow-hidden`}>
                    {/* Decorative circle — same as project card header */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/10" />
                    <span className="relative z-10">{item.icon}</span>
                </div>

                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                        {item.label}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                        {item.sublabel}
                    </span>
                </div>

                <ExternalIcon className="ml-auto shrink-0 text-zinc-300 dark:text-zinc-700
                    group-hover:text-indigo-400 transition-colors" />
            </a>
        </div>
    );
}

// ── Social pill row ───────────────────────────────────────────────────────────

function SocialPill({ item, index }) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 0, y: 24, scale: 0.94 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.55,
                ease: "power3.out",
                delay: 0.25 + index * 0.08,
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 89%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [index]);

    return (
        <div ref={ref}>
            <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl
                    border transition-all duration-200
                    ${item.green
                        ? "bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10"
                    }`}
            >
                <span className={item.green ? "text-white" : "text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-500 transition-colors"}>
                    {item.icon}
                </span>
                <div className="flex flex-col">
                    <span className={`text-xs font-semibold ${item.green ? "text-white" : "text-zinc-800 dark:text-zinc-200"}`}>
                        {item.label}
                    </span>
                    <span className={`text-[10px] ${item.green ? "text-emerald-100" : "text-zinc-400 dark:text-zinc-500"}`}>
                        {item.sublabel}
                    </span>
                </div>
            </a>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ContactSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Same GSAP heading animation as ProjectsSection
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

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
            {/* ── Ambient blobs — identical placement to ProjectsSection ── */}
            <div className="absolute top-0 left-1/4 w-150 h-150 rounded-full
                bg-indigo-100/30 dark:bg-indigo-950/20 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full
                bg-violet-100/20 dark:bg-violet-950/15 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">

                {/* ── Header — exact same pattern as ProjectsSection ── */}
                <div ref={headingRef} className="mb-10">
                    <span className="text-xs font-semibold tracking-widest uppercase
                        text-indigo-500 dark:text-indigo-400">
                        Contact
                    </span>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold
                        text-zinc-900 dark:text-white leading-tight">
                        Let's build something{" "}
                        <span className="bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
                            bg-clip-text text-transparent">
                            real
                        </span>
                    </h2>
                    <p className="mt-3 max-w-xl text-sm text-zinc-500 dark:text-zinc-400">
                        Serious projects only. If you're building —
                        <span className="text-zinc-400 dark:text-zinc-500 text-xs"> I'm listening.</span>
                    </p>
                </div>

                {/* ── Two-column grid — mirrors Projects card grid proportions ── */}
                <div className="grid md:grid-cols-2 gap-10 items-start">

                    {/* LEFT — Direct contact + socials */}
                    <div className="space-y-4">

                        {/* Contact cards */}
                        {CONTACT_LINKS.map((item, i) => (
                            <ContactCard key={item.id} item={item} index={i} />
                        ))}

                        {/* Divider */}
                        <div className="flex items-center gap-3 pt-2">
                            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                            <span className="text-[10px] font-semibold tracking-widest uppercase
                                text-zinc-400 dark:text-zinc-600">
                                Also on
                            </span>
                            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                        </div>

                        {/* Social pills */}
                        <div className="grid grid-cols-3 gap-3">
                            {SOCIAL_LINKS.map((item, i) => (
                                <SocialPill key={item.id} item={item} index={i} />
                            ))}
                        </div>

                        <p className="text-[11px] text-zinc-400 dark:text-zinc-600 pt-1">
                            Response time: 24–48 hours.
                        </p>
                    </div>

                    {/* RIGHT — Form (Framer Motion whileInView, same as Projects CTA) */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.25 }}
                        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                        className="bg-white dark:bg-zinc-900
                            border border-zinc-100 dark:border-zinc-800
                            rounded-2xl shadow-sm p-6 space-y-4"
                    >
                        {/* Form card header band — mirrors project card gradient header */}
                        <div className={`-mx-6 -mt-6 h-1.5 rounded-t-2xl
                            bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600`} />

                        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 pt-1">
                            Send a message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {["name", "email"].map((field) => (
                                <input
                                    key={field}
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={form[field]}
                                    onChange={handleChange}
                                    placeholder={`Your ${field}`}
                                    required
                                    className="w-full px-3 py-2.5 rounded-xl text-sm
                                        bg-zinc-50 dark:bg-zinc-950
                                        border border-zinc-200 dark:border-zinc-800
                                        text-zinc-900 dark:text-white
                                        placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                                        focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                                        focus:border-indigo-400 dark:focus:border-indigo-500
                                        transition-all duration-200"
                                />
                            ))}

                            <textarea
                                name="message"
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Your message"
                                required
                                className="w-full px-3 py-2.5 rounded-xl text-sm
                                    bg-zinc-50 dark:bg-zinc-950
                                    border border-zinc-200 dark:border-zinc-800
                                    text-zinc-900 dark:text-white
                                    placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                                    focus:border-indigo-400 dark:focus:border-indigo-500
                                    transition-all duration-200 resize-none"
                            />

                            {/* Submit — mirrors Projects "View all repos" CTA hover treatment */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full py-2.5 rounded-xl text-white text-sm font-semibold
                                    bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
                                    shadow-lg shadow-indigo-500/25
                                    hover:shadow-indigo-500/40
                                    disabled:opacity-60 disabled:cursor-not-allowed
                                    transition-all duration-200 overflow-hidden group"
                            >
                                {/* Shimmer sweep — matches Projects section's shimmer on submit */}
                                <span className="absolute inset-0 -translate-x-full
                                    group-hover:translate-x-full
                                    bg-linear-to-r from-transparent via-white/20 to-transparent
                                    transition-transform duration-500 ease-in-out" />
                                <span className="relative">
                                    {loading ? "Sending…" : "Send Message"}
                                </span>
                            </button>

                            {success && (
                                <motion.p
                                    className="text-xs text-emerald-500 dark:text-emerald-400 text-center"
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Message sent successfully ✅
                                </motion.p>
                            )}
                        </form>
                    </motion.div>

                </div>

                {/* ── Footer CTA — identical style to Projects "View all repos" button ── */}
                <motion.div
                    className="mt-14 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "power3.out" }}
                >
                    <a
                        href="mailto:ankushbadgujar1122002@gmail.com"
                        className="group flex items-center gap-3 px-6 py-3 rounded-xl
                            border border-zinc-200 dark:border-zinc-700
                            bg-white dark:bg-zinc-900
                            text-sm font-medium text-zinc-700 dark:text-zinc-300
                            hover:border-indigo-400 dark:hover:border-indigo-600
                            hover:shadow-lg hover:shadow-indigo-500/10
                            transition-all duration-200"
                    >
                        <MailIcon />
                        Or drop a direct email
                        <ExternalIcon />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}