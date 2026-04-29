import os

root = 'c:/Users/saifa/Downloads/lintelny-v4'

REPLACEMENTS = [
    # canonical + og:url href= (https://lintelny.com/page.html -> /page/)
    ('href="https://lintelny.com/contact.html"',       'href="https://lintelny.com/contact/"'),
    ('href="https://lintelny.com/about.html"',         'href="https://lintelny.com/about/"'),
    ('href="https://lintelny.com/blog.html"',          'href="https://lintelny.com/blog/"'),
    ('href="https://lintelny.com/gallery.html"',       'href="https://lintelny.com/gallery/"'),
    ('href="https://lintelny.com/blog/post.html"',     'href="https://lintelny.com/blog/post/"'),
    ('href="https://lintelny.com/services/bathroom-renovation-nyc.html"',     'href="https://lintelny.com/services/bathroom-renovation-nyc/"'),
    ('href="https://lintelny.com/services/kitchen-remodeling-nyc.html"',      'href="https://lintelny.com/services/kitchen-remodeling-nyc/"'),
    ('href="https://lintelny.com/services/coop-condo-renovation-nyc.html"',   'href="https://lintelny.com/services/coop-condo-renovation-nyc/"'),
    ('href="https://lintelny.com/services/brownstone-renovation-brooklyn.html"','href="https://lintelny.com/services/brownstone-renovation-brooklyn/"'),
    ('href="https://lintelny.com/services/electrical-services-nyc.html"',     'href="https://lintelny.com/services/electrical-services-nyc/"'),
    ('href="https://lintelny.com/services/roofing-contractor-nyc.html"',      'href="https://lintelny.com/services/roofing-contractor-nyc/"'),
    ('href="https://lintelny.com/locations/brooklyn-brownstone-renovation.html"',    'href="https://lintelny.com/locations/brooklyn-brownstone-renovation/"'),
    ('href="https://lintelny.com/locations/manhattan-coop-condo-renovation.html"',   'href="https://lintelny.com/locations/manhattan-coop-condo-renovation/"'),
    ('href="https://lintelny.com/locations/queens-home-renovation.html"',     'href="https://lintelny.com/locations/queens-home-renovation/"'),
    ('href="https://lintelny.com/locations/bronx-home-renovation.html"',      'href="https://lintelny.com/locations/bronx-home-renovation/"'),
    ('href="https://lintelny.com/locations/staten-island-renovation.html"',   'href="https://lintelny.com/locations/staten-island-renovation/"'),
    ('href="https://lintelny.com/locations/nassau-kitchen-remodeling.html"',  'href="https://lintelny.com/locations/nassau-kitchen-remodeling/"'),
    ('href="https://lintelny.com/locations/suffolk-bathroom-remodeling.html"','href="https://lintelny.com/locations/suffolk-bathroom-remodeling/"'),
    ('href="https://lintelny.com/locations/long-island-renovation.html"',     'href="https://lintelny.com/locations/long-island-renovation/"'),
    # og:url / og:image content= attributes
    ('content="https://lintelny.com/contact.html"',       'content="https://lintelny.com/contact/"'),
    ('content="https://lintelny.com/about.html"',         'content="https://lintelny.com/about/"'),
    ('content="https://lintelny.com/blog.html"',          'content="https://lintelny.com/blog/"'),
    ('content="https://lintelny.com/gallery.html"',       'content="https://lintelny.com/gallery/"'),
    ('content="https://lintelny.com/blog/post.html"',     'content="https://lintelny.com/blog/post/"'),
    ('content="https://lintelny.com/services/bathroom-renovation-nyc.html"',     'content="https://lintelny.com/services/bathroom-renovation-nyc/"'),
    ('content="https://lintelny.com/services/kitchen-remodeling-nyc.html"',      'content="https://lintelny.com/services/kitchen-remodeling-nyc/"'),
    ('content="https://lintelny.com/services/coop-condo-renovation-nyc.html"',   'content="https://lintelny.com/services/coop-condo-renovation-nyc/"'),
    ('content="https://lintelny.com/services/brownstone-renovation-brooklyn.html"','content="https://lintelny.com/services/brownstone-renovation-brooklyn/"'),
    ('content="https://lintelny.com/services/electrical-services-nyc.html"',     'content="https://lintelny.com/services/electrical-services-nyc/"'),
    ('content="https://lintelny.com/services/roofing-contractor-nyc.html"',      'content="https://lintelny.com/services/roofing-contractor-nyc/"'),
    ('content="https://lintelny.com/locations/brooklyn-brownstone-renovation.html"',    'content="https://lintelny.com/locations/brooklyn-brownstone-renovation/"'),
    ('content="https://lintelny.com/locations/manhattan-coop-condo-renovation.html"',   'content="https://lintelny.com/locations/manhattan-coop-condo-renovation/"'),
    ('content="https://lintelny.com/locations/queens-home-renovation.html"',     'content="https://lintelny.com/locations/queens-home-renovation/"'),
    ('content="https://lintelny.com/locations/bronx-home-renovation.html"',      'content="https://lintelny.com/locations/bronx-home-renovation/"'),
    ('content="https://lintelny.com/locations/staten-island-renovation.html"',   'content="https://lintelny.com/locations/staten-island-renovation/"'),
    ('content="https://lintelny.com/locations/nassau-kitchen-remodeling.html"',  'content="https://lintelny.com/locations/nassau-kitchen-remodeling/"'),
    ('content="https://lintelny.com/locations/suffolk-bathroom-remodeling.html"','content="https://lintelny.com/locations/suffolk-bathroom-remodeling/"'),
    ('content="https://lintelny.com/locations/long-island-renovation.html"',     'content="https://lintelny.com/locations/long-island-renovation/"'),
    # absolute /page.html hrefs
    ('href="/contact.html"',  'href="/contact/"'),
    ('href="/about.html"',    'href="/about/"'),
    ('href="/blog.html"',     'href="/blog/"'),
    ('href="/gallery.html"',  'href="/gallery/"'),
    # relative ../page.html hrefs (inner pages)
    ('href="../contact.html"',  'href="/contact/"'),
    ('href="../about.html"',    'href="/about/"'),
    ('href="../blog.html"',     'href="/blog/"'),
    ('href="../gallery.html"',  'href="/gallery/"'),
    ('href="../index.html"',    'href="/"'),
    ('href="../services/bathroom-renovation-nyc.html"',     'href="/services/bathroom-renovation-nyc/"'),
    ('href="../services/kitchen-remodeling-nyc.html"',      'href="/services/kitchen-remodeling-nyc/"'),
    ('href="../services/coop-condo-renovation-nyc.html"',   'href="/services/coop-condo-renovation-nyc/"'),
    ('href="../services/brownstone-renovation-brooklyn.html"','href="/services/brownstone-renovation-brooklyn/"'),
    ('href="../services/electrical-services-nyc.html"',     'href="/services/electrical-services-nyc/"'),
    ('href="../services/roofing-contractor-nyc.html"',      'href="/services/roofing-contractor-nyc/"'),
    ('href="../locations/brooklyn-brownstone-renovation.html"',    'href="/locations/brooklyn-brownstone-renovation/"'),
    ('href="../locations/manhattan-coop-condo-renovation.html"',   'href="/locations/manhattan-coop-condo-renovation/"'),
    ('href="../locations/queens-home-renovation.html"',     'href="/locations/queens-home-renovation/"'),
    ('href="../locations/bronx-home-renovation.html"',      'href="/locations/bronx-home-renovation/"'),
    ('href="../locations/staten-island-renovation.html"',   'href="/locations/staten-island-renovation/"'),
    ('href="../locations/nassau-kitchen-remodeling.html"',  'href="/locations/nassau-kitchen-remodeling/"'),
    ('href="../locations/suffolk-bathroom-remodeling.html"','href="/locations/suffolk-bathroom-remodeling/"'),
    ('href="../locations/long-island-renovation.html"',     'href="/locations/long-island-renovation/"'),
    # bare relative hrefs (root-level pages)
    ('href="contact.html"',  'href="/contact/"'),
    ('href="about.html"',    'href="/about/"'),
    ('href="blog.html"',     'href="/blog/"'),
    ('href="gallery.html"',  'href="/gallery/"'),
    ('href="index.html"',    'href="/"'),
    ('href="services/bathroom-renovation-nyc.html"',     'href="/services/bathroom-renovation-nyc/"'),
    ('href="services/kitchen-remodeling-nyc.html"',      'href="/services/kitchen-remodeling-nyc/"'),
    ('href="services/coop-condo-renovation-nyc.html"',   'href="/services/coop-condo-renovation-nyc/"'),
    ('href="services/brownstone-renovation-brooklyn.html"','href="/services/brownstone-renovation-brooklyn/"'),
    ('href="services/electrical-services-nyc.html"',     'href="/services/electrical-services-nyc/"'),
    ('href="services/roofing-contractor-nyc.html"',      'href="/services/roofing-contractor-nyc/"'),
    ('href="locations/brooklyn-brownstone-renovation.html"',    'href="/locations/brooklyn-brownstone-renovation/"'),
    ('href="locations/manhattan-coop-condo-renovation.html"',   'href="/locations/manhattan-coop-condo-renovation/"'),
    ('href="locations/queens-home-renovation.html"',     'href="/locations/queens-home-renovation/"'),
    ('href="locations/bronx-home-renovation.html"',      'href="/locations/bronx-home-renovation/"'),
    ('href="locations/staten-island-renovation.html"',   'href="/locations/staten-island-renovation/"'),
    ('href="locations/nassau-kitchen-remodeling.html"',  'href="/locations/nassau-kitchen-remodeling/"'),
    ('href="locations/suffolk-bathroom-remodeling.html"','href="/locations/suffolk-bathroom-remodeling/"'),
    ('href="locations/long-island-renovation.html"',     'href="/locations/long-island-renovation/"'),
]

changed = []
for dirpath, dirs, files in os.walk(root):
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.git')]
    for fn in files:
        if not fn.endswith('.html'):
            continue
        path = os.path.join(dirpath, fn)
        with open(path, encoding='utf-8') as f:
            content = f.read()
        updated = content
        for old, new in REPLACEMENTS:
            updated = updated.replace(old, new)
        if updated != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(updated)
            changed.append(path.replace(root+'\\','').replace(root+'/',''))

print('Task 1 - updated %d files:' % len(changed))
for p in sorted(changed):
    print(' ', p)
