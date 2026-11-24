# STEMVERSE Academy — Track 4 (UnlockED) | Team deepcoders (ID: 51288e7a)

**Offline-First 3D Science Simulations & AI-Assisted Rural Classroom Portal**  
Built for **wHACKiest 2026** (Track 4 — Problem 2: *Low-Bandwidth Adaptive Learning for Rural Schools*).

## Core Features (Early MVP)
- **Interactive 3D Chapter Sandbox (`Three.js`):** Low-poly procedural Class 9 NCERT *Force & Laws of Motion* simulation (<300 KB) with deterministic physics ground truth (`setParams`, `triggerAction`, `getState`, `loadScenario`).
- **Pre-Scripted Interactive Video Mode:** Timed captions + voice narration that actively controls camera angles and parameters inside the live 3D sandbox.
- **Adaptive Misconception Loop:** Local SM-2 mastery engine that maps wrong answers to targeted misconception notes and auto-loads the exact 3D scenario to fix the error.
- **PESU Academy–Style Portal & AI Teacher Assistant:** Offline announcements, results, PDF certificates, and AI-assisted partial-credit rubric grading with 1-click teacher approval.
- **100% Offline-First PWA:** Service Worker + localStorage sync queue for Airplane Mode learning and opportunistic delta sync.

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/stemverse-academy-whackiest26.git
   cd stemverse-academy-whackiest26
   ```
2. Start a lightweight local server (required for Service Workers):
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in Chrome/Edge and toggle **Student View / Teacher View** or turn on **Airplane Mode** to test offline caching.

## Team `deepcoders` (PES University — Electronic City Campus)
- **Nitin S** (Team Lead)
- **RuthwiktejReddy Obulampalli**
- **Naveed Khan**
- **Deepak M**
