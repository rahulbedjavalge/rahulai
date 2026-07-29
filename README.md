# rahulai.com

Premium personal website for Rahul, positioned as an AI Product Consultant, AI Entrepreneur, and Founder.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js

## What It Includes

- Premium hero section with parallax glow treatment
- Animated global delivery model
- Interactive world map powered by Three.js
- Services, process timeline, case studies, and testimonials
- AI opportunity calculator
- Contact and footer sections with SEO-ready metadata
- Dark and light theme support through system styling

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Local Development

1. Install dependencies with `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:3000`.

## Notes

- The design is intentionally premium, minimal, and enterprise-oriented rather than agency-style.
- The world map is rendered with Three.js and the motion language is driven by Framer Motion.

## Environment

This project uses standard Next.js environment variables. Create a `.env.local` in the project root with any keys needed for running locally.

Recommended variables:

- `NEXT_PUBLIC_CALENDLY_URL` — your Calendly booking page (e.g. `https://calendly.com/your-calendar`).
- `RESEND_API_KEY` — API key for Resend.com to forward contact form submissions to your inbox.
- `OPENAI_API_KEY` or `OPENROUTER_API_KEY` — if you want server-side AI features enabled (not required).

The app provides a fallback for the AI summarizer when no API key is configured.
