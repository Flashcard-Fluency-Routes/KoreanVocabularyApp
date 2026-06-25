# Korean Vocabulary App

A client-side Korean vocabulary learning app built around location-based flashcards tied to real places in Seoul. Users study vocabulary words in the geographic context where they would naturally encounter them, virtually travelling the Seoul Metro system between locations.

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

### Prerequisites

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
├── FlashCards/                 ← Flashcard module (see FlashCards/CLAUDE.md)
├── MetroAnimation/             ← Metro line animation module
├── MetroLineSelector/          ← Line selection module
├── ProgressDashboard/          ← Progress tracking and visualisation module
└── _DeveloperGuides/           ← Setup, deployment, and partner guides
```

## Customisation (Brand / Partner)

All brand configuration lives in `public/brand/`. Edit `config.json` to change the app name, colours, and asset filenames. The vocabulary dataset (`flashcards.json`) can be replaced entirely with custom content. See `_DeveloperGuides/PARTNER_GUIDE.md` for full integration instructions.

## Deployment

The app builds to a fully static site. After `pnpm build`, deploy the `dist/` folder to any static host (Cloudflare Pages, Netlify, GitHub Pages, or a plain web server).

See `_DeveloperGuides/cloudflare_deploy_guide.md` for a step-by-step Cloudflare Pages guide.

No CDN, database, or server-side processing is required.

## Static Assets

Map tile images and audio files are not included in this repository due to file size constraints. These files belong in:

- `FlashCards/assets/` — location map images (`.webp`)
- `MetroAnimation/assets/` — station map images (`.webp`)

See `FlashCards/CLAUDE.md` and `MetroAnimation/README.md` for details on the expected assets.

## Architecture

See `CLAUDE.md` for the root-level architecture overview and `FlashCards/CLAUDE.md` for the detailed flashcard module architecture, including the IndexedDB schema, service layer API, and startup flow.

## License

MIT
