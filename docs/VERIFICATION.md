# Verification record

Verified on 2026-10-01. [GitHub Actions run 36837257586](https://github.com/Lior41/signbridge/actions/runs/36837257586) passed: TypeScript, ESLint, 7 unit tests, production build and desktop/mobile Chromium journeys (prewritten walkthrough, rejection, correction and camera-off behavior).

Local checks also passed. Local automated Chromium launch was blocked by the macOS sandbox; CI provides the browser execution evidence. Manual browser checks were performed separately.

[Public deployment](https://lior-signbridge.vercel.app) is on Vercel Hobby. The landing page and core interaction were checked after deployment. No paid provider is enabled.

Docker was not executed. No ASL model, accuracy evaluation or authorized signed reply videos are included. Camera testing on the owner’s real camera was not performed; the interface keeps it off by default.
