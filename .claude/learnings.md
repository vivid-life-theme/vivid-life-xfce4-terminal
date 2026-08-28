# Learnings

Corrections and observations collected during configuration sessions.
Entries are tagged by skill and dated.

---

[vivid-life-theme] For terminal-emulator ports, cross-check the mapping against vivid-life-vs-code's `terminal.*`/`terminalCursor.*` keys, not just the design-system README — first pass got ColorCursorForeground (should mirror terminalCursor.background = surface.bg_terminal, not accentOn) and ColorSelectionBackground (should be accent blended ~30% over bg, matching terminal.selectionBackground's alpha, not the flat non-variant-tinted state.selection token) wrong until compared side by side — 2026-08-28
