# AGENTS.md — 英语单词欢乐练

## Project

React 19 + Vite SPA in TypeScript, packaged as Android app via Capacitor 8.
English vocabulary/sentence practice game for Guangzhou elementary grades 3–6.

## Commands

```
npm run dev       # Vite dev server (proxies /api → localhost:8080)
npm run build     # Build to dist/
npm run lint      # ESLint flat config (no typecheck, no Prettier)
npm run preview   # Vite preview server
```

## Android Build

```
npm run build          # 1. Build web assets
npx cap copy           # 2. Sync dist/ into android/
cd android && .\gradlew assembleDebug --no-daemon   # 3. APK
```

- **APK output:** `android/app/build3/outputs/apk/debug/app-debug.apk` (custom `buildDir`, not default)
- **SDK:** `C:\Users\timman\AppData\Local\Android\Sdk`
- **Gradle 8.13** / **AGP 8.13.0** / **compileSdk 36**
- Kill stale Java with `taskkill /F /IM java.exe` if build hangs

## Architecture

### Entry & Routing

- **`src/main.tsx`** — mounts `HashRouter` (required for Capacitor `file://` protocol)
- **`src/App.tsx`** — layout + routes + hardware-back exit handling
- All routes accept `:grade` from URL params:
  - `/` — Home (grade selector + game mode grid) — primary entry
  - `/play/:grade` — GameZone (legacy, unused in normal flow)
  - `/play/:grade/{flashcard,matching,quiz,spelling}` — word games (10 per round)
  - `/play/:grade/sentence-{flashcard,matching,quiz}` — sentence variant (same component, different data)
  - `/play/:grade/reading` — reading (Fisher-Yates shuffle, no repeats until cycle)
- All game back buttons navigate to `/`, not `/play/:grade`

### Exit Flow

Capacitor `backButton` listener (Android), `popstate` fallback (browser):
- 1 press → toast "再按一次退出应用" (2s auto-dismiss)
- 2 presses within 2s → `ConfirmLeave` dialog → `CapApp.exitApp()`

### Data

- **No local data files** — all data fetched from API (`/api/words/:grade`, `/api/sentences/:grade`, `/api/readings/:grade`)
- Vite dev proxy: `/api` → `http://localhost:8080`
- `useData()` hook in `src/services/dataLoader.ts` handles fetch + cache
- `pickItems()` in `src/utils/shuffle.ts` avoids recently-seen items via localStorage

### Components & Utils

| Module | Role |
|---|---|
| `src/components/Flashcard.tsx` | EN↔ZH card flip |
| `src/components/Matching.tsx` | Match EN↔ZH pairs in grid |
| `src/components/Quiz.tsx` | EN → pick correct ZH (4 options) |
| `src/components/Spelling.tsx` | ZH → type EN spelling |
| `src/components/Reading.tsx` | EN passage + ZH translation, auto-TTS on entry |
| `src/utils/speech.ts` | Capacitor TTS first, falls back to `window.speechSynthesis` |
| `src/utils/sound.ts` | Web Audio API tones (`initAudio()` called from `Home`) |
| `src/utils/shuffle.ts` | Fisher-Yates + localStorage "recently seen" avoidance |
| `src/utils/messages.ts` | Random encouragement strings by score tier |
| `src/services/api.ts` | `fetch` / `CapacitorHttp` based on platform |

### Styling

- CSS variables in `src/index.css`, all component styles in `src/App.css`
- Mobile-first: `user-scalable=no` in `index.html`
- Framer Motion `AnimatePresence mode="wait"` with `key={location.pathname}`

## Gotchas

- **Framer Motion `AnimatePresence mode="wait"`:** parent `motion.div` with `initial="string"` using undefined variants stalls child animations. Always use `initial={{ opacity: 0 }}`.
- **StrictMode** on in `main.tsx` — effects fire twice in dev
- **Capacitor `addListener` returns a Promise** — cannot use `useEffect` directly. Use a stored handle ref and call `.remove()` on cleanup. `CapApp.removeAllListeners()` is safe if only one listener.
- **`no-undef` is `warn`** in ESLint — `OscillatorType` and other DOM types won't error
- **API requirement** — dev server expects a backend at `localhost:8080` proxying `/api/*`
