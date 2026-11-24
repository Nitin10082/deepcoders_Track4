# SchoolSaathi — Track 4 (UnlockED) | Team deepcoders (ID: 51288e7a)

**Offline-First 3D Science Simulations & AI-Assisted Rural Classroom Portal**  
Built for **wHACKiest 2026** (Track 4 — Problem 2: *Low-Bandwidth Adaptive Learning for Rural Schools*).

## Overview
**SchoolSaathi** replaces passive textbook memorization in low-connectivity rural schools with an ultra-lightweight (<45 KB), offline-first web application combining interactive 3D concept simulations, bilingual regional support (English & Kannada), adaptive misconception remediation, and a classroom portal with AI-assisted teacher grading.

## Core Features (MVP)
- **Interactive 3D Concept Sandbox:** Self-contained isometric 3D physics playground for Class 9 NCERT *Force & Laws of Motion* (`F = m × a`) with adjustable Force, Mass, and Friction sliders, Battery Saver (30 FPS) / Smooth 3D (60 FPS) quality tiers, and preset scenarios (`setParams`, `triggerAction`, `getState`, `loadScenario`).
- **Guided 3D Walkthrough:** Synchronized step-by-step captions and automated simulation actions teaching inertia, friction, and acceleration inside the live 3D canvas.
- **Adaptive Mastery Quiz & Misconception Engine:** Simulation-verified questions where wrong answers identify the exact conceptual mistake and launch the matching 3D lab setup to visually remediate it.
- **Bilingual Toggle (EN / ಕನ್ನಡ):** Instant switching between English and Kannada for rural accessibility.
- **Classroom Portal & AI Teacher Assistant:** Offline announcements, student mastery stats, downloadable completion certificates, and AI-drafted partial-credit rubric grading with 1-click teacher approval.
- **100% Offline-First Architecture:** Runs directly in any browser (including Airplane Mode) with `localStorage` event queuing and opportunistic delta sync.

## How to Run Locally
1. Clone or download this repository:
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/deepcoders_Track4.git
   cd deepcoders_Track4
