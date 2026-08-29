#!/usr/bin/env bash
# Copies themes/*.theme into the Xfce4 Terminal colorschemes directory.
# Run from a clone of this repo: ./install.sh
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
target_dir="${XDG_DATA_HOME:-$HOME/.local/share}/xfce4/terminal/colorschemes"

if ! compgen -G "$script_dir/themes/*.theme" > /dev/null; then
  echo "error: no .theme files found in $script_dir/themes" >&2
  exit 1
fi

mkdir -p "$target_dir"
cp "$script_dir"/themes/*.theme "$target_dir/"

echo "Installed $(compgen -G "$script_dir/themes/*.theme" | wc -l) themes to $target_dir"
echo "Select one in Xfce Terminal: Edit -> Preferences -> Appearance -> Color Scheme"
