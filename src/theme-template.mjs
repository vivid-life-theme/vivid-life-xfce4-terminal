// Maps Vivid Life foundation tokens to an xfce4-terminal `.theme` file.
// One pure function: (flavor, variant, tokens) -> file content string.
//
// Key names verified against xfce4-terminal's own config parser
// (terminal-preferences.c): ColorForeground, ColorBackground, ColorCursor,
// ColorCursorForeground, ColorCursorUseDefault, ColorSelection,
// ColorSelectionBackground, ColorSelectionUseDefault, ColorBoldUseDefault,
// ColorPalette, TabActivityColor. Files live in
// ~/.local/share/xfce4/terminal/colorschemes/.

const label = {
  midnight: "Midnight",
  twilight: "Twilight",
  dawn: "Dawn",
  noon: "Noon",
};
const variantLabel = {
  red: "Red",
  orange: "Orange",
  yellow: "Yellow",
  green: "Green",
  blue: "Blue",
  purple: "Purple",
};

// ANSI palette order xfce4-terminal expects in ColorPalette.
const ANSI_ORDER = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "bright_black",
  "bright_red",
  "bright_green",
  "bright_yellow",
  "bright_blue",
  "bright_magenta",
  "bright_cyan",
  "bright_white",
];

function resolveAccent(tokens, flavor, variant) {
  const shade = tokens.accent_shade[flavor][variant];
  return tokens.palette[variant][shade];
}

// xfce4-terminal's .theme keys don't reliably support alpha hex, so unlike
// the VS Code port's `withAlpha(accent, ALPHA.a30)` (composited live by the
// editor), we pre-flatten the same 30%-accent-over-background blend into an
// opaque color here.
function mix(hexA, hexB, ratio) {
  const a = hexA
    .slice(1)
    .match(/../g)
    .map((h) => parseInt(h, 16));
  const b = hexB
    .slice(1)
    .match(/../g)
    .map((h) => parseInt(h, 16));
  const mixed = a.map((channel, i) =>
    Math.round(channel * ratio + b[i] * (1 - ratio)),
  );
  return `#${mixed.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export function buildTheme(flavor, variant, tokens) {
  const f = tokens.flavors[flavor];
  const { surface, text, semantic, ansi } = f;
  const accent = resolveAccent(tokens, flavor, variant);
  const name = `Vivid Life · ${label[flavor]} · ${variantLabel[variant]}`;

  // Text under a block cursor takes the terminal's own background color —
  // same convention as the VS Code port's terminalCursor.background.
  const cursorForeground = surface.bg_terminal;
  // Accent-tinted selection, matching the VS Code port's
  // terminal.selectionBackground (withAlpha(accent, 30%)) flattened to an
  // opaque color, since .theme keys don't reliably support alpha hex.
  const selectionBackground = mix(accent, surface.bg_terminal, 0.3);

  const lines = [
    "[Scheme]",
    `Name=${name}`,
    `ColorForeground=${text.fg}`,
    `ColorBackground=${surface.bg_terminal}`,
    `ColorCursor=${accent}`,
    `ColorCursorForeground=${cursorForeground}`,
    "ColorCursorUseDefault=FALSE",
    `ColorSelection=${text.fg}`,
    `ColorSelectionBackground=${selectionBackground}`,
    "ColorSelectionUseDefault=FALSE",
    "ColorBoldUseDefault=TRUE",
    `TabActivityColor=${semantic.warning}`,
    `ColorPalette=${ANSI_ORDER.map((key) => ansi[key]).join(";")}`,
  ];

  return lines.join("\n") + "\n";
}
