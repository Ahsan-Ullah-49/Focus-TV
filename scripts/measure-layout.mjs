import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, '..', 'scripts');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
// Wait a moment for JS to hydrate
await page.waitForTimeout(2000);

// Measure layout geometry at scrollY = 0
const geometry = await page.evaluate(() => {
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const hero = document.querySelector('main section') || document.querySelector('[class*="hero"]');
  const heroFrame = document.querySelector('[class*="frame"]');
  const sentinel = document.getElementById('top-sentinel');

  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const s = window.getComputedStyle(el);
    return {
      top: r.top,
      bottom: r.bottom,
      height: r.height,
      position: s.position,
      backgroundColor: s.backgroundColor,
      backgroundImage: s.backgroundImage,
      backdropFilter: s.backdropFilter,
      boxShadow: s.boxShadow,
      borderBottom: s.borderBottomColor,
      marginTop: s.marginTop,
      paddingTop: s.paddingTop,
      zIndex: s.zIndex,
      className: el.className,
    };
  };

  return {
    scrollY: window.scrollY,
    header: rect(header),
    main: rect(main),
    hero: rect(hero),
    heroFrame: rect(heroFrame),
    sentinel: rect(sentinel),
    headerDataTone: header?.getAttribute('data-header-tone'),
    headerClassList: header?.className,
    bodyPosition: window.getComputedStyle(document.body).position,
    mainChildren: main ? Array.from(main.children).map(c => ({
      tag: c.tagName,
      id: c.id,
      className: c.className,
      top: c.getBoundingClientRect().top,
      position: window.getComputedStyle(c).position,
    })) : [],
  };
});

console.log('=== LAYOUT GEOMETRY AT scrollY=0 ===');
console.log(JSON.stringify(geometry, null, 2));

// Screenshot at y=0
await page.screenshot({ path: join(outputDir, 'screenshot-desktop-top.png'), fullPage: false });

// Scroll down and take screenshot
await page.evaluate(() => window.scrollTo(0, 200));
await page.waitForTimeout(500);
await page.screenshot({ path: join(outputDir, 'screenshot-desktop-scrolled.png'), fullPage: false });

// Scroll back to top
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({ path: join(outputDir, 'screenshot-desktop-returntop.png'), fullPage: false });

// Mobile view
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: join(outputDir, 'screenshot-mobile.png'), fullPage: false });

const mobileGeometry = await page.evaluate(() => {
  const header = document.querySelector('header');
  const hero = document.querySelector('main section') || document.querySelector('[class*="hero"]');
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const s = window.getComputedStyle(el);
    return { top: r.top, height: r.height, marginTop: s.marginTop, position: s.position };
  };
  return { header: rect(header), hero: rect(hero), scrollY: window.scrollY };
});
console.log('=== MOBILE GEOMETRY ===');
console.log(JSON.stringify(mobileGeometry, null, 2));

await browser.close();
