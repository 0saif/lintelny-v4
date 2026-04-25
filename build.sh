#!/bin/bash
echo "Building content manifests..."
for dir in _data/blog _data/projects _data/reviews; do
  if [ -d "$dir" ]; then
    files=$(ls "$dir"/*.json 2>/dev/null | grep -v "_manifest.json" | while read f; do echo "\"$(basename "$f")\""; done | paste -sd,)
    echo "{\"files\":[${files}]}" > "$dir/_manifest.json"
    count=$(ls "$dir"/*.json 2>/dev/null | grep -v "_manifest.json" | wc -l)
    echo "  ✓ $dir — $count files"
  fi
done
echo "Build complete."
