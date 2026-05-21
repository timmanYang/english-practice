# AGENTS.md — 英语单词欢乐练

## Project

React 19 + Vite SPA packaged as Android app via Capacitor 8.
English vocabulary/sentence practice game for Guangzhou elementary grades 3–6.
No TypeScript, no test framework.

## Commands

```
npm run dev       # Vite dev server
npm run build     # Build to dist/
npm run lint      # ESLint flat config (no typecheck, no Prettier)
```

## Android Build

```
npm run build          # 1. Build web assets
npx cap copy           # 2. Sync dist/ into android/
cd android && .\gradlew assembleDebug --no-daemon   # 3. APK
```

- **build output:** `android/app/build3/` (not `android/build/` or `app/build/` — custom `buildDir`)
- **SDK:** `C:\Users\timman\AppData\Local\Android\Sdk`
- **Gradle 8.13** / **AGP 8.13.0** / **compileSdk 36**
- Kill stale Java with `taskkill /F /IM java.exe` if build hangs
- Use `--no-daemon` if Gradle daemon causes issues on Windows

## Architecture

### Entry & Routing

- **`src/main.jsx`** — mounts `HashRouter` (required for Capacitor `file://` protocol, not `BrowserRouter`)
- **`src/App.jsx`** — layout + routes + exit handling
- Routes (all game pages accept `:grade` from params):
  - `/` — **Home** (grade selection + all game mode grids) — primary entry
  - `/play/:grade` — GameZone (legacy, still reachable but unused in flow)
  - `/play/:grade/{flashcard,matching,quiz,spelling}` — word games
  - `/play/:grade/sentence-{flashcard,matching,quiz}` — sentence variant (same component, different data)
  - `/play/:grade/reading` — reading component
- All game **back buttons** navigate to `/` (Home), not to `/play/:grade`

### Exit Flow

Uses Capacitor `backButton` listener on native Android, `popstate` fallback in browser.
Intercepts ALL hardware back presses app-wide:
- **1 press** → toast "再按一次退出应用" (2s auto-dismiss)
- **2 presses within 2s** → `ConfirmLeave` dialog
- Confirm → `CapApp.exitApp()`

### Page Layout

- `min-height: 100vh` throughout — no `overflow: hidden` on containers, natural scroll
- Framer Motion `AnimatePresence mode="wait"` for page transitions with `key={location.pathname}`
- CSS variables in `src/index.css`, component styles in `src/App.css`
- Mobile-first: `user-scalable=no` in `index.html`

### Data

- `src/data/words.js`, `sentences.js`, `readings.js` — all use `export default`
- Keyed by numeric grade keys (3, 4, 5, 6), each entry `{ en, zh }`
- Game components select `list[grade]` via `useParams().grade`
- `pickItems()` in `shuffle.js` avoids recently-seen items using localStorage

### Components

- **Flashcard / Matching / Quiz / Spelling** — word games (10 items per round)
- **Reading** — Fisher-Yates shuffle queue cycles through all readings before repeating; auto-TTS on entry
- **SpeakerButton** — reusable TTS trigger
- **Confetti** — used by game results overlays
- **ConfirmLeave** — shared exit/navigation confirmation dialog

### Utils

- `speech.js` — tries `@capacitor-community/text-to-speech` first, falls back to `window.speechSynthesis` on failure or unsupported platform
- `sound.js` — Web Audio API tones (`initAudio()` called from Home.jsx `useEffect`)

## Gotchas

- **framer-motion `AnimatePresence mode="wait"`:** parent `motion.div` with `initial="string"` using undefined variants can stall child animations on first mount. Always use `initial={{ opacity: 0 }}` directly.
- **Data import:** files use `export default`, imported as `import words from '../data/words'`
- **StrictMode:** enabled in main.jsx — effects fire twice in dev
- **No async `useEffect`:** Capacitor `addListener` returns a Promise; handle cleanup via stored reference or `removeAllListeners()`
- **Capacitor `addListener` cleanup:** call `.remove()` on returned handle; `CapApp.removeAllListeners()` is also safe if only one listener is registered
- **`@capacitor/core`** `Capacitor.isNativePlatform()` available for platform detection
