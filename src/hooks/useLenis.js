// src/hooks/useLenis.js
import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth scroll and returns the instance.
 * Wire it into your RAF loop or let it manage its own via requestAnimationFrame.
 *
 * Usage in App.jsx:
 *   const lenis = useLenis();
 *
 * If you add GSAP ScrollTrigger (Week 3), pass lenis.current into
 * ScrollTrigger.scrollerProxy — see comment below.
 */
export default function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,          // scroll easing duration (seconds)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // ── RAF loop ──────────────────────────────────────────────────────────────
        // Using its own loop so it works out of the box without GSAP.
        // When you add GSAP in Week 3, replace this with gsap.ticker.add below.
        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // ── GSAP ScrollTrigger integration (uncomment in Week 3) ─────────────────
        // import { ScrollTrigger } from "gsap/ScrollTrigger";
        // lenis.on("scroll", ScrollTrigger.update);
        // gsap.ticker.add((time) => lenis.raf(time * 1000));
        // gsap.ticker.lagSmoothing(0);
        // Remove the manual RAF loop above when switching to this.

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return lenisRef;
}