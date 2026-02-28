# Anchor — Frontend

> Your Personal Narrative and Digital Guardian

Anchor is an AI-powered mental wellness web application designed
to support young adults before, during, and beyond crisis moments.
Built for AMD Slingshot 2025 | AI for Social Good.

**Live Prototype:** https://anchor-topaz.vercel.app/
**Backend Repository:** https://github.com/Khushicodes15/anchor-backend

---

## What is Anchor?

Anchor combines daily narrative-therapy journaling with a
crisis-ready safety infrastructure — so when crisis hits,
the safety net is already built and personal.

The platform covers four emotional domains:
- Reflection — AI Journal for narrative therapy
- Stabilization — Crisis Mode for immediate support
- Prevention — Safety Plan Builder for calm-moment preparation
- Shared Humanity — Community Library for anonymous story sharing

---

## Core Features

### AI Narrative Journal (/journal)
Chat-style journaling powered by Google Gemini. The AI reflects
back on what the user writes — not diagnosis, but narrative
guidance that builds self-awareness and emotional resilience
over time. Sessions are exportable as PDF to share directly
with a therapist. A conversation history sidebar keeps all
past sessions accessible.

### Crisis Mode (/crisis)
One-tap activation — zero cognitive load required. A six-step
full-screen guided flow designed for moments of acute distress:

1. Breathing exercise
2. Grounding steps
3. Coping strategies (pulled from the user's own safety plan)
4. Safe contacts
5. Reasons to live
6. Exit to dashboard

Intentionally minimal AI involvement to avoid overwhelming the
user. Voice-first interaction is supported for moments when
typing is impossible.

### Safety Plan Builder (/safety-plan)
Users define their personal triggers, coping strategies, safe
contacts, and reasons to live during calm moments. This plan
is stored and loaded directly into Crisis Mode — making every
crisis response personalized, not generic. Fully editable with
optional AI-assisted suggestions.

### Dashboard (/dashboard)
The emotional home screen after login. Includes a daily
emotional check-in prompt, quick navigation to all four core
domains, a recent journal snippet, safety plan status, and
always-visible crisis quick access.

### Community Library (/community)
An anonymous narrative sharing space. Users can read stories
without creating an account. Posting requires auth. All
submissions pass through Azure AI Content Safety moderation
before publishing. Mood tags and save interactions are
supported.

### Anchor Wrapped (/wrapped)
A periodic emotional reflection summary — mood patterns over
time, recurring themes, and narrative highlights generated
from journal history. Think Spotify Wrapped, but for your
mental health journey.

### Therapist Support (/therapist)
Users can find a therapist, send journal sessions as PDF
directly to them, and email or message when needed. Bridges
AI support and professional care without replacing it.

### Settings (/settings)
User profile and preferences, notification controls, change
password, privacy and safety data management, and account
logout.

---

## Tech Stack

**Framework:** Next.js 14 (App Router)
**Language:** TypeScript
**Styling:** Tailwind CSS
**Authentication:** Firebase Authentication
**Database:** Firebase Firestore
**Push Notifications:** Firebase Cloud Messaging
**AI — Journaling:** Google Gemini API
**AI — Sentiment and Emotion:** Azure AI Language
**AI — Content Moderation:** Azure AI Content Safety
**Deployment:** Vercel

---

## Project Structure
```
anchor/
├── app/
│   ├── dashboard/
│   ├── journal/
│   ├── crisis/
│   ├── safety-plan/
│   ├── community/
│   ├── wrapped/
│   ├── settings/
│   ├── signin/
│   └── signup/
├── components/
│   ├── ui/
│   ├── journal/
│   ├── crisis/
│   ├── safety-plan/
│   └── community/
├── lib/
│   ├── firebase.ts
│   ├── gemini.ts
│   └── azure.ts
├── hooks/
├── types/
└── public/
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project with Firestore and Auth enabled
- Google Gemini API key
- Azure AI Language endpoint and key
- Azure AI Content Safety endpoint and key

### Installation
```bash
# Clone the repository
git clone https://github.com/Khushicodes15/Anchor.git
cd Anchor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory.
All keys are stored as environment variables —
no secrets are present in the codebase.
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Backend
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

# Google Gemini
GEMINI_API_KEY=your_gemini_key

# Azure AI Language
AZURE_LANGUAGE_KEY=your_azure_language_key
AZURE_LANGUAGE_ENDPOINT=your_endpoint

# Azure AI Content Safety
AZURE_CONTENT_SAFETY_KEY=your_content_safety_key
AZURE_CONTENT_SAFETY_ENDPOINT=your_endpoint
```

### Run Locally
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## Deployment

The frontend is deployed on Vercel. Ensure all environment
variables from `.env.local` are added to your Vercel project
under Settings → Environment Variables before deploying.
```bash
npm i -g vercel
vercel --prod
```

---

## AI Pipeline

**Journal flow:**
User writes entry → Google Gemini generates narrative
reflection → Azure AI Language runs sentiment analysis,
opinion mining, and key phrase extraction → Emotional pattern
stored in Firestore → Azure AI Early Warning detects decline
→ Firebase Cloud Messaging sends gentle nudge to user.

**Community moderation flow:**
User submits story → Azure AI Content Safety checks for
self-harm signals and unsafe content → Approved stories are
published to the Community Library → Rejected submissions
trigger a gentle guidance message to the user.

---

## Crisis Mode Design Philosophy

Crisis Mode is intentionally minimal. Key design decisions:

No AI responses are generated during an active crisis session.
This eliminates any risk of harmful or confusing AI output
at the worst possible moment. All steps are tap-through —
no typing is ever required. The flow uses the user's own
pre-built safety plan, making every response personal rather
than generic. A maximum of six steps keeps the experience
clinically informed and cognitively manageable.

---

## Responsible AI Principles

Anchor makes the following commitments:

- No diagnosis or medical prescriptions under any circumstance
- No personally identifiable data passed into AI prompts
- Azure AI Content Safety applied to all user-generated content
- Clear in-app disclaimers — Anchor is support, not a
  replacement for professional care
- Privacy-first architecture — no forced disclosure
- Bias-aware prompting across all AI interactions

---

## Related

**Backend API:** https://github.com/Khushicodes15/anchor-backend
**Live App:** https://anchor-topaz.vercel.app/
**Built for:** AMD Slingshot 2025 — AI for Social Good

---

## Team

**Team Name:** Safe Harbor
**Team Leader:** Khushi Dhona
**Hackathon:** AMD Slingshot 2025

---

*Rewrite your story. Protect it when it matters.*
