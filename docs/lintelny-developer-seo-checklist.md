# Lintel NY — Developer SEO Checklist
**Prepared:** May 2026  
**Companion to:** `lintelny-technical-seo-audit.md`  
**Stack:** Static HTML, Netlify CDN

Each item is tagged with: **[priority]** and **[owner]**.

---

## Week 1 — Critical Fixes

- [ ] **[CRITICAL / DEV]** Debug the AI cost calculator. Open browser DevTools → Network tab. Identify the failing API call to `api.anthropic.com`. Fix the error. Add a graceful fallback UI when the API fails (static estimate table, not a raw error message).

- [ ] **[CRITICAL / DEV]** Add `<meta name="robots" content="noindex, follow">` to `gallery.html`. Remove `/gallery/` from `sitemap.xml`. Re-add both when real project content is published.

- [ ] **[CRITICAL / OWNER + DEV]** Confirm the real business address. Update the `LocalBusiness` schema on `index.html`, `about.html`, and all 8 location HTML files. Remove the TODO comment from `index.html` head. Update `postalCode` and `geo` coordinates to match the verified address.

- [ ] **[CRITICAL / DEV]** Install Google Analytics 4. Add via Google Tag Manager. Update `netlify.toml` CSP headers to allow GTM and GA4 domains:
  ```
  script-src: add https://www.googletagmanager.com
  connect-src: add https://www.google-analytics.com https://analytics.google.com
  img-src: add https://www.google-analytics.com
  ```

- [ ] **[CRITICAL / DEV]** Set up Google Search Console. Verify via DNS TXT record (preferred for Netlify). Submit `https://lintelny.com/sitemap.xml`.

- [ ] **[CRITICAL / DEV]** Track contact form submissions as GA4 conversion events. Track phone link clicks as GA4 events.

---

## Week 2 — High Priority SEO Fixes

- [ ] **[HIGH / DEV]** Add the missing Netlify redirect rules to `netlify.toml`:
  ```toml
  [[redirects]]
    from = "/trust/:name.html"
    to = "/trust/:name/"
    status = 301

  [[redirects]]
    from = "/blog/:slug.html"
    to = "/blog/:slug/"
    status = 301
  ```

- [ ] **[HIGH / DEV]** In Google Search Console → URL Inspection → Request Indexing for these 6 canonical service URLs:
  - `https://lintelny.com/services/bathroom-renovation-nyc/`
  - `https://lintelny.com/services/kitchen-remodeling-nyc/`
  - `https://lintelny.com/services/coop-condo-renovation-nyc/`
  - `https://lintelny.com/services/brownstone-renovation-brooklyn/`
  - `https://lintelny.com/services/electrical-services-nyc/`
  - `https://lintelny.com/services/roofing-contractor-nyc/`

- [ ] **[HIGH / DEV]** Update the homepage H1. Change from brand tagline to keyword-first. Example:
  ```html
  <h1>Licensed Home Improvement Contractor — NYC & Long Island</h1>
  <p class="tagline">Measured. Specified. Built.</p>
  ```
  Coordinate with design to maintain visual style.

- [ ] **[HIGH / DEV]** Update all 6 service page H1 tags to include location modifier:
  | File | New H1 |
  |---|---|
  | `services/bathroom-renovation-nyc.html` | Bathroom Renovation in NYC — Licensed & Permitted |
  | `services/kitchen-remodeling-nyc.html` | Kitchen Remodeling in NYC — Licensed HIC |
  | `services/coop-condo-renovation-nyc.html` | NYC Co-op & Condo Renovation — Board-Ready Contractor |
  | `services/brownstone-renovation-brooklyn.html` | Brownstone Renovation in Brooklyn — Licensed HIC |
  | `services/electrical-services-nyc.html` | Electrical Services NYC — Panel Upgrades & Rewiring |
  | `services/roofing-contractor-nyc.html` | Roofing Contractor NYC & Long Island — Licensed & Insured |

- [ ] **[HIGH / DEV]** Add `FAQPage` JSON-LD schema to all location pages that have FAQ sections (all 8 location `.html` files). Add `FAQPage` JSON-LD to all trust pages that contain Q&A content (`how-our-contract-works`, `change-order-policy`, `warranty-closeout`, `licensing-insurance`, `coop-alteration-checklist`).

- [ ] **[HIGH / DEV]** Fix `sitemap.xml`: Remove `/gallery/` entry (now noindexed). Update `lastmod` dates to reflect actual file modification dates, or remove `lastmod` from all entries.

- [ ] **[HIGH / DEV]** Add `<link rel="noindex">` or `<meta name="robots" content="noindex">` to any `/thank-you/` page that exists as a post-form-submission redirect.

---

## Week 3–4 — Medium Priority Fixes

- [ ] **[MEDIUM / DEV]** Build `/services/index.html` hub page. Content: list all 6 services with brief descriptions and links. Add to sitemap. Update nav "Services" dropdown trigger to link to `/services/` instead of `/services/bathroom-renovation-nyc/`.

- [ ] **[MEDIUM / DEV]** Build `/locations/index.html` hub page. Content: list all 8 locations with brief descriptions and links. Add to sitemap. Update nav "Locations" dropdown trigger to link to `/locations/`.

- [ ] **[MEDIUM / DEV]** Add visible breadcrumb navigation to the HTML body of all service, location, and trust pages. Schema breadcrumbs are in place — now add the visible HTML counterpart:
  ```html
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <a href="/">Home</a> › <a href="/services/">Services</a> › Bathroom Renovation
  </nav>
  ```

