import os

root = 'c:/Users/saifa/Downloads/lintelny-v4'

FAVICON_INSERT = (
    '\n  <link rel="icon" type="image/png" sizes="32x32" href="/img/logo/lintel-ny-favicon.png">'
    '\n  <link rel="apple-touch-icon" sizes="180x180" href="/img/logo/lintel-ny-apple-touch-icon.png">'
)

# All variants of the SVG favicon line that might appear
SVG_PATTERNS = [
    'href="img/logo/lintel-ny-favicon.svg">',
    'href="../img/logo/lintel-ny-favicon.svg">',
    'href="/img/logo/lintel-ny-favicon.svg">',
]

changed = []
already = []
for dirpath, dirs, files in os.walk(root):
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.git')]
    for fn in files:
        if not fn.endswith('.html'):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, encoding='utf-8') as f:
            content = f.read()
        # Skip if already has the PNG favicon line
        if 'lintel-ny-favicon.png' in content:
            already.append(path.replace(root+'\\','').replace(root+'/',''))
            continue
        updated = content
        for pat in SVG_PATTERNS:
            if pat in updated:
                updated = updated.replace(pat, pat + FAVICON_INSERT, 1)
                break
        if updated != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(updated)
            changed.append(path.replace(root+'\\','').replace(root+'/',''))

print('Task 7 - favicon added to %d files:' % len(changed))
for p in sorted(changed): print(' ', p)
if already:
    print('Already had PNG favicon (%d):' % len(already))
    for p in sorted(already): print(' ', p)
