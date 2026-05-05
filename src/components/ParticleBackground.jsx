// src/components/ParticleBackground.jsx
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleField({ count = 180, mouse }) {
    const mesh = useRef();
    const { size } = useThree();

    // Generate stable random positions once
    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pos[i3] = (Math.random() - 0.5) * 14;  // x: spread wide
            pos[i3 + 1] = (Math.random() - 0.5) * 8;   // y: spread tall
            pos[i3 + 2] = (Math.random() - 0.5) * 4;   // z: slight depth

            // slow random drift velocity
            vel[i3] = (Math.random() - 0.5) * 0.002;
            vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
            vel[i3 + 2] = 0;
        }
        return [pos, vel];
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        const posAttr = mesh.current.geometry.attributes.position;
        const elapsed = state.clock.elapsedTime;

        // Mouse influence: map NDC [-1,1] to world space
        const mx = mouse.current.x * 6;
        const my = mouse.current.y * 3;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Drift + sine wave shimmer
            posAttr.array[i3] += velocities[i3] + Math.sin(elapsed * 0.3 + i * 0.1) * 0.0008;
            posAttr.array[i3 + 1] += velocities[i3 + 1] + Math.cos(elapsed * 0.25 + i * 0.15) * 0.0006;

            // Soft mouse attraction (very subtle — just a whisper)
            const dx = mx - posAttr.array[i3];
            const dy = my - posAttr.array[i3 + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 3.5) {
                posAttr.array[i3] += dx * 0.0008;
                posAttr.array[i3 + 1] += dy * 0.0008;
            }

            // Wrap around boundaries so particles don't escape
            if (posAttr.array[i3] > 7.5) posAttr.array[i3] = -7.5;
            if (posAttr.array[i3] < -7.5) posAttr.array[i3] = 7.5;
            if (posAttr.array[i3 + 1] > 4.5) posAttr.array[i3 + 1] = -4.5;
            if (posAttr.array[i3 + 1] < -4.5) posAttr.array[i3 + 1] = 4.5;
        }

        posAttr.needsUpdate = true;
    });

    // Circular disc texture for soft round particles
    const texture = useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }, []);

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                map={texture}
                size={0.055}
                sizeAttenuation
                transparent
                opacity={0.55}
                // Indigo-violet palette matching your accent system
                color="#818cf8"
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// ─── Connection Lines (optional, rendered as LineSegments) ─────────────────────
function ConnectionLines({ count = 180, mouse }) {
    const linesRef = useRef();
    const { size } = useThree();

    // We'll compute lines dynamically each frame from the particle positions
    // For performance we keep this to nearby pairs only (distance threshold)
    useFrame((state) => {
        if (!linesRef.current) return;
        // Lines update is driven by ParticleField's position buffer.
        // Here we just gently pulse opacity so lines breathe.
        const t = state.clock.elapsedTime;
        linesRef.current.material.opacity = 0.06 + Math.sin(t * 0.5) * 0.02;
    });

    // Static line pairs between nearby seed positions (computed once)
    const linePositions = useMemo(() => {
        const pts = [];
        const seed = [];

        for (let i = 0; i < count; i++) {
            seed.push(
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4
            );
        }

        const threshold = 2.2;
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = seed[i * 3] - seed[j * 3];
                const dy = seed[i * 3 + 1] - seed[j * 3 + 1];
                const dz = seed[i * 3 + 2] - seed[j * 3 + 2];
                const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (d < threshold) {
                    pts.push(
                        seed[i * 3], seed[i * 3 + 1], seed[i * 3 + 2],
                        seed[j * 3], seed[j * 3 + 1], seed[j * 3 + 2]
                    );
                }
            }
        }

        return new Float32Array(pts);
    }, [count]);

    if (linePositions.length === 0) return null;

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[linePositions, 3]}
                    count={linePositions.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color="#6366f1"
                transparent
                opacity={0.07}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </lineSegments>
    );
}

// ─── Main exported component ───────────────────────────────────────────────────
export default function ParticleBackground() {
    // Shared mouse ref — updated on DOM, read inside R3F
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalise to [-1, 1]
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                gl={{
                    antialias: false,          // saves GPU on a decorative layer
                    alpha: true,               // transparent canvas background
                    powerPreference: "default",
                }}
                dpr={[1, 1.5]}              // cap pixel ratio — purely decorative
                style={{ width: "100%", height: "100%" }}
            >
                {/* No lights needed — purely additive blended particles */}
                <ConnectionLines count={180} mouse={mouse} />
                <ParticleField count={180} mouse={mouse} />
            </Canvas>
        </div>
    );
}