// src/components/Navbar.jsx
// Week 2 — Animated Navbar
// Deps: framer-motion v12, lenis v1.3, tailwind v4

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// ─── Config ──────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Experience",   href: "#experience" },
  { label: "Contact",      href: "#contact" },
];

// ─── Dark-mode hook ───────────────────────────────────────────────────────────

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

  // Respect saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  return { dark, toggle };
}

// ─── Active section hook ──────────────────────────────────────────────────────

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

// ─── Smooth-scroll click handler (works with Lenis) ───────────────────────────

function scrollTo(href) {
  const el = document.querySelector(href);
  if (!el) return;
  // Lenis intercepts native scroll — just call scrollIntoView; Lenis handles the easing
  el.scrollIntoView({ behavior: "smooth" });
}

// ─── Sun / Moon icons (inline SVG — no icon dep needed) ──────────────────────

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    className="size-5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42
             M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    className="size-5">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

// ─── Hamburger icon (animates between ☰ and ✕) ───────────────────────────────

const HamburgerIcon = ({ open }) => (
  <div className="relative size-6 flex flex-col justify-center gap-1.25">
    <motion.span
      className="block h-0.5 w-full bg-current rounded-full origin-center"
      animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25 }}
    />
    <motion.span
      className="block h-0.5 w-full bg-current rounded-full"
      animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
    <motion.span
      className="block h-0.5 w-full bg-current rounded-full origin-center"
      animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.25 }}
    />
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const { dark, toggle } = useDarkMode();
  const active = useActiveSection(NAV_LINKS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide on scroll-down, reveal on scroll-up
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    if (y < 80) { setHidden(false); } // always show near top
    else if (delta > 6)  setHidden(true);
    else if (delta < -6) setHidden(false);
    lastY.current = y;
  });

  // Close mobile menu on resize → desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ── Navbar bar ─────────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-10
                   flex items-center justify-between h-16
                   bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md
                   border-b border-zinc-200/60 dark:border-zinc-700/60"
        // Slide-in on mount
        initial={{ y: -80, opacity: 0 }}
        animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          ASB<span className="text-indigo-500">.</span>
        </motion.a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                className="relative px-3 py-1.5 text-sm font-medium rounded-md
                           text-zinc-600 dark:text-zinc-300
                           hover:text-zinc-900 dark:hover:text-white
                           transition-colors duration-150"
              >
                {label}
                {/* Active underline pill */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-md bg-indigo-50 dark:bg-indigo-500/15 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <motion.button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-md text-zinc-500 dark:text-zinc-400
                       hover:text-zinc-900 dark:hover:text-white
                       hover:bg-zinc-100 dark:hover:bg-zinc-800
                       transition-colors duration-150"
            whileTap={{ scale: 0.88, rotate: 20 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "moon" : "sun"}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-300
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <HamburgerIcon open={menuOpen} />
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              className="fixed top-16 inset-x-0 z-40 md:hidden
                         bg-white dark:bg-zinc-900
                         border-b border-zinc-200 dark:border-zinc-700
                         px-6 pb-6 pt-3 flex flex-col gap-1"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              {NAV_LINKS.map(({ label, href }, i) => {
                const isActive = active === href.slice(1);
                return (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      // Small delay so drawer closes before scroll
                      setTimeout(() => scrollTo(href), 160);
                    }}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isActive
                        ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045 }}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
