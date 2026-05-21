# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React 19 + Vite SPA wrapped as an Android app via Capacitor 8. English vocabulary practice game for Guangzhou elementary grades 3–6, with sentence and word modes across four game types.

## Commands

```bash
npm run dev                    # Vite dev server (http://localhost:5173)
npm run build                  # Build web app to dist/
npm run lint                   # ESLint flat config (no typecheck, no Prettier)
npm run preview                # Preview production build
```

### Android Build (full flow)

```bash
npm run build                    # 1. Build web assets to dist/
npx cap sync android             # 2. Sync dist/ + plugins into android/
cd android && ./gradlew assembleDebug  # 3. Build debug APK
```

Output APK: `android/app/build2/outputs/apk/debug/app-debug.apk`

### Build Requirements

- **JDK 21** required (`D:\tool\jdk21` available). The Gradle config targets Java 21 (`sourceCompatibility JavaVersion.VERSION_21`). JDK 17 will fail.
- **Android SDK** at `C:\Users\timman\AppData\Local\Android\Sdk`
- **Gradle 8.13** with AGP 8.13.0

### Build Troubleshooting (Windows)

- If Gradle fails with "Could not stat file" errors on `build_output` directories, it means previous build files are locked (SYSTEM ownership). Solution: change `buildDir` in the failing module's `build.gradle` to a new path like `"${projectDir}/build2"`, then clean and rebuild.
- Kill stale Java processes: `taskkill /F /IM java.exe`
- Use `--no-daemon` flag if Gradle daemon causes repeated issues

## Architecture

### Entry & Routing

- **src/main.jsx** — mounts with `HashRouter` (required for Capacitor's `file://` protocol)
- **Routes** defined in [src/App.jsx](src/App.jsx):
  - `/` — grade selection (Home)
  - `/play/:grade` — game mode selection (GameZone)
  - `/play/:grade/flashcard` — Flashcard
  - `/play/:grade/matching` — Matching
  - `/play/:grade/quiz` — Quiz
  - `/play/:grade/spelling` — Spelling
  - `/play/:grade/sentence-flashcard`, `sentence-matching`, `sentence-quiz` — sentence variants (reuse same components with different data)
- Exit flow: double-back-press on exit-eligible pages (`/` and `/play/:grade`) shows toast, then confirmation dialog

### Data

- [src/data/words.js](src/data/words.js) — word-level vocabulary keyed by grade (3–6), each item `{ en, zh }`
- [src/data/sentences.js](src/data/sentences.js) — sentence-level content, same shape
- At game start, the component selects 10 random items from the corresponding grade's data

### Game Components

- **Flashcard** — flip-to-reveal with swipe to next/previous, speaker button for TTS
- **Matching** — pair English with Chinese in a grid (tap two cards to match)
- **Quiz** — multiple-choice (4 options: English text → pick Chinese translation, or vice versa)
- **Spelling** — letter buttons in shuffled order, tap to spell the word
- **SpeakerButton** — reusable TTS button using speech utility

### Utils

- [src/utils/speech.js](src/utils/speech.js) — Capacitor TTS (`@capacitor-community/text-to-speech`) with `window.speechSynthesis` fallback
- [src/utils/sound.js](src/utils/sound.js) — Web Audio API for game SFX (correct/wrong/flip/click/match/complete)
- [src/utils/shuffle.js](src/utils/shuffle.js) — Fisher-Yates shuffle
- [src/utils/messages.js](src/utils/messages.js) — Chinese UI strings used across components

### Styling & Animation

- Global CSS in [src/index.css](src/index.css) and [src/App.css](src/App.css)
- Framer Motion with `AnimatePresence` for page transitions

## Technical Notes

- **No TypeScript** — `.jsx` only, no `tsconfig`
- **No test framework** — no vitest, jest, or e2e configured
- **Mobile-first** — viewport locked `user-scalable=no` in `index.html`, designed for phone-sized screens
- **Grade keys** are numbers (3, 4, 5, 6), not strings
- **Data file exports** use `const` (not `export default`) — imported directly
- **All UI text is Chinese**; game content is English vocabulary
