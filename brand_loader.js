// Loads /brand/config.json and applies brand identity (colors, name, logo, vehicles, favicon)
// to the current page. Lives at the project root so partner-editable files (config + image
// assets in /brand/) stay separate from internal loader code. Asset paths inside config.json
// are resolved by prepending import.meta.env.BASE_URL + 'brand/' so URLs are stable across
// dev and production Vite builds.
//
// Usage from any page:
//     <script type="module">
//       import { initBrand } from '<relative path>/brand_loader.js';
//       initBrand();
//     </script>
//
// All config.json fields are optional and are looked up defensively — pages keep
// working with the static fallbacks in styles.css and the static <title> text if
// config.json is missing or partial.

export const BRAND_BASE = import.meta.env.BASE_URL + 'brand/';
const CONFIG_URL = BRAND_BASE + 'config.json';

let cachedConfig = null;

export async function loadBrandConfig() {
    if (cachedConfig) return cachedConfig;
    const cfg = await fetch(CONFIG_URL).then(r => {
        if (!r.ok) throw new Error(`config.json HTTP ${r.status}`);
        return r.json();
    });
    cfg.assets = cfg.assets || {};
    if (cfg.assets.logo)    cfg.assets.logo    = BRAND_BASE + cfg.assets.logo;
    if (cfg.assets.favicon) cfg.assets.favicon = BRAND_BASE + cfg.assets.favicon;
    if (Array.isArray(cfg.assets.vehicles)) {
        cfg.assets.vehicles = cfg.assets.vehicles.map(p => BRAND_BASE + p);
    }
    cachedConfig = cfg;
    return cfg;
}

export function applyBrand(cfg) {
    if (!cfg) return;
    const root = document.documentElement.style;
    const c = cfg.colors || {};
    if (c.primary)   root.setProperty('--primary-blue',   c.primary);
    if (c.secondary) root.setProperty('--secondary-blue', c.secondary);
    if (c.accent)    root.setProperty('--accent-green',   c.accent);
    if (c.text)      root.setProperty('--text-color',     c.text);
    if (c.lightBg)   root.setProperty('--light-bg',       c.lightBg);
    if (c.divider)   root.setProperty('--divider-color',  c.divider);

    if (cfg.brandName) {
        document.querySelectorAll('[data-brand="name"]')
            .forEach(el => { el.textContent = cfg.brandName; });
        if (document.title.includes('{brand}')) {
            document.title = document.title.replace(/\{brand\}/g, cfg.brandName);
        }
    }

    if (cfg.brandNameFont) {
        document.querySelectorAll('[data-brand="name"]')
            .forEach(el => { el.style.fontFamily = cfg.brandNameFont; });
    }

    const a = cfg.assets || {};
    if (a.logo) {
        document.querySelectorAll('img[data-brand="logo"]')
            .forEach(img => { img.src = a.logo; });
    }
    if (Array.isArray(a.vehicles)) {
        a.vehicles.forEach((url, i) => {
            document.querySelectorAll(`img[data-brand="vehicle-${i + 1}"]`)
                .forEach(img => { img.src = url; });
        });
    }
    if (a.favicon) {
        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = a.favicon;
    }

    const op = cfg.operator || {};
    if (op.name) {
        document.querySelectorAll('[data-brand="operator-name"]')
            .forEach(el => { el.textContent = op.name; });
    }
    if (op.privacyEmail) {
        // Update text + href for simple mailto links
        document.querySelectorAll('[data-brand="operator-privacy-email"]')
            .forEach(el => {
                el.textContent = op.privacyEmail;
                el.href = 'mailto:' + op.privacyEmail;
            });
        // Update href only for complex link elements (e.g. settings rows with child nodes)
        document.querySelectorAll('[data-brand="operator-contact-href"]')
            .forEach(el => { el.href = 'mailto:' + op.privacyEmail; });
    }
}

export async function initBrand() {
    try {
        const cfg = await loadBrandConfig();
        applyBrand(cfg);
        return cfg;
    } catch (e) {
        console.warn('[brand] config load failed, using static fallbacks', e);
        return null;
    }
}
