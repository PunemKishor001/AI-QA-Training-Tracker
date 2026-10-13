# AI QA Training Tracker

A responsive React + Vite front-end for tracking a 30-day QA Automation and AI testing study plan.

## Features

- 30-day plan covering Python, HTML/CSS/JavaScript, manual QA, Playwright, PyTest, fixtures, POM, API, SQL, Git/CI/CD, AI testing, LLM evaluation, DeepEval, RAG, AI agents, and interview practice.
- Daily schedule: 6–8 AM learning/coding and 8–10 PM hands-on/interview practice.
- Daily checklist, topic-by-topic checkmarks, notes, interview answers, and progress summaries.
- Editable plan start date.
- Automatic saving in the current browser using localStorage.
- Export progress as a JSON backup.
- Responsive layout for desktop and mobile.

## Requirements

- Node.js 20 or later recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build for deployment

```bash
npm run build
npm run preview
```

The production website is generated in the `dist/` folder.

## Deploy to Vercel

1. Create a GitHub repository and upload the project files.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

You can also deploy from a terminal if Vercel CLI is installed and configured:

```bash
npm install
npm run build
npx vercel
```

## Important storage note

This is a front-end-only app. Progress, notes, and answers are stored in localStorage in the browser where you use the app. They do not automatically sync across devices or browsers. Use **Export progress** to download a JSON backup. To support multi-device sync or accounts, add a backend/database such as Supabase or another database later.

## Browser reminder notifications

Use **Enable reminders** in the header and allow browser notification permission. While the app is open in a browser, it can show a morning reminder at 6:00 AM and an evening progress reminder at 9:00 PM using your device's local time. The browser must be open and allowed to send notifications. This front-end-only version cannot guarantee reminders when the browser/app is closed or the device is asleep; reliable background push notifications need a service worker plus a push/backend service.
