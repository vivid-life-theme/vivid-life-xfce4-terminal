# Vivid Life Theme — Xfce Terminal

A multi-flavor color theme for [Xfce Terminal](https://docs.xfce.org/apps/terminal/start). **4 flavors × 6 variants = 24 themes**, all WCAG AA verified, so your eyes never have to file a bug report. Generated from the [Vivid Life design-system foundation](https://github.com/vivid-life-theme/vivid-life-design-system): colors and contrast ratios come from a single source of truth. Inspired by [Dracula for Xfce Terminal](https://draculatheme.com/xfce4-terminal).

## Flavors

In time-of-day order. This port sets the terminal background itself, using the foundation's terminal background tier:

| Flavor       | Type  | Terminal background |
| ------------ | ----- | ------------------- |
| **Midnight** | dark  | `#0a0a0a`           |
| **Twilight** | dark  | `#333333`           |
| **Dawn**     | light | `#d4d4d4`           |
| **Noon**     | light | `#ffffff`           |

The shell and prompt ports ([fish](https://github.com/vivid-life-theme/vivid-life-fish), [Starship](https://github.com/vivid-life-theme/vivid-life-starship), [PowerShell](https://github.com/vivid-life-theme/vivid-life-powershell)) and the [Claude Code port](https://github.com/vivid-life-theme/vivid-life-claude-code) are all checked against these exact backgrounds, so pick the same flavor on both sides. Going all in? The [Xfce desktop port](https://github.com/vivid-life-theme/vivid-life-xfce) themes the rest of the screen.

## Variants

Each flavor comes in six accent variants: **Red · Orange · Yellow · Green · Blue · Purple**. The variant re-tints the accent (cursor color, selection tint); the ANSI palette and surface colors stay put across variants.

## Install

```bash
git clone https://github.com/vivid-life-theme/vivid-life-xfce4-terminal.git
cd vivid-life-xfce4-terminal
./install.sh
```

This copies all 24 schemes into `~/.local/share/xfce4/terminal/colorschemes/` (or `$XDG_DATA_HOME/xfce4/terminal/colorschemes/` if you've set that).

Why `git clone` and not a zip download? Because a later `git pull` + `./install.sh` picks up new themes. Zip files don't do updates; they just sit in `~/Downloads` feeling sorry for themselves.

### Manual install (no script)

```bash
mkdir -p ~/.local/share/xfce4/terminal/colorschemes
cp themes/*.theme ~/.local/share/xfce4/terminal/colorschemes/
```

Same result, more typing.

### Choose a theme

Xfce Terminal → **Edit → Preferences → Appearance → Color Scheme**, or per profile in `~/.config/xfce4/terminal/terminalrc` (`ColorPalette`/`ColorScheme`, see `man xfce4-terminal`). All 24 schemes appear as `vivid-life-<flavor>-<variant>`.

Default: **Midnight · Purple** (`vivid-life-midnight-purple`), matching the design system's overall default.

### Uninstall

```bash
rm ~/.local/share/xfce4/terminal/colorschemes/vivid-life-*.theme
```

## Scope

Xfce Terminal's color surface is foreground/background/cursor/selection plus the 16-color ANSI palette. No shell syntax highlighting; that's the shell's job (see [vivid-life-fish](https://github.com/vivid-life-theme/vivid-life-fish)). `ColorBackground` uses the foundation's `surface.bg_terminal` token specifically: it's the only surface tier verified to clear 4.5:1 contrast against every `ansi.*` color per flavor.

Unlike Windows Terminal, Xfce Terminal has a selection-foreground key, so selected text is redrawn in the foundation's AA-gated selection foreground instead of keeping its ANSI color.

## Recommended companion

**Font:** [Atkinson Hyperlegible Mono](https://www.brailleinstitute.org/freefont) for the terminal, or its [Nerd Font variant](https://www.nerdfonts.com/font-downloads) if your prompt (say, [Starship](https://github.com/vivid-life-theme/vivid-life-starship)) uses icon glyphs.

The rest of the family (terminals, editors, prompts, desktop) lives at [github.com/vivid-life-theme](https://github.com/vivid-life-theme).

## Contributing

```bash
npm install
npm run build   # regenerate themes/*.theme from the design-system tokens
npm test        # verify the mapping
npm run format  # prettier
```

Edit `src/theme-template.mjs` to change how foundation tokens map to xfce4-terminal's `Color*`/`ColorPalette` keys. Never hand-edit files under `themes/`: they're generated, and the next build will flatten your changes faster than you can type `git blame`.

If you need a color or token that isn't in the foundation, that's a foundation gap. Open an issue against [vivid-life-design-system](https://github.com/vivid-life-theme/vivid-life-design-system) rather than papering over it here.

## License

MIT. See [LICENSE](LICENSE).
