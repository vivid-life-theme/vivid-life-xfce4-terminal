import { test } from "node:test";
import assert from "node:assert/strict";
import tokens from "@vivid-life-theme/design-system";
import { buildTheme } from "./theme-template.mjs";

const FLAVORS = ["midnight", "twilight", "dawn", "noon"];
const VARIANTS = ["red", "orange", "yellow", "green", "blue", "purple"];

// Parses `Key=Value` lines from a .theme file, skipping [Scheme] and blanks.
function parseVars(content) {
  const vars = {};
  for (const line of content.split("\n")) {
    if (!line || line.startsWith("[")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    vars[line.slice(0, idx)] = line.slice(idx + 1);
  }
  return vars;
}

test("buildTheme produces output for all 24 flavor×variant combinations", () => {
  for (const flavor of FLAVORS) {
    for (const variant of VARIANTS) {
      const content = buildTheme(flavor, variant, tokens);
      assert.match(content, /^\[Scheme\]\nName=Vivid Life/);
      const vars = parseVars(content);
      assert.ok(
        vars.ColorForeground,
        `${flavor}+${variant}: missing ColorForeground`,
      );
      assert.ok(
        vars.ColorBackground,
        `${flavor}+${variant}: missing ColorBackground`,
      );
      assert.equal(
        vars.ColorPalette.split(";").length,
        16,
        `${flavor}+${variant}: ColorPalette must have 16 entries`,
      );
    }
  }
});

test("ColorBackground uses surface.bg_terminal (not bg/bg_sunk/bg_soft)", () => {
  for (const flavor of FLAVORS) {
    const content = buildTheme(flavor, "purple", tokens);
    const vars = parseVars(content);
    assert.equal(
      vars.ColorBackground,
      tokens.flavors[flavor].surface.bg_terminal,
    );
  }
});

test("ColorCursor uses the accent resolved from accent_shade", () => {
  const content = buildTheme("midnight", "purple", tokens);
  const vars = parseVars(content);
  const shade = tokens.accent_shade.midnight.purple;
  const expected = tokens.palette.purple[shade];
  assert.equal(vars.ColorCursor, expected);
});

test("ColorCursorForeground matches the VS Code port's terminalCursor.background (surface.bg_terminal)", () => {
  for (const flavor of FLAVORS) {
    const content = buildTheme(flavor, "blue", tokens);
    const vars = parseVars(content);
    assert.equal(
      vars.ColorCursorForeground,
      tokens.flavors[flavor].surface.bg_terminal,
    );
  }
});

test("ColorSelectionBackground is accent-tinted, matching the VS Code port's terminal.selectionBackground", () => {
  const content = buildTheme("twilight", "green", tokens);
  const vars = parseVars(content);
  // Not the flat, variant-independent state.selection token.
  assert.notEqual(
    vars.ColorSelectionBackground,
    tokens.flavors.twilight.state.selection,
  );
  // Different variants of the same flavor must produce different selection colors.
  const other = parseVars(buildTheme("twilight", "red", tokens));
  assert.notEqual(
    vars.ColorSelectionBackground,
    other.ColorSelectionBackground,
  );
});

test("ColorPalette follows black,red,green,yellow,blue,magenta,cyan,white + bright_* order", () => {
  const content = buildTheme("dawn", "red", tokens);
  const vars = parseVars(content);
  const ansi = tokens.flavors.dawn.ansi;
  const expected = [
    ansi.black,
    ansi.red,
    ansi.green,
    ansi.yellow,
    ansi.blue,
    ansi.magenta,
    ansi.cyan,
    ansi.white,
    ansi.bright_black,
    ansi.bright_red,
    ansi.bright_green,
    ansi.bright_yellow,
    ansi.bright_blue,
    ansi.bright_magenta,
    ansi.bright_cyan,
    ansi.bright_white,
  ].join(";");
  assert.equal(vars.ColorPalette, expected);
});
