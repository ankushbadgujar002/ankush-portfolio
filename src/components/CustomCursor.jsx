// src/components/CustomCursor.jsx
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTORS = "a, button, [data-cursor-hover]";

export default function CustomCursor() {
    const [hovered, setHovered] = useState(false);
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
    const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

    const ringX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.8 });
    const ringY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.8 });

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        document.body.style.cursor = "none";

        const onMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!visible) setVisible(true);
        };
        const onOver = (e) => { if (e.target.closest(HOVER_SELECTORS)) setHovered(true); };
        const onOut = (e) => { if (e.target.closest(HOVER_SELECTORS)) setHovered(false); };
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        window.addEventListener("mouseout", onOut);
        document.documentElement.addEventListener("mouseleave", onLeave);
        document.documentElement.addEventListener("mouseenter", onEnter);

        return () => {
            document.body.style.cursor = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            window.removeEventListener("mouseout", onOut);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            document.documentElement.removeEventListener("mouseenter", onEnter);
        };
    }, []);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            {/* Large ring — lags behind */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    borderStyle: "solid",
                }}
                animate={{
                    width: hovered ? 56 : 36,
                    height: hovered ? 56 : 36,
                    opacity: visible ? 1 : 0,
                    backgroundColor: hovered ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0)",
                    borderColor: hovered ? "rgb(99,102,241)" : "rgba(99,102,241,0.6)",
                    borderWidth: 1.5,
                }}
                transition={{
                    width: { type: "spring", stiffness: 300, damping: 28 },
                    height: { type: "spring", stiffness: 300, damping: 28 },
                    opacity: { duration: 0.2 },
                    backgroundColor: { duration: 0.2 },
                    borderColor: { duration: 0.2 },
                }}
            />

            {/* Small dot — snaps instantly */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 rounded-full bg-indigo-500"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 6,
                    height: 6,
                }}
                animate={{
                    opacity: visible ? (hovered ? 0 : 1) : 0,
                    scale: hovered ? 0 : 1,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 500, damping: 30 },
                    opacity: { duration: 0.15 },
                }}
            />
        </>
    );
}