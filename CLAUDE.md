# Vivid Life Theme — Xfce Terminal

Xfce Terminal port of the Vivid Life Theme design system (4 flavors × 6 variants = 24 themes, WCAG AA verified). Inspired by [draculatheme.com/xfce4-terminal](https://draculatheme.com/xfce4-terminal); companion project to the other [vivid-life-theme ports](https://github.com/orgs/vivid-life-theme/repositories) (fish, VS Code, starship, PowerShell).

## Key Config Files

| File                                       | Purpose                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| `build.mjs`                                | Generates `themes/*.theme` from `@vivid-life-theme/design-system`           |
| `.claudeignore`                            | Excludes `node_modules/` from Claude Code's project indexing                |
| `.claude/learnings.md`                     | Auto-collected corrections/observations from config skill runs              |
| `CLAUDE.md`                                | Project instructions, loaded every message                                  |
| `.claude/settings.json`                    | Permissions, hooks, environment variables                                   |
| `.claude/skills/release/SKILL.md`          | TODO: add description                                                       |
| `.claude/skills/vivid-life-theme/SKILL.md` | Fetches the design-system tokens/foundation for building themed artifacts   |
| `.githooks/pre-commit`                     | Runs `scripts/sync-config-table.sh` before each commit                      |
| `.github/workflows/claude-code-review.yml` | Auto-review on PR open/update                                               |
| `.github/workflows/claude.yml`             | `@claude` mention trigger in issues/PRs                                     |
| `.gitignore`                               | Git ignore patterns                                                         |
| `package.json`                             | npm scripts (`build`, `test`, `format`) and the design-system devDependency |
| `scripts/sync-config-table.sh`             | Keeps this Key Config Files table in sync with the filesystem               |

<!-- cc-config: last-optimize-run: 2026-08-28 HEAD -->

## Commands

- `npm run build` — regenerate `themes/*.theme` from `@vivid-life-theme/design-system`
- `npm test` — run `src/theme-template.test.mjs` (node:test)
- `npm run format` / `npm run format:check` — prettier

## Structure

- `themes/*.theme` — generated output, one file per flavor×variant (`vivid-life-<flavor>-<variant>.theme`). xfce4-terminal color schemes are INI-style files (`[Scheme]` section — see `terminal-preferences.c` in the xfce4-terminal source, or `~/.local/share/xfce4/terminal/colorschemes/`). **Never hand-edit** — edit `src/theme-template.mjs` and rebuild.
- `src/theme-template.mjs` — pure `buildTheme(flavor, variant, tokens)` mapping foundation tokens to xfce4-terminal's `ColorForeground`/`ColorBackground`/`ColorCursor`/`ColorCursorForeground`/`ColorSelection`/`ColorSelectionBackground`/`ColorPalette` (16-color ANSI) keys.
- `build.mjs` — iterates all 24 combinations and writes `themes/`.

## References

Use the `vivid-life-theme` skill to fetch the design-system tokens (`tokens.json`) and system overview before writing any theme-generation code — do not hardcode colors from memory.

## Conventions

- 24 themes = 4 flavors × 6 variants. Keep flavor/variant naming consistent with the upstream design-system and sibling ports (fish, VS Code).
- xfce4-terminal's color surface is the 16-color ANSI palette (`flavors[flavor].ansi`) plus foreground/background/cursor/selection/tab colors — no shell syntax highlighting (that's a different port's scope, e.g. `vivid-life-fish`). `ColorBackground` must use `surface.bg_terminal`, not `bg`/`bg_sunk`/`bg_soft` — see the design-system README's `bg_terminal` caveat.
- Terminal-specific mappings (cursor/selection) follow `vivid-life-vs-code`'s `terminal.*`/`terminalCursor.*` keys as the reference, since both are "terminal surface" ports of the same foundation: `ColorCursorForeground` = `surface.bg_terminal` (text under a block cursor takes the bg color, mirrors `terminalCursor.background`), `ColorSelectionBackground` = accent blended 30% over `surface.bg_terminal` (mirrors `terminal.selectionBackground`'s `withAlpha(accent, a30)`, flattened to opaque since `.theme` keys don't reliably support alpha hex). Don't use the flat, variant-independent `state.selection` token for terminal selection — it doesn't shift per accent variant, unlike VS Code's.

## Don't

- Don't commit secrets or credentials to git
- Don't use --force flags — fix the underlying issue instead
- Don't hardcode color values without pulling them from the design-system tokens via the `vivid-life-theme` skill

## Learnings

When the user corrects a mistake or points out a recurring issue, append a one-line summary to .claude/learnings.md. Don't modify CLAUDE.md directly.

## Compact Instructions

When compacting, preserve: list of modified files, current test status, open TODOs, and key decisions made.
