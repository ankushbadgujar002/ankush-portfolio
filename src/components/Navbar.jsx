import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import ankushImg from "../assets/ankush.png";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const GITHUB_URL = "https://github.com/ankushbadgujar002";
const LINKEDIN_URL = "https://linkedin.com/in/ankush-badgujar-908904256";
const RESUME_URL = "/Ankush_-_Fullstack_Resume.pdf"; // put your resume in /public

// ── Icons ─────────────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const HamburgerIcon = ({ open }) => (
  <div className="relative size-5 flex flex-col justify-center gap-1">
    <motion.span
      className="block h-px w-full bg-current rounded-full origin-center"
      animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
    />
    <motion.span
      className="block h-px w-full bg-current rounded-full"
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.15 }}
    />
    <motion.span
      className="block h-px w-full bg-current rounded-full origin-center"
      animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
    />
  </div>
);

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useDarkMode() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);
  return { dark, toggle };
}

function useActiveSection(links) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [links]);
  return active;
}

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// ── Social icon button ────────────────────────────────────────────────────────

function SocialBtn({ href, children, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative p-2 rounded-lg
        text-zinc-500 dark:text-zinc-400
        hover:text-indigo-500 dark:hover:text-indigo-400
        transition-colors duration-150 group"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* hover glow */}
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
        bg-indigo-500/10 dark:bg-indigo-500/15 transition-opacity duration-200" />
      {children}
    </motion.a>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { dark, toggle } = useDarkMode();
  const active = useActiveSection(NAV_LINKS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    const delta = y - lastY.current;
    if (y < 80) setHidden(false);
    else if (delta > 6) { setHidden(true); setMenuOpen(false); }
    else if (delta < -6) setHidden(false);
    lastY.current = y;
  });

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 h-16
          flex items-center justify-between
          px-5 md:px-8 lg:px-12
          transition-all duration-300
          ${scrolled
            ? "bg-white/70 dark:bg-zinc-950/75 backdrop-blur-xl border-b border-white/20 dark:border-zinc-700/40 shadow-lg shadow-black/5 dark:shadow-black/30"
            : "bg-transparent border-b border-transparent"
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      >

        {/* ── Logo ── */}
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 select-none shrink-0"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="relative">
            {/* glow ring behind photo */}
            <div className="absolute -inset-0.5 rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-purple-600 opacity-70 blur-sm" />
            <img
              src={ankushImg}
              alt="Ankush"
              className="relative w-8 h-8 rounded-full object-cover object-top ring-1 ring-white/30"
            />
          </div>
          <span className="hidden sm:flex items-baseline gap-px font-semibold text-sm tracking-tight text-zinc-800 dark:text-white">
            Ankush
            <span className="bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent font-bold">
              .dev
            </span>
          </span>
        </motion.a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center">
          {/* pill track */}
          <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-xl
            bg-zinc-100/80 dark:bg-zinc-800/60
            border border-zinc-200/60 dark:border-zinc-700/50
            backdrop-blur-sm">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href.slice(1);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-lg
                    tracking-wide transition-colors duration-150
                    ${isActive
                      ? "text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg -z-10
                        bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
                        shadow-lg shadow-indigo-500/40"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  {label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1">

          {/* Social icons — hidden on small screens */}
          <div className="hidden lg:flex items-center gap-0.5 mr-1">
            <SocialBtn href={GITHUB_URL} label="GitHub">
              <GitHubIcon />
            </SocialBtn>
            <SocialBtn href={LINKEDIN_URL} label="LinkedIn">
              <LinkedInIcon />
            </SocialBtn>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" />

          {/* Resume download */}
          <motion.a
            href={RESUME_URL}
            download
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
              text-zinc-600 dark:text-zinc-300
              border border-zinc-200/80 dark:border-zinc-700/80
              hover:border-indigo-400/60 dark:hover:border-indigo-500/60
              hover:text-indigo-600 dark:hover:text-indigo-400
              bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm
              transition-all duration-200 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="group-hover:translate-y-px transition-transform duration-150"
            >
              <DownloadIcon />
            </motion.span>
            Resume
          </motion.a>

          {/* Hire Me CTA */}
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="hidden md:flex items-center gap-1.5 ml-1 px-4 py-1.5 rounded-lg text-xs font-bold
              text-white tracking-wide
              bg-linear-to-r from-indigo-500 via-violet-500 to-purple-600
              shadow-md shadow-indigo-500/30 hover:shadow-indigo-500/50
              transition-shadow duration-200 relative overflow-hidden group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
              bg-linear-to-r from-transparent via-white/20 to-transparent
              transition-transform duration-500 ease-in-out" />
            Hire Me
          </motion.a>

          {/* Dark mode toggle */}
          <motion.button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="ml-1 p-2 rounded-lg
              text-zinc-500 dark:text-zinc-400
              hover:text-zinc-800 dark:hover:text-white
              hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80
              transition-colors duration-150"
            whileTap={{ scale: 0.88, rotate: 15 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "sun" : "moon"}
                initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 20, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="block"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Hamburger */}
          <motion.button
            className="md:hidden p-2 rounded-lg
              text-zinc-600 dark:text-zinc-300
              hover:bg-zinc-100 dark:hover:bg-zinc-800
              transition-colors duration-150"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <HamburgerIcon open={menuOpen} />
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              key="drawer"
              className="fixed top-16 inset-x-3 z-40 md:hidden
                rounded-2xl overflow-hidden
                bg-white/90 dark:bg-zinc-900/95 backdrop-blur-xl
                border border-zinc-200/60 dark:border-zinc-700/60
                shadow-2xl shadow-black/10 dark:shadow-black/50
                px-3 pb-4 pt-2"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              {/* Nav links */}
              <div className="flex flex-col gap-0.5 mb-3">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const isActive = active === href.slice(1);
                  return (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        setTimeout(() => scrollTo(href), 140);
                      }}
                      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium
                        transition-colors duration-150
                        ${isActive
                          ? "bg-linear-to-r from-indigo-500/15 to-violet-500/10 text-indigo-600 dark:text-indigo-400"
                          : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                        }`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {isActive && (
                        <span className="mr-2 w-1.5 h-1.5 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 shrink-0" />
                      )}
                      {label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 mx-1 mb-3" />

              {/* Bottom row — socials + resume + hire me */}
              <div className="flex items-center gap-2 px-1">
                {/* Social icons */}
                <SocialBtn href={GITHUB_URL} label="GitHub"><GitHubIcon /></SocialBtn>
                <SocialBtn href={LINKEDIN_URL} label="LinkedIn"><LinkedInIcon /></SocialBtn>

                <div className="flex-1" />

                {/* Resume */}
                <motion.a
                  href={RESUME_URL}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                    text-zinc-600 dark:text-zinc-300
                    border border-zinc-200 dark:border-zinc-700
                    hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400
                    transition-all duration-150"
                  whileTap={{ scale: 0.95 }}
                >
                  <DownloadIcon />
                  Resume
                </motion.a>

                {/* Hire Me */}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => scrollTo("#contact"), 140);
                  }}
                  className="flex items-center px-3 py-1.5 rounded-lg text-xs font-bold
                    text-white
                    bg-linear-to-r from-indigo-500 to-violet-600
                    shadow-md shadow-indigo-500/30"
                  whileTap={{ scale: 0.95 }}
                >
                  Hire Me
                </motion.a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}