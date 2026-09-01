# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-09-01

### Added

- Initial Xfce Terminal port of Vivid Life Theme: 24 flavor×variant `.theme` color schemes (4 flavors × 6 variants), WCAG AA verified
- `install.sh` for one-command installation into `~/.local/share/xfce4/terminal/colorschemes`
- Release skill (`/release`) for tagging versions and publishing GitHub Releases

### Changed

- Bumped `@vivid-life-theme/design-system` to 0.7.0 (per-flavor ANSI shade rungs), regenerating the 12 twilight and dawn theme files
- Renamed repo/package to `vivid-life-xfce4-terminal` for consistency with sibling ports
