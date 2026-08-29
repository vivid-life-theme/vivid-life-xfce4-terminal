# Vivid Life Theme — Xfce Terminal

A multi-flavor color theme for [Xfce Terminal](https://docs.xfce.org/apps/terminal/start). **4 flavors × 6 variants = 24 themes**, all WCAG AA verified. Generated from the [Vivid Life design-system foundation](https://github.com/vivid-life-theme/vivid-life-design-system) — colors and contrast ratios come from a single source of truth. Inspired by [Dracula for Xfce Terminal](https://draculatheme.com/xfce4-terminal).

## Flavors

In time-of-day order:

| Flavor       | Type  | Canvas    |
| ------------ | ----- | --------- |
| **Midnight** | dark  | `#171717` |
| **Twilight** | dark  | `#404040` |
| **Dawn**     | light | `#d4d4d4` |
| **Noon**     | light | `#f5f5f5` |

## Variants

Each flavor is available in six accent variants: **Red · Orange · Yellow · Green · Blue · Purple**. The variant re-tints the accent (cursor color); the ANSI palette and surface colors stay stable across variants.

## Install

```bash
git clone https://github.com/vivid-life-theme/vivid-life-xfce4-terminal.git
cd vivid-life-xfce4-terminal
./install.sh
```

`git clone` (rather than a zip download) means a later `git pull` picks up new themes. Prefer manual copying? `mkdir -p ~/.local/share/xfce4/terminal/colorschemes && cp themes/*.theme ~/.local/share/xfce4/terminal/colorschemes/` does the same thing.

### Choose a theme

Xfce Terminal → **Edit → Preferences → Appearance → Color Scheme**, or per-profile in `~/.config/xfce4/terminal/terminalrc` (`ColorPalette`/`ColorScheme` — see `man xfce4-terminal`).

Default: **Midnight · Purple** (`vivid-life-midnight-purple`), matching the design system's overall default.

## Scope

Xfce Terminal's color surface is foreground/background/cursor/selection plus the 16-color ANSI palette — no shell syntax highlighting (that's the shell's job, e.g. [vivid-life-fish](https://github.com/vivid-life-theme/vivid-life-fish)). `ColorBackground` uses the foundation's `surface.bg_terminal` token specifically — the only surface tier verified to clear 4.5:1 contrast against every `ansi.*` color per flavor.

## Recommended companion

**Font** — [Atkinson Hyperlegible Mono](https://www.brailleinstitute.org/freefont) for the terminal, or its [Nerd Font variant](https://www.nerdfonts.com/font-downloads) if your prompt (e.g. [Starship](https://starship.rs)) uses icon glyphs.

## Contributing

```bash
npm install
npm run build   # regenerate themes/*.theme from the design-system tokens
npm test        # verify the mapping
npm run format  # prettier
```

Edit `src/theme-template.mjs` to change how foundation tokens map to xfce4-terminal's `Color*`/`ColorPalette` keys — never hand-edit files under `themes/`, they're generated.

If you need a color or token not in the foundation, that's a foundation gap — open an issue against [vivid-life-design-system](https://github.com/vivid-life-theme/vivid-life-design-system) rather than papering over it here.