- [ ] **[MEDIUM / DEV]** Add a sticky bottom CTA bar for mobile viewports:
  ```html
  <div class="mobile-cta-bar">
    <a href="tel:+12123472111">Call (212) 347-2111</a>
    <a href="/contact/" class="btn">Get Estimate</a>
  </div>
  ```
  Show only on `max-width: 768px`. Ensure it does not cause CLS.

- [ ] **[MEDIUM / DEV]** Add `sameAs` array to `LocalBusiness` schema on `index.html` once GBP and directory profiles are created:
  ```json
  "sameAs": [
    "https://www.google.com/maps/place/[your-place-id]",
    "https://www.yelp.com/biz/lintel-ny",
    "https://www.houzz.com/pro/lintelny/"
  ]
  ```

- [ ] **[MEDIUM / DEV]** Run PageSpeed Insights on:
  - `https://lintelny.com/`
  - `https://lintelny.com/services/kitchen-remodeling-nyc/`
  - `https://lintelny.com/contact/`
  
  Document LCP, CLS, and INP scores. Fix any issues above the "Needs Improvement" threshold.

- [ ] **[MEDIUM / DEV]** Add explicit `width` and `height` attributes to all `<img>` tags. Add `loading="lazy"` to all below-fold images.

- [ ] **[MEDIUM / DEV]** Create a `sitemap-blog.xml` template. When the first blog article is published, add its URL and publication `<lastmod>` date. Reference from `sitemap.xml` as a sitemap index.

---

## Month 2 — Blog and Content Infrastructure

- [ ] **[HIGH / DEV]** Set up the blog post template (`blog/post.html`). Each published article needs:
  - Unique `<title>` tag
  - Unique `<meta name="description">` (140–160 chars)
  - `<link rel="canonical" href="https://lintelny.com/blog/[slug]/">` 
  - `Article` JSON-LD schema with `datePublished`, `dateModified`, `author`, `publisher`
  - `FAQPage` JSON-LD if the article contains FAQ section
  - `BreadcrumbList` JSON-LD
  - Internal links to ≥2 service pages and ≥1 location page

- [ ] **[HIGH / DEV]** As each blog article goes live, add its URL to `sitemap-blog.xml` with the actual `<lastmod>` publication date.

- [ ] **[HIGH / DEV]** Build `/projects/` directory and `project.html` template for case studies. Each project needs:
  - Unique title, description, canonical
  - `ImageObject` schema for photos
  - Internal links from the relevant service page and location page

- [ ] **[MEDIUM / DEV]** Create 5 unique OG images (1200×630px) for each service category. Update `<meta property="og:image">` on each service page.

---

## Month 3 — Schema Completion and Performance

- [ ] **[MEDIUM / DEV]** Once 10+ Google reviews are accumulated on GBP, add `AggregateRating` to the `LocalBusiness` schema on `index.html`:
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[actual rating]",
    "reviewCount": "[actual count]",
    "bestRating": "5",
    "worstRating": "1"
  }
  ```

- [ ] **[MEDIUM / DEV]** Remove `noindex` from `gallery.html` and re-add `/gallery/` to sitemap once 5+ project case studies are published.

- [ ] **[LOW / DEV]** Self-host Google Fonts by downloading JetBrains Mono and DM Sans font files, serving them from `/fonts/`, and replacing the Google Fonts `<link>` with local `@font-face` declarations. This eliminates the external DNS lookup.

- [ ] **[LOW / DEV]** Add `WebSite` schema to `index.html` for potential Sitelinks Search Box eligibility.

- [ ] **[LOW / DEV]** Add `prefers-color-scheme` media query support if a dark mode is planned. (Optional quality-of-life improvement.)

---

## Ongoing Monitoring

- [ ] **[WEEKLY / DEV or SEO]** Review Google Search Console Coverage report for new crawl errors.
- [ ] **[WEEKLY / DEV or SEO]** Confirm no new `.html` URLs are being indexed. All service/location pages should index only at their `/` canonical form.
- [ ] **[MONTHLY / DEV or SEO]** Rerun PageSpeed Insights after any JS/CSS changes.
- [ ] **[ON PUBLISH / DEV]** Add each new blog article to `sitemap-blog.xml` and request indexing via GSC URL Inspection.
- [ ] **[ON PUBLISH / DEV]** Validate all new structured data with the [Google Rich Results Test](https://search.google.com/test/rich-results) before going live.

---

## Reference: File Map

```
index.html               → LocalBusiness schema (fix address), WebSite schema (add)
about.html               → LocalBusiness schema (fix address)
blog.html                → Blog schema (add when posts exist)
gallery.html             → Add noindex now; remove noindex after projects added
contact.html             → LocalBusiness contact schema (add)
cost-calculator/         → Fix API error, add fallback UI

services/*.html (6 files)
  → Update H1 tags (all 6)
  → FAQPage schema already present — verify completeness
  → Add AggregateRating when reviews exist

locations/*.html (8 files)
  → Add FAQPage schema to all 8
  → Fix address in LocalBusiness schema on all 8

trust/*/index.html (6 dirs)
  → Add FAQPage schema to: how-our-contract-works, change-order-policy,
    warranty-closeout, licensing-insurance, coop-alteration-checklist

netlify.toml
  → Add /trust/:name.html → /trust/:name/ redirect
  → Add /blog/:slug.html → /blog/:slug/ redirect
  → Update CSP headers for GA4 + GTM

sitemap.xml
  → Remove /gallery/ entry
  → Update lastmod dates or remove them
  → Add sitemap index reference for sitemap-blog.xml

robots.txt
  → Add Disallow: /thank-you/ (if page exists)
```

---

*For full context on each item, see `lintelny-technical-seo-audit.md`.*
