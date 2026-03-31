---
name: Footer sticky pattern avoided
description: Don't use position sticky + z-index masking for footer reveal — use natural document flow instead
type: feedback
---

Avoid `position: sticky; bottom: 0` combined with z-index masking (main z-index: 1, footer z-index: 0) to create a "reveal footer on scroll" effect.

**Why:** This pattern breaks on iOS mobile because `overflow-x: hidden` on body (set in globals.css) breaks `position: sticky` in Safari. The footer becomes visible all the time or behaves unpredictably, and click events on footer links don't work reliably.

**How to apply:** Use natural document flow instead. Since all pages use full-height sections (`h-screen` / `minHeight: 100vh`), the footer naturally only appears after scrolling past all content — no sticky or z-index tricks needed. Just a plain `<footer>` wrapper with no positioning.
