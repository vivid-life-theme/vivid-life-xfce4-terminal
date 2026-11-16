# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2026-11-16

### Changed

- Design-system dependency bumped to 0.14.1; themes regenerated. The terminal background is now the flavor's editor background (`#171717` / `#404040` / `#d4d4d4` / `#f5f5f5`, was `#0a0a0a` / `#333333` / `#d4d4d4` / `#ffffff`), with the cursor foreground following it. Midnight and Twilight selections are now an accent tint, and Twilight / Noon `bright_black` change slightly to keep 4.5:1. Dawn is unchanged.
- Design-system dependency bumped to 0.14.2. It only changes Dawn's window-frame colours, which a terminal colour scheme doesn't use, so the themes are unchanged.

## [0.2.0] - 2026-10-01

### Changed

- Bumped `@vivid-life-theme/design-system` to 0.11.0, regenerating all 24 theme files
- Selection colors (`ColorSelectionBackground`, `ColorSelection`) now come from the foundation's `overlay.<variant>.selection.terminal` contract instead of a manual 30% accent blend, so selected text meets 4.5:1 contrast
- Midnight ANSI blue/magenta moved to the 500 rung (previously identical to their bright versions); dawn/noon red, yellow and green accents moved from shade 900 to 800

## [0.1.0] - 2026-09-01

### Added

- Initial Xfce Terminal port of Vivid Life Theme: 24 flavor×variant `.theme` color schemes (4 flavors × 6 variants), WCAG AA verified
- `install.sh` for one-command installation into `~/.local/share/xfce4/terminal/colorschemes`
- Release skill (`/release`) for tagging versions and publishing GitHub Releases

### Changed

- Bumped `@vivid-life-theme/design-system` to 0.7.0 (per-flavor ANSI shade rungs), regenerating the 12 twilight and dawn theme files
- Renamed repo/package to `vivid-life-xfce4-terminal` for consistency with sibling ports
