// CONFIG: tune these values to change timing and feel
const CONFIG = {
  bgSpeed: 0.25,
  textSpeed: 0.8,
  maskSpeed: 0.9,
  heroHeight: 2000,
  blur: 2,
};

/*
  Scroll-driven layered hero animation.
  - Uses requestAnimationFrame for smoothness
  - All animation multipliers come from CONFIG
  - The hero section is sticky; we compute a progress 0..1 while it's active
*/

// Utility
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// Elements
const hero = document.getElementById("hero");
const stage = document.querySelector(".hero__stage");
const bg = document.querySelector(".layer--bg");
const solid = document.querySelector(".layer--solid");
const stroke = document.querySelector(".layer--stroke");
const t1 = document.querySelector(".layer--t1");
const t2 = document.querySelector(".layer--t2");

// Keep state for RAF
let latestScroll = 0;
let ticking = false;
let heroTop = 0;
let maxScroll = Math.max(1, CONFIG.heroHeight - window.innerHeight);

// Initialize CSS variables from CONFIG
function applyConfigToCSS() {
  document.documentElement.style.setProperty(
    "--hero-height",
    CONFIG.heroHeight + "px",
  );
  document.documentElement.style.setProperty(
    "--bg-blur",
    (CONFIG.blur || 0) + "px",
  );
}

function refreshLayout() {
  heroTop = hero.offsetTop;
  maxScroll = Math.max(1, CONFIG.heroHeight - window.innerHeight);
}

function onScroll() {
  latestScroll = window.scrollY || window.pageYOffset;
  if (!ticking) {
    window.requestAnimationFrame(update);
    ticking = true;
  }
}

function update() {
  ticking = false;

  // progress through the hero: 0 (start) -> 1 (end)
  const raw = (latestScroll - heroTop) / maxScroll;
  const progress = clamp(raw, 0, 1);

  const vh = window.innerHeight;

  // Compute per-layer translation in px using CONFIG multipliers
  const bgY = -progress * vh * CONFIG.bgSpeed; // background parallax
  const textY = -progress * vh * CONFIG.textSpeed; // text moves together

  // masks move slightly differently to create occlusion timing
  const mask1Y = -progress * vh * CONFIG.maskSpeed * 1.05; // covers solid first
  const mask2Y = -progress * vh * CONFIG.maskSpeed * 1.6; // covers stroke later

  // Apply transforms (use translate3d for GPU acceleration)
  if (bg) bg.style.transform = `translate3d(0, ${bgY}px, 0) scale(1.02)`;
  if (solid) solid.style.transform = `translate3d(0, ${textY}px, 0)`;
  if (stroke) stroke.style.transform = `translate3d(0, ${textY}px, 0)`;
  if (t1) t1.style.transform = `translate3d(0, ${mask1Y}px, 0)`;
  if (t2) t2.style.transform = `translate3d(0, ${mask2Y}px, 0)`;

  // Optional: subtle fade at the end to avoid abrupt cutoff
  const endFade = clamp((progress - 0.85) / 0.15, 0, 1);
  stage.style.opacity = String(1 - endFade);
}

// Handle resize
function onResize() {
  refreshLayout();
  // run an immediate update so transforms are correct after resize
  latestScroll = window.scrollY || window.pageYOffset;
  update();
}

// Init
function init() {
  applyConfigToCSS();
  refreshLayout();

  // Initial transform reset
  if (bg) bg.style.transform = "translate3d(0,0,0)";
  if (solid) solid.style.transform = "translate3d(0,0,0)";
  if (stroke) stroke.style.transform = "translate3d(0,0,0)";
  if (t1) t1.style.transform = "translate3d(0,0,0)";
  if (t2) t2.style.transform = "translate3d(0,0,0)";

  // Attach listeners
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // one initial call
  latestScroll = window.scrollY || window.pageYOffset;
  update();
}

// run
document.addEventListener("DOMContentLoaded", init);

// expose CONFIG for runtime tuning in console
window.HERO_CONFIG = CONFIG;
