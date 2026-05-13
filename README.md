# Ankush Badgujar — Portfolio 🚀

A fully animated, production-grade personal portfolio built with React + Vite. Features a Three.js R3F particle hero, GSAP ScrollTrigger section reveals, Framer Motion 3D card flips, Lenis smooth scroll, a custom magnetic cursor, dark mode, and full mobile responsiveness.

👉 **Live:** [badgujar-portfolio.netlify.app](https://badgujar-portfolio.netlify.app)

---

## ✨ Features

- **Particle Hero** — 180 R3F particles with mouse attraction, connection lines, and additive blending
- **Custom Cursor** — Dual-ball spring cursor that expands on hover
- **Smooth Scroll** — Lenis (expo ease-out) wired into GSAP ticker for scrub-accurate animations
- **Navbar** — Glassmorphism + gradient glow, scroll-hide, active section pill, dark mode toggle, Resume download, Hire Me CTA
- **About Section** — GSAP ScrollTrigger reveals, animated vertical timeline, alternating left/right layout
- **Skills Section** — 16-badge floating cloud, radial SVG progress rings animated by GSAP, counters that tick in sync
- **Projects Section** — 3D card flip on click, magnetic tilt on hover, live GitHub API stats, filter tabs by category
- **Experience Section** — GSAP scroll-scrub vertical timeline, internship + certification entries, open-to-work banner
- **Contact Section** — EmailJS form with mailto fallback, WhatsApp link, social icons
- **Dark Mode** — System preference detection + manual toggle, persisted via localStorage

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Animation | GSAP 3.15 + ScrollTrigger |
| Motion | Framer Motion v12 |
| 3D / WebGL | Three.js v0.184 + React Three Fiber v9 |
| Smooth Scroll | Lenis v1.3 |
| Email | EmailJS |
| Deployment | Netlify |

---

## 📁 Project Structure

```
D:\ANIMATED_PORTFOLIO\ANKUSH-PORTFOLIO\SRC
│   App.css
│   App.jsx
│   index.css
│   main.jsx
│
├───assets
│       ankush.png
│
├───components
│       CustomCursor.jsx        # Dual-ball magnetic cursor
│       HeroText.jsx            # Typewriter cycling text
│       Navbar.jsx              # Glassmorphism navbar with CTA + socials
│       ParticleBackground.jsx  # Three.js R3F particle system
│
├───hooks
│       useLenis.js             # Lenis smooth scroll → GSAP ticker
│
└───sections
        AboutSection.jsx        # Bio, stats, animated timeline
        ContactSection.jsx      # EmailJS form + social links
        ExperienceSection.jsx   # GSAP scroll-scrub experience timeline
        HeroSection.jsx         # Split layout + particle background
        ProjectsSection.jsx     # 3D flip cards + live GitHub stats
        SkillsSection.jsx       # Floating badge cloud + SVG progress rings
```

---

## 🔧 How It Works

### Smooth Scroll
Lenis is initialised in `useLenis.js` and wired into the GSAP ticker:
```js
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
This keeps GSAP ScrollTrigger scrub animations perfectly in sync with Lenis momentum.

### Particle Hero
Three.js R3F renders 180 particles with additive blending. Each frame, particles drift toward the mouse position and dynamic connection lines are drawn between particles within a threshold distance. Built inside `ParticleBackground.jsx` and composed into `HeroSection.jsx` with `relative z-10` on the content layer.

### 3D Card Flip
Framer Motion `rotateY` animates each project card between 0° and 180°. Front and back faces use `backfaceVisibility: hidden` with `transformStyle: preserve-3d`. Magnetic tilt on hover uses `useMotionValue` + `useSpring` for a smooth elastic feel.

### GSAP ScrollTrigger
Each section registers its own `gsap.context()` for proper cleanup on unmount. Timeline lines use `scrub: 0.8` so they draw exactly as the user scrolls. Cards and headings use `toggleActions: "play none none reverse"` so they re-animate on scroll back up.

### EmailJS
Form submissions are sent via EmailJS. If the API call fails, it falls back to a `mailto:` link so the user can always reach out.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/ankushbadgujar002/ankush-portfolio.git
cd ankush-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy
The project is configured for Netlify. Push to `master` and Netlify auto-deploys.

---

## 📦 Key Dependencies

```json
"react": "^18",
"vite": "^5",
"gsap": "^3.15",
"framer-motion": "^12",
"three": "^0.184",
"@react-three/fiber": "^9",
"lenis": "^1.3",
"@emailjs/browser": "^4",
"tailwindcss": "^4"
```

---

## 🔹 Sections Overview

| Section | File | Highlights |
|---|---|---|
| Hero | `HeroSection.jsx` | R3F particles, typewriter text, floating photo |
| About | `AboutSection.jsx` | Animated timeline, stats counters, bio |
| Skills | `SkillsSection.jsx` | Floating badge cloud, SVG progress rings |
| Projects | `ProjectsSection.jsx` | 3D flip cards, live GitHub stats, category filters |
| Experience | `ExperienceSection.jsx` | Scroll-scrub timeline, internship + certification |
| Contact | `ContactSection.jsx` | EmailJS form, WhatsApp, GitHub, LinkedIn |

---

## 🔹 Live Demo

👉 [badgujar-portfolio.netlify.app](https://badgujar-portfolio.netlify.app)

---

## 🔹 Author

**Ankush S Badgujar**
Full Stack Java Developer
B.Tech Information Technology — G.H. Raisoni College of Engineering & Management, Jalgaon

- GitHub: [github.com/ankushbadgujar002](https://github.com/ankushbadgujar002)
- LinkedIn: [linkedin.com/in/ankush-badgujar-908904256](https://linkedin.com/in/ankush-badgujar-908904256)
- Email: ankushbadgujar1122002@gmail.com

---

## 🔹 Disclaimer

This portfolio is built for personal branding and demonstration purposes. All project data and GitHub stats are fetched live from the GitHub API at runtime.

---

## 🔹 Future Enhancements

- Blog / case study pages per project
- PWA manifest + offline support
- Lighthouse score 95+
- Custom domain
