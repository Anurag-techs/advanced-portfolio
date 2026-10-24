# Anurag Singh — 3D Neural Lab Portfolio

A futuristic, high-performance 3D developer portfolio engineered with **React, Three.js, React Three Fiber, TypeScript, and Tailwind CSS**.

Built for **Anurag Singh** — AI/ML & Full-Stack Developer.

---

## 🚀 Features

1. **Section 1: Cinematic 3D Hero**
   - Interactive Three.js / React Three Fiber **Neural Core** with procedural sphere nodes, continuous rotation, and responsive mouse parallax.
   - Floating holographic tags: `AI / ML`, `Full-Stack`, `Real World Impact`, `Let's Build the Future`.
   - Verified social links (GitHub, LinkedIn, Email).

2. **Section 2: About Me (Neural Lab Control Room)**
   - Sci-Fi HUD workstation with interactive tabs (System Status, Engineering Stack, Core Philosophy).
   - High-contrast telemetry activity visualizer.
   - Verified academic credentials and metric highlight cards.

3. **Section 3: Featured Projects Gallery**
   - Interactive category filter tabs (`All`, `AI/ML`, `Full Stack`, `Desktop Apps`, `Web Apps`).
   - 3D perspective tilt cards with glassmorphic borders and hover physics.
   - Real projects showcased:
     - **Edge AI Railway Safety Dashboard** (verified repository and live deployment)
     - **RideAgent - Car Sharing App** (MERN stack with Razorpay)
     - **JARVIS AI Assistant** (Python voice automation)
     - **MediMind AI**, **SpendSmart Finance**, **AI Travel Guide**

4. **Section 4: Technical Skills (3D Tech Orbit)**
   - Interactive 3D revolving constellation around a central AI core.
   - Orbiting technology badges (React, Python, TypeScript, TensorFlow, Node.js, MongoDB, Express, Git).
   - Categorized technical breakdown with interactive hover sync.

5. **Section 5: Experience & Education Timeline**
   - Illuminated vertical path with cyan pulse nodes.
   - Chronological journey milestones (2025 AI-Powered Products, 2024 B.Tech CSE AI/ML, Hackathons, 2023 Coding Journey).
   - Holographic mountain summit visualization with stepping stones (`Innovate`, `Learn`, `Build`, `Future`).

6. **Section 6: Project Case Study Modal**
   - Deep-dive technical modal with multi-screenshot cockpit feeds.
   - Tabbed case study breakdown: Overview, Features, Tech Stack, Architecture flow, Challenges, Results, Lessons Learned.

7. **Section 7: Contact (Interactive 3D Globe)**
   - Revolving particle globe with active telemetry indicator.
   - One-click email clipboard copy and direct mailto client composer.
   - Direct links to verified LinkedIn and GitHub profiles.

8. **Section 8: Modern Footer**
   - AS Monogram logo, copyright year generation, and smooth back-to-top button.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React + Custom SVG Monograms
- **Animations**: CSS Hardware-Accelerated Transforms

---

## 💻 Local Development

Run the development server locally:

```bash
# Navigate to the project directory
cd d:\vs_codefiles\Advanced_portfolio

# Install dependencies (if not already installed)
npm install

# Start Vite dev server
npm run dev
```

Visit [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your web browser.

---

## 📦 Production Build

```bash
npm run build
```

The output bundle is generated in `dist/`.

---

## 🌐 Deploy to Vercel

### Method 1: Using Vercel CLI
```bash
npm i -g vercel
vercel
```

### Method 2: Via GitHub & Vercel Dashboard
1. Initialize Git in the project:
   ```bash
   git init
   git add .
   git commit -m "feat: complete 3D Neural Lab portfolio"
   ```
2. Create a new repository on your GitHub account (`https://github.com/new`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/Anurag-techs/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. In [Vercel Dashboard](https://vercel.com/new), click **Import Repository**, choose your new repo, and click **Deploy**. Vercel will automatically detect Vite and deploy your site!

---

## ⚙️ Configuration Files

- Profile details: `src/data/profile.ts`
- Project case studies: `src/data/projects.ts`
- Skills & orbit nodes: `src/data/skills.ts`
- Journey milestones: `src/data/journey.ts`
- Resume: Place your `resume.pdf` into the `public/` directory.
