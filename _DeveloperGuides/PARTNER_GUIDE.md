# Third-Party Partner Integration Guide

## Overview

This app is a Korean vocabulary learning platform built around location-based flashcards tied to real places in Seoul. Everything a partner needs to white-label the app — branding, vocabulary data, and image assets — lives in a single folder:

```
public/brand/
```

Partners do not touch application code. All customisation is done by replacing files in this folder before deployment.

---

## What Partners Can Customise

### 1. Brand Identity — `config.json`

**File:** `public/brand/config.json`

This file controls how the app presents itself visually. Every field is optional — if a field is removed, the app falls back to its built-in CSS defaults.

```json
{
  "brandName": "Korean Vocabulary",
  "brandNameFont": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, ..., sans-serif",
  "colors": {
    "primary":   "#0a2342",
    "secondary": "#4a7a9d",
    "accent":    "#2ca58d",
    "text":      "#343a40",
    "lightBg":   "#f8f9fa",
    "divider":   "#ced4da"
  },
  "assets": {
    "logo":     "logo.png",
    "favicon":  "favicon.png",
    "vehicles": ["vehicle1.png", "vehicle2.png", "vehicle3.png"]
  },
  "operator": {
    "name":         "Your Organisation Name",
    "privacyEmail": "privacy@yourorganisation.com"
  }
}
```

#### Fields

| Key | Effect | Example |
|---|---|---|
| `brandName` | Text displayed in the header and browser tab title | `"Seoul Explorer"` |
| `brandNameFont` | CSS `font-family` applied to the brand name text. The default value shown above is the system font stack — replace it with any valid CSS font-family string, or remove the key entirely to use the default. | `"Georgia, serif"` |
| `colors.primary` | Header background, primary buttons | `"#1a1a2e"` |
| `colors.secondary` | Secondary UI elements | `"#16213e"` |
| `colors.accent` | Highlights, active states, links | `"#0f3460"` |
| `colors.text` | Body text | `"#333333"` |
| `colors.lightBg` | Page background | `"#f5f5f5"` |
| `colors.divider` | Borders, horizontal rules | `"#dddddd"` |
| `assets.logo` | Filename of the logo image (must exist in `public/brand/`) | `"my-logo.png"` |
| `assets.favicon` | Browser tab icon filename | `"my-favicon.png"` |
| `assets.vehicles` | Array of three animation asset filenames used in the metro visualisation | `["bus.png", "bus.png", "bus.png"]` |
| `operator.name` | Your organisation's display name. Appears in the Privacy Policy, Terms of Use, Disclaimer, and legal footer as the responsible data controller. **Required if you are self-hosting.** | `"Acme Korean School"` |
| `operator.privacyEmail` | Email address users should contact for privacy or data requests. Appears as a clickable mailto link in the Privacy Policy, Settings Contact row, and User Guide. **Required if you are self-hosting.** | `"privacy@acmekorean.com"` |

#### Using a Web Font

If your brand uses a hosted web font (e.g. Google Fonts), load it in the page `<head>` and then reference it in `brandNameFont`:

```json
"brandNameFont": "Noto Sans KR, sans-serif"
```

---

### 2. Image Assets

Place all image files directly in `public/brand/` and reference them by filename in `config.json`.

| Asset | Recommended Size | Format | Purpose |
|---|---|---|---|
| `logo.png` | 520 × 284 px | PNG (RGBA) | Header logo on all pages |
| `favicon.png` | 64 × 64 px | PNG (RGBA) | Browser tab icon |
| `vehicle1.png` | 480 × 386 px | PNG (RGBA) | Metro animation frame 1 |
| `vehicle2.png` | 480 × 386 px | PNG (RGBA) | Metro animation frame 2 |
| `vehicle3.png` | 480 × 386 px | PNG (RGBA) | Metro animation frame 3 |

Use PNG with transparency (RGBA) so images render cleanly over any background colour. Sticking to the recommended dimensions avoids layout shifts.

---

### 3. Admin Notifications — `admin_message.json`

**File:** `public/brand/admin_message.json`

Optional. Allows partners to display a banner message to all users (e.g. maintenance notices, new content announcements). If the file is absent or empty the banner does not appear.

---

## The Vocabulary Dataset — `flashcards.json`

**File:** `public/brand/flashcards.json`

### Why This File Exists

The flashcard dataset is the core content of the app. Every card a user studies comes from this file. It is kept inside the partner-editable `brand/` folder so each deployment can carry its own curated vocabulary — a partner focused on business Korean, tourist vocabulary, or a specific neighbourhood of Seoul can ship exactly the words relevant to their audience without any code changes.

On first launch the app reads this file once and loads all records into the device's local storage (IndexedDB). Subsequent sessions read directly from local storage, so the app works fully offline after the first load.

### File Format

A JSON array of flashcard objects. Each object represents one vocabulary word.

```json
[
  {
    "WordID": 1,
    "KoreanWord": "안녕",
    "WordDescription": "Peace / Hello (informal)",
    "PartOfSpeech": "Noun",
    "WordCategory": "Introduction",
    "WordListName": "Welcome",
    "InContextSentence": "안녕하세요",
    "SentenceDescription": "Hello",
    "SentenceHonorifics": "Polite",
    "RouteName": "Level-1",
    "RouteNameSeq": 1,
    "Neighborhood": "Jongno",
    "PlaceOfInterestNameEng": "Gwangjang Market",
    "PlaceOfInterestNameKor": "광장시장",
    "Latitude": 37.5701,
    "Longitude": 126.9995,
    "POICategory": "shopping",
    "NearestMetro": "Jongno 3-ga",
    "NearestMetroCode": 534,
    "DistanceToMetro": 0.5,
    "AudioURL": "Hello_Korean.m4a",
    "VideoURL": "https://youtu.be/Pjt-q0dqknM"
  }
]
```

### Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `WordID` | integer | **Yes** | Unique primary key. Must be unique across all records. |
| `KoreanWord` | string | **Yes** | The Korean vocabulary word displayed on the card. |
| `WordDescription` | string | **Yes** | English meaning of the word. |
| `PartOfSpeech` | string | Yes | Grammar category (e.g. `"Noun"`, `"Verb"`, `"Adjective"`). |
| `WordCategory` | string | Yes | Thematic group (e.g. `"FoodAndBeverage"`, `"Introduction"`). Used as a filter. |
| `WordListName` | string | Yes | List the word belongs to (e.g. `"Welcome"`, `"First125"`, `"TOP1K"`). Used as a filter. |
| `InContextSentence` | string | Yes | A Korean sentence showing the word in use. |
| `SentenceDescription` | string | Yes | English translation of `InContextSentence`. |
| `SentenceHonorifics` | string | Yes | Politeness register: `"Polite"`, `"Formal"`, or `"Neutral"`. |
| `RouteName` | string | No | Learning route name (e.g. `"Level-1"`, `"Life In Korea"`). Used as a filter. |
| `RouteNameSeq` | integer | No | Order of this card within its route. |
| `Neighborhood` | string | Yes | Seoul neighbourhood name. Displayed on the card and used as a filter. |
| `PlaceOfInterestNameEng` | string | Yes | English name of the associated Seoul landmark or venue. |
| `PlaceOfInterestNameKor` | string | Yes | Korean name of the same location. |
| `Latitude` / `Longitude` | number | Yes | GPS coordinates of the place. Used for the map feature. |
| `POICategory` | string | Yes | Venue type (e.g. `"shopping"`, `"restaurant/bakery"`, `"school"`). Used as a filter. |
| `NearestMetro` | string | Yes | Name of the nearest Seoul metro station. |
| `NearestMetroCode` | number or string | Yes | Station code used to load the correct metro map tile. |
| `DistanceToMetro` | number | Yes | Walking distance in kilometres from the POI to the metro station. |
| `AudioURL` | string | No | Filename of an audio clip (must be placed in `FlashCards/assets/`). |
| `VideoURL` | string | No | Full YouTube URL for a supplementary video. |
| `SponsorName` | string | No | Name of a sponsor business associated with this location. |
| `SponsorURL` | string | No | Sponsor website or social profile URL. |
| `SponsorAsset` | string | No | Path to a sponsor image (relative to the project root). |
| `WordGameName` | string | No | Name of a word game this card participates in. |
| `WordGameInstruction` | string | No | Instruction text for the word game. |

### Rules for Editing `flashcards.json`

- `WordID` must be a unique integer for every record. Do not duplicate IDs.
- The file must be valid JSON. Validate it with a tool such as [jsonlint.com](https://jsonlint.com) before deploying.
- To refresh content after a deployment, the user's local IndexedDB must be cleared (or the app provides a re-import mechanism via `reImportFlashcards()`).
- The default dataset contains 1,013 cards. There is no hard limit on record count, but very large datasets will increase the initial load time.

- Or visit https://k-flashcardmanager.flashcardfluencyroutes.com/ to use a ready built online tool for building flashcard json files.
---

## Deployment Model

Each deployment serves one brand. Place your brand assets in `public/brand/`, build the app, and deploy the resulting `dist/` folder. There is no shared infrastructure between deployments — each is fully independent.

### How to deploy

1. Edit `public/brand/` with your assets, `config.json`, and `flashcards.json`.
2. Run `pnpm install && pnpm build`.
3. Deploy `dist/` to your hosting environment (see `cloudflare_deploy_guide.md`).
4. To update brand assets or vocabulary: edit the files, rebuild, and redeploy.

---

## Legal & Privacy Obligations for Self-Hosted Deployments

When you host your own build of this app, **you become the data controller** under applicable privacy law (GDPR, POPIA, CCPA, and equivalent regulations in other jurisdictions). This section summarises ....

### What this means

| Party | Role | Obligations |
|---|---|---|
| Flashcard Fluency Routes (original developer) | Software licensor | Maintains app code; no access to your users' data |
| You (the hosting partner) | Data controller | Responsible for all legal obligations to your users |

### What you should do

**Set your operator fields in `config.json`**

Add your organisation name and a privacy contact email to `config.json`. These values are injected automatically throughout the app's legal pages, privacy policy, and settings screen. Users who need to exercise their data rights will use this email.

```json
"operator": {
  "name":         "Your Organisation Name",
  "privacyEmail": "privacy@yourorganisation.com"
}
```
---

## Quick Reference

| File | Purpose | Partner editable |
|---|---|---|
| `public/brand/config.json` | Brand name, font, colours, asset filenames, operator name & privacy email | Yes |
| `public/brand/flashcards.json` | Vocabulary dataset (multiple cards) | Yes |
| `public/brand/admin_message.json` | Optional notification banner | Yes |
| `public/brand/logo.png` | Header logo (520×284 px) | Yes — replace file |
| `public/brand/favicon.png` | Browser tab icon (64×64 px) | Yes — replace file |
| `public/brand/vehicle1-3.png` | Metro animation assets (480×386 px) | Yes — replace files |
| `brand_loader.js` | Loads and applies brand config at runtime | No |
| `styles.css` | Global application styles | No |
