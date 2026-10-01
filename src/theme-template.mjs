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

export function buildTheme(flavor, variant, tokens) {
  const f = tokens.flavors[flavor];
  const { surface, text, semantic, ansi } = f;
  const accent = resolveAccent(tokens, flavor, variant);
  const name = `Vivid Life · ${label[flavor]} · ${variantLabel[variant]}`;

  // Text under a block cursor takes the terminal's own background color —
  // same convention as the VS Code port's terminalCursor.background.
  const cursorForeground = surface.bg_terminal;
  // The foundation's terminal selection contract: an opaque flat color
  // (.theme keys don't reliably support alpha hex) plus the foreground
  // terminals redraw selected text in, gated at 4.5:1.
  const selection = f.overlay[variant].selection.terminal;

  const lines = [
    "[Scheme]",
    `Name=${name}`,
    `ColorForeground=${text.fg}`,
    `ColorBackground=${surface.bg_terminal}`,
    `ColorCursor=${accent}`,
    `ColorCursorForeground=${cursorForeground}`,
    "ColorCursorUseDefault=FALSE",
    `ColorSelection=${selection.foreground}`,
    `ColorSelectionBackground=${selection.flat}`,
    "ColorSelectionUseDefault=FALSE",
    "ColorBoldUseDefault=TRUE",
    `TabActivityColor=${semantic.warning}`,
    `ColorPalette=${ANSI_ORDER.map((key) => ansi[key]).join(";")}`,
  ];

  return lines.join("\n") + "\n";
}
