# Korean Vocabulary App

A client-side Korean vocabulary learning app built around location-based flashcards tied to real places in Seoul. Users study vocabulary words in the geographic context where they would naturally encounter them, virtually travelling the Seoul Metro system between locations, while at the same time getting familiar with the Seoul Metro station locations.

## Features

- **Location-based flashcards** — Thousands of vocabulary items possible, tied to real Seoul locations
- **Metro navigation** — Virtual travel along Seoul Metro Lines with Line 2 animations between study locations
- **Progress tracking** — Visual dashboard showing vocabulary mastery by location and line
- **Offline-capable** — All user data stored in browser IndexedDB; no account required
- **Partner-brandable** — Brand identity (colours, logo, name) fully configurable via `public/brand/config.json`
- **Dark and light themes** — CSS custom property-based theming

## Technology

- Vanilla JavaScript ES modules — no framework, no TypeScript
- HTML5 + CSS custom properties
- IndexedDB for all user data persistence
- Vite for bundling and local development
- No backend, no server, no authentication

## Getting Started

### Installation Prerequisites

- [Node.js 22 LTS](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (install via `npm install -g pnpm` or [Corepack](https://nodejs.org/api/corepack.html))

### Install and run

```bash
git clone <repository-url>
cd korean-vocab-app
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
pnpm build      # outputs to dist/
pnpm preview    # serves dist/ locally to test the production build
```

### Docker (optional local dev container, for security purposes)

```bash
docker compose up -d
docker compose exec app pnpm install
docker compose exec app pnpm dev
```

## Project Structure

```
/
├── index.html                  ← App landing page
├── settings.html               ← Settings page
├── user-guide.html             ← User documentation
├── terms-and-privacy.html      ← Legal page
├── styles.css                  ← Global CSS and theming
├── brand_loader.js             ← Brand identity engine
├── legal.js                    ← Terms/privacy HTML content
├── admin_message.js            ← Admin notification banner
├── vite.config.js              ← Multi-entry Vite build configuration
│
├── public/brand/               ← Partner-configurable brand folder
│   ├── config.json             ← Brand colours, name, and asset filenames
│   └── flashcards.json         ← Vocabulary dataset (many records)
│
├── FlashCards/                 ← Flashcard module
├── MetroAnimation/             ← Metro line animation module
├── MetroLineSelector/          ← Line selection module
├── ProgressDashboard/          ← Progress tracking and visualisation module
└── _DeveloperGuides/           ← Setup, deployment, and partner guides
```

## Customisation (Brand / Partner)

All brand configuration lives in `public/brand/`. Edit `config.json` to change the app name, colours, and asset filenames. The vocabulary dataset (`flashcards.json`) can be replaced entirely with custom content. See `_DeveloperGuides/PARTNER_GUIDE.md` for full integration instructions.

## Deployment

The app builds to a fully static site. After `pnpm build`, deploy the `dist/` folder to any static host (Cloudflare Pages, Netlify, GitHub Pages, or a plain web server).

No CDN, database, or server-side processing is required.

## Static Assets

Map tile images and audio files are not included in this repository due to file size constraints. Place them in the directories below using the naming conventions described.

### `FlashCards/assets/`

Location map images and optional media files consumed by the flashcard renderer.

| File pattern | Description |
|---|---|
| `map_{NearestMetroCode}_{StationName}.webp` | 964×964 px map centred on the nearest metro station, covering a 3 km × 3 km area. Used for the POI pin overlay. |
| `map_seoul_all_lines_small.webp` | 1000×666 px overview map of all Seoul Metro lines. Used on route-navigation cards. |
| `{AudioURL}.m4a` / `.mp3` / `.ogg` / `.aac` | Pronunciation audio. Filename must match the `AudioURL` field in the flashcard record. |
| `{VideoURL}.(mp4 etc.)` | Optional local video. Filename must match the `VideoURL` field where no HTTP URL is set. |

Station codes are 3-digit integers derived from the Seoul Metro numbering scheme (e.g. `201` = Line 2, City Hall). The full code-to-filename mapping lives in [`public/FlashCards/js/poi_maps.json`](public/FlashCards/js/poi_maps.json).

Examples: `map_201_City_Hall.webp`, `map_222_Gangnam.webp`, `map_240_Sinchon.webp`

### `MetroAnimation/assets/`

Station map images displayed during the Line 2 animation between study locations.

| File pattern | Description |
|---|---|
| `line2_{StationCode}_{StationName}.webp` | Map image for a Line 2 station, shown at departure and arrival. |
| `map.png` | Background metro line map used as the animation canvas. |

Examples: `line2_201_City_Hall.webp`, `line2_222_Gangnam.webp`, `line2_240_Sinchon.webp`


## Architecture

### IndexedDB schema

The database is named `flashcard_app_db` (version 1) and contains three object stores:

| Store | Key path | Contents |
|---|---|---|
| `flashcards` | `WordID` (integer) | Vocabulary records seeded from `public/brand/flashcards.json` on first run. Read-only after seeding. |
| `user_progress` | `WordID` (integer) | Per-card progress state (`WordCompleted`, `WordSeenQty`, `PersonalNote`, visit counts, game scores). Created on first user interaction; a missing record means the card is unseen. |
| `user_state` | `key` (string) | Key/value store for application state: active filters, route-mode position, word-game state, and theme preference. |

### Service layer API

All data access flows through a layered stack. UI code must not call IndexedDB directly.

```
UI / HTML
  └── services/
        ├── flashcard_service.js   — getFilteredFlashcards(filters), getRouteBatch(routeName, startWordID),
        │                            getRouteNames(), getWordGameCards(metro), getAllWordGameCards()
        ├── progress_service.js    — getProgress(wordId), updateProgress(wordId, fields)
        └── filter_service.js      — getFilters(), saveFilters(), getRouteMode(), saveRouteMode(),
                                     getWordGame(), saveWordGame()
  └── repositories/
        ├── flashcard_repository.js  — getAllFlashcards(), getFlashcardById(id)
        ├── progress_repository.js   — getProgress(id), upsertProgress(id, data), getAllProgress()
        └── state_repository.js      — getState(key), setState(key, value)
  └── db/
        ├── indexeddb_adapter.js     — openDB(), get(), getAll(), put(), bulkPut(), clear()
        └── db_init.js               — initDatabase(), seedFlashcardsIfEmpty(), reImportFlashcards()
```

### Startup flow

1. `bootstrap()` (`FlashCards/init/app_bootstrap.js`) is imported by every page entry point.
2. `initDatabase()` opens the IndexedDB connection (cached module-level after the first call).
3. `seedFlashcardsIfEmpty()` fetches `public/brand/flashcards.json` and bulk-inserts all records in a single transaction. Subsequent calls return immediately when data already exists.
4. The page fetches `poi_maps.json` (station-code → map filename), `station_codes.json` (station-code → lat/lng), and `pagestate.json` in parallel.
5. Mode is determined from persisted state: Word Game → Route Mode → Normal Filter mode. The appropriate card batch is loaded and rendered into the carousel.

## License

MIT
