# Lintel NY — Technical SEO & Website Audit
**Prepared:** May 2026  
**Auditor Role:** Senior Technical SEO / Web Performance / Local SEO / Conversion Consultant  
**Website:** https://lintelny.com/  
**Business:** Lintel NY — Licensed Home Improvement Contractor, NYC & Long Island  
**Audit Basis:** Live website crawl, HTML source inspection, public Google search visibility snapshot. GSC data, GA data, server logs, and hosting metrics are not available to this auditor and are noted where they are needed.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Strengths](#2-current-strengths)
3. [Critical Issues](#3-critical-issues)
4. [High Priority Issues](#4-high-priority-issues)
5. [Medium Priority Issues](#5-medium-priority-issues)
6. [Google Discoverability Analysis](#6-google-discoverability-analysis)
7. [Local SEO / Google Business Profile Strategy](#7-local-seo--google-business-profile-strategy)
8. [On-Page SEO Recommendations](#8-on-page-seo-recommendations)
9. [Technical SEO Recommendations](#9-technical-seo-recommendations)
10. [Structured Data Recommendations](#10-structured-data-recommendations)
11. [Content Strategy](#11-content-strategy)
12. [Keyword Strategy](#12-keyword-strategy)
13. [Conversion & Lead Generation Recommendations](#13-conversion--lead-generation-recommendations)
14. [Performance & Core Web Vitals Recommendations](#14-performance--core-web-vitals-recommendations)
15. [Off-Site SEO / Authority Building Strategy](#15-off-site-seo--authority-building-strategy)
16. [30/60/90-Day Action Plan](#1690-day-action-plan)
17. [Developer Checklist](#17-developer-checklist)
18. [Final Diagnosis](#18-final-diagnosis)

---

## 1. Executive Summary

Lintel NY is a well-conceived, technically clean static website with a strong content framework — but it is effectively invisible on Google. The site is built on Netlify, uses proper canonical tags, meta descriptions, Open Graph tags, and partial schema markup. The service and trust page content is genuinely differentiated and above industry standard.

Despite that foundation, the site has several blockers preventing it from ranking:

- **Zero published blog content.** The Journal section is empty. Content marketing is the primary lever for a new site with no domain authority.
- **Empty gallery/portfolio.** The Projects page contains a visible placeholder message and zero completed project profiles.
- **Broken AI cost calculator.** The calculator surfaces an error to live users.
- **Unconfirmed physical address in schema.** A `TODO` comment in the production homepage source reveals the business address (postalCode, geo coordinates) has not been verified and confirmed. This affects Local SEO.
- **No Google Business Profile visible in search.** Without a verified GBP, the business cannot appear in Google Maps or the Local Pack — which is the highest-intent placement for contractor searches.
- **Zero domain authority.** The site has no inbound links. Google has not been given a reason to trust or promote it.
- **Brand search returns wrong results.** Searching "Lintel NY" returns architectural lintel companies. The business brand is not yet established in Google's index.

The business is well-positioned conceptually — documentation-first, permit-aware, licensed contractor for NYC and Long Island. That positioning is exactly what high-intent buyers are searching for. The gap is execution: the site needs content, authority, and local presence to translate its positioning into traffic and leads.

**Estimated ranking timeline without action:** 12–18 months before any meaningful organic visibility.  
**Estimated ranking timeline with this plan executed:** 3–6 months for brand and local terms; 6–12 months for competitive service keywords.

---

## 2. Current Strengths

| Strength | Detail |
|---|---|
| Technical infrastructure | Netlify CDN, HSTS, CSP headers, clean HTML |
| URL structure | Clean, keyword-relevant, consistent trailing-slash format |
| Canonical tags | Present on all crawled pages |
| Meta descriptions | Present on all crawled pages |
| Open Graph / Twitter Card | Present on all pages |
| Schema markup | LocalBusiness, Service, FAQPage, BreadcrumbList implemented on relevant pages |
| Service page content | ~1,200 words each, structured with scope, phases, pricing, FAQ |
| Trust/policy pages | Genuine differentiator — contract policy, change order policy, warranty, permit process |
| Credential transparency | HIC license #, EPA RRP certification, verifiable links |
| Location pages | Borough-specific content with real addresses (DOB offices), neighborhood lists |
| Robots.txt | Correct — allows all, blocks /admin/, references sitemap |
| HTTPS redirect | Properly 301-redirecting http:// and www. to https:// |
| .html → / redirects | In place in netlify.toml for all service and location pages |
| Mobile viewport | Correct viewport meta tag on all pages |

---

## 3. Critical Issues

These issues are actively blocking rankings and lead generation right now.

---

### C-01 — Blog / Journal Has Zero Published Articles

**Priority:** Critical  
**Owner:** Business Owner + Content Writer

**What it is:**  
The Journal page (`/blog/`) is live and indexed in the sitemap. The blog directory contains only one file: `post.html` (a template). No actual articles have been published.

**Why it matters:**  
Content is the primary mechanism by which a new site with zero domain authority earns rankings. Google ranks pages, not websites. Without published blog articles, there is nothing for Google to index and rank for informational and research-phase queries. Competitors who consistently publish cost guides, permit explainers, and renovation case studies are accumulating topical authority that Lintel NY cannot compete against.

**How to fix it:**  
Publish a minimum of 10–15 foundational articles immediately (see Section 11 for topic list). Each post needs: a target keyword, 800–1,500 words of substantive content, internal links to relevant service and location pages, FAQPage schema, and a strong CTA.

**Impact:** High. Content is the single most impactful lever available right now.

---

### C-02 — Gallery / Projects Page Is Publicly Empty With Visible Placeholder Text

**Priority:** Critical  
**Owner:** Business Owner

**What it is:**  
The Projects page (`/gallery/`) is live and in the sitemap. It contains zero actual project profiles. The page body displays the line: *"Representative profiles shown until verified case studies are added."* This placeholder text is visible to both users and Google's crawlers.

**Why it matters:**  
This damages trust on three levels:
1. **Users:** A visitor who clicks "Projects" and sees nothing leaves immediately — high bounce rate, no lead conversion.
2. **Google:** An indexed page with no substantive content is treated as thin content. Google may de-prioritize or de-index it.
3. **Brand perception:** The placeholder copy signals the business is not yet operational or not yet established.

**How to fix it:**  
Option A (immediate): Add `<meta name="robots" content="noindex">` to the gallery page and remove it from the sitemap until real project content is ready. This prevents Google from penalizing you for thin content.  
Option B (preferred): Publish 3–5 real project case studies as individual pages with before/after descriptions, scope of work, location, service type, budget range, and timeline. Link them from the gallery index.

---

### C-03 — AI Cost Calculator Is Broken for Live Users

**Priority:** Critical  
**Owner:** Developer

**What it is:**  
The Cost Calculator page (`/cost-calculator/`) is a highlighted navigation item and CTA across the entire site. The live tool currently surfaces the error: *"Something went wrong. Please try again or call (212) 347-2111."* The output table has empty category headers with no cost data.

**Why it matters:**  
The calculator is positioned as a lead generation and trust tool. When it fails, it:
- Destroys the first impression for visitors who click it
- Removes a key conversion path
- Signals to Google (via bounce rate and engagement signals) that the page is not functioning
- Wastes paid or organic clicks

The error likely originates from a failed API call to Anthropic's API (the CSP header allows `connect-src https://api.anthropic.com`). Either the API key is missing, the quota is exceeded, or the request is failing at the server level.

**How to fix it:**  
1. Debug the API call in the JavaScript. Check browser console for the actual error.
2. Implement a graceful fallback: if the API call fails, show static example estimates rather than a raw error.
3. Add error state UX: "Our AI estimator is temporarily unavailable. Here are typical planning ranges for common projects: [table]."
4. Add server-side monitoring so this failure is detected automatically.

---

### C-04 — Unconfirmed Business Address in Production Schema Markup

**Priority:** Critical  
**Owner:** Business Owner + Developer

**What it is:**  
The production `index.html` contains the following comment in the `<head>`:

```html
<!-- TODO: Confirm postalCode "10001" and geo coordinates match Google Business Profile address before launch -->
```

The schema currently uses `postalCode: "10001"` and coordinates `40.7580, -73.9855` (approximately Times Square / Midtown West). These are clearly placeholder values, not the confirmed business address.

**Why it matters:**  
- The LocalBusiness schema is live on the production site with incorrect data. Google reads this schema and uses it for local knowledge panel and map placement.
- A mismatch between the schema address and the Google Business Profile address (or a GBP that doesn't exist yet) will suppress local rankings.
- Inaccurate schema can trigger Google's quality guidelines around misleading structured data.

**How to fix it:**  
1. The business owner must confirm and establish a real business address — either a physical office, a registered business address service, or a confirmed service-area-only GBP setup.
2. Once the address is confirmed, update the schema on all pages that include the LocalBusiness type (homepage, about.html, all location pages).
3. Remove or resolve the TODO comment before the next deployment.

---

### C-05 — Site Is Effectively Invisible to Google

**Priority:** Critical  
**Owner:** SEO Specialist + Business Owner

**What it is:**  
Public search visibility snapshot (May 2026):
- Searching `"Lintel NY"` → returns architectural lintel companies, NOT this business
- Searching `site:lintelny.com` → Google appears to have indexed only 1–2 pages
- Searching `lintelny.com home improvement contractor NYC` → site does not appear
- For all competitive service keywords (kitchen remodeling NYC, bathroom renovation NYC, brownstone contractor Brooklyn, etc.) → site does not appear in the first page of results

**Note:** This is a public search visibility snapshot only. Exact impressions, clicks, CTR, and position data require Google Search Console verification.

**Why it matters:**  
The site is generating zero or near-zero organic search traffic. All leads are coming from direct traffic or paid sources. Without organic visibility, the business is entirely dependent on non-scalable channels.

**How to fix it:**  
This is addressed across multiple sections of this audit. The primary drivers are:
1. Establish and verify Google Business Profile (Section 7)
2. Build inbound links from local citations and industry directories (Section 15)
3. Publish regular blog content (Section 11)
4. Fix the broken calculator and empty gallery (C-02, C-03)

---

### C-06 — No Google Business Profile Confirmed

**Priority:** Critical  
**Owner:** Business Owner

**What it is:**  
No Google Business Profile for Lintel NY appeared in any public search during this audit — no Local Pack listing, no Google Maps result, no Knowledge Panel.

**Why it matters:**  
For a local contractor, the Google Business Profile / Local Pack is the highest-intent, most visible placement in all of Google Search. It appears above organic results. Searches like "home improvement contractor Brooklyn" or "bathroom renovation Queens" trigger Local Pack results that dominate the SERP. Without a verified GBP, the business is invisible in this format.

**How to fix it:**  
See Section 7 for the complete Google Business Profile strategy.

---

## 4. High Priority Issues

---

### H-01 — Homepage H1 Is a Brand Tagline, Not a Keyword Signal

**Priority:** High  
**Owner:** Developer / SEO Specialist

**What it is:**  
The homepage H1 is *"Measured. Specified. Built."* — a positioning tagline. While the page title tag includes target keywords ("Home Improvement Contractor NYC & Long Island"), the H1 is purely brand-focused with no keyword value.

**Why it matters:**  
Google uses the H1 as a strong relevance signal for what a page is about. A homepage targeting "home improvement contractor NYC" should have that phrase (or a close variant) in its H1.

**How to fix it:**  
Replace the current H1 or add a visible subtitle immediately below it. Example:

```
H1: Licensed Home Improvement Contractor — NYC & Long Island
Subhead: Measured. Specified. Built.
```

Or restructure so the tagline is a visual element (paragraph or span) and the H1 conveys the keyword target. The visual design does not need to change — only the semantic heading role.

---

### H-02 — Service Page H1 Tags Are Not Keyword-Optimized

**Priority:** High  
**Owner:** Developer / SEO Specialist

**What it is:**  
Service page H1 tags are generic single-word/phrase labels:
- `/services/bathroom-renovation-nyc/` → H1: "Bathroom Renovation"
- `/services/kitchen-remodeling-nyc/` → H1: "Kitchen Remodeling"
- `/services/coop-condo-renovation-nyc/` → H1: "Co-op and Condo Renovation"
- `/services/brownstone-renovation-brooklyn/` → H1: "Brownstone Renovation"
- `/services/electrical-services-nyc/` → H1: "Electrical Services"
- `/services/roofing-contractor-nyc/` → H1: "Roofing"

**Why it matters:**  
These H1s are too generic. The URL slugs contain keyword-rich location modifiers (e.g., "nyc", "brooklyn") but the H1 — the strongest on-page signal — omits them. Competitors rank for "bathroom renovation NYC" by including the full phrase in their H1.

**How to fix it:**  

| Page | Current H1 | Recommended H1 |
|---|---|---|
| Bathroom | Bathroom Renovation | Bathroom Renovation in NYC — Licensed & Permitted |
| Kitchen | Kitchen Remodeling | Kitchen Remodeling in NYC — Licensed HIC |
| Co-op/Condo | Co-op and Condo Renovation | NYC Co-op & Condo Renovation — Board-Ready Contractor |
| Brownstone | Brownstone Renovation | Brownstone Renovation in Brooklyn — Licensed HIC |
| Electrical | Electrical Services | Electrical Services NYC — Panel Upgrades & Rewiring |
| Roofing | Roofing | Roofing Contractor NYC & Long Island — Licensed & Insured |

---

### H-03 — No Reviews or Testimonials Anywhere on the Site

**Priority:** High  
**Owner:** Business Owner

**What it is:**  
The site contains zero customer reviews, testimonials, star ratings, or social proof. No third-party review embeds, no quote blocks, no video testimonials, no Google review widget.

**Why it matters:**  
- Reviews are the primary trust signal for contractor selection. Most homeowners will not submit a lead without reading reviews.
- Google uses review count and rating as a local ranking factor (Prominence).
- Competitors with 50+ Google reviews will outrank a business with none.
- The absence of reviews makes an otherwise professional site feel unverified.

**How to fix it:**  
1. Immediately begin soliciting reviews on Google Business Profile (see Section 7).
2. Add 3–5 written testimonials to service pages and the homepage — at minimum, with first name, project type, and borough.
3. Embed a Google review widget or display aggregate rating.
4. Add `AggregateRating` schema once reviews are accumulated.

---

### H-04 — No Physical Address Displayed on the Site

**Priority:** High  
**Owner:** Business Owner

**What it is:**  
The contact page and all other pages omit a physical street address. Only phone, email, and service area are provided.

**Why it matters:**  
- Google's local algorithm uses NAP (Name, Address, Phone) consistency across the web as a ranking factor.
- A business without a visible, consistent address sends a weak local signal.
- Many homeowners (especially for high-ticket projects) want to verify the business is real and established before making contact.
- The LocalBusiness schema address is currently a placeholder (see C-04).

**How to fix it:**  
- If the business operates from a home office, register a business mailbox (e.g., UPS Store, iPostal1, Regus) to establish a consistent, public-facing address.
- Display that address in the footer, contact page, and schema.
- Make sure the GBP, schema, and all directory listings use the exact same address format.

---

### H-05 — No Analytics or Conversion Tracking Installed

**Priority:** High  
**Owner:** Developer

**What it is:**  
No Google Analytics, Google Tag Manager, or any tracking script is visible in the HTML source. The CSP header does not include tracking domains in its `connect-src` allowlist.

**Why it matters:**  
Without analytics, the business owner has zero visibility into:
- How many people are visiting the site
- Where they come from (organic, direct, referral)
- Which pages generate leads
- Where users drop off
- Whether the contact form is converting

This makes every other optimization effort unmeasurable.

**How to fix it:**  
1. Set up Google Analytics 4 (GA4) and add it to every page.
2. Set up Google Tag Manager (GTM) as the tag container.
3. Track contact form submissions as conversion events.
4. Track phone number clicks as conversion events.
5. Track cost calculator interactions (opens, completions, errors).
6. Update the CSP header to allow the tracking domains:  
   `connect-src 'self' https://api.anthropic.com https://www.google-analytics.com https://analytics.google.com;`  
   `script-src` must also allow GTM's domain.

---

### H-06 — Google Search Console Not Confirmed Active

**Priority:** High  
**Owner:** Developer / Business Owner

**What it is:**  
There is no verification of Google Search Console being set up and active. The sitemap has not been submitted or confirmed as submitted.

**Why it matters:**  
- Without GSC, there is no visibility into crawl errors, manual penalties, index coverage issues, or keyword impressions.
- The sitemap must be submitted to GSC so Google can efficiently discover all 26 pages.
- GSC is where you monitor whether the `.html` → `/` redirects are resolving correctly.

**How to fix it:**  
1. Verify the site in GSC via DNS TXT record or HTML file (preferred for Netlify: DNS TXT or file upload).
2. Submit `https://lintelny.com/sitemap.xml`.
3. Monitor the Coverage report for crawl errors.
4. Monitor the Core Web Vitals report.
5. Review the Legacy URL report for any remaining `.html` indexed URLs.

---

### H-07 — Legacy .html URL Indexed by Google

**Priority:** High  
**Owner:** Developer

**What it is:**  
A public Google search found Google has indexed:  
`https://lintelny.com/services/electrical-services-nyc.html`

The canonical tag on that file correctly points to:  
`https://lintelny.com/services/electrical-services-nyc/`

The 301 redirect rule in `netlify.toml` (`/services/:name.html` → `/services/:name/`) is in place.

**Why it matters:**  
- If Google indexed the `.html` URL before or despite the redirect, it may be passing search equity to a URL that returns 301, not 200. This can dilute page authority.
- If the redirect is working, the indexed `.html` URL should eventually be replaced in the index by the canonical clean URL. However, this can take weeks or months without intervention.
- There may be other `.html` URLs indexed that are not yet visible in a quick public search.

**How to fix it:**  
1. In Google Search Console, submit the canonical URLs for re-indexing using the URL Inspection tool.
2. Use the "Request Indexing" function for the key service and location pages.
3. Monitor the Coverage report to ensure `.html` URLs are being replaced by their canonical counterparts.
4. Confirm the redirect chain: `electrical-services-nyc.html` → `electrical-services-nyc/` should be a single 301, not a chain.

---

### H-08 — Location Page URL Slugs Are Inconsistent

**Priority:** High  
**Owner:** Developer / SEO Specialist

**What it is:**  
The location page URL slugs embed a primary service into some borough names but not others:

| URL | Inconsistency |
|---|---|
| `/locations/brooklyn-brownstone-renovation/` | Service-specific |
| `/locations/manhattan-coop-condo-renovation/` | Service-specific |
| `/locations/queens-home-renovation/` | Generic |
| `/locations/bronx-home-renovation/` | Generic |
| `/locations/staten-island-renovation/` | Generic |
| `/locations/nassau-kitchen-remodeling/` | Service-specific |
| `/locations/suffolk-bathroom-remodeling/` | Service-specific |
| `/locations/long-island-renovation/` | Generic |

**Why it matters:**  
- Nassau's page slug is `/nassau-kitchen-remodeling/` but the H1 is "Home Improvement Contractor in Nassau County." The URL sends a kitchen-remodeling signal; the content covers all services. This confuses Google about what the page is targeting.
- If a visitor searches "bathroom renovation Nassau County," they won't find this page ranking because the URL and primary keyword anchor are about kitchen remodeling.
- The inconsistency makes the internal linking structure harder to scale.

**How to fix it:**  
Long-term, standardize location page slugs to a consistent pattern:  
`/locations/{borough-or-county}-home-renovation/` or `/locations/{borough-or-county}-contractor/`

For now (without 301-redirect work): Update the page title, H1, and meta description for Nassau and Suffolk to be general (not kitchen or bathroom specific), matching the content. This resolves the keyword mismatch without requiring URL changes.

---

### H-09 — No Sitemap for Blog Articles

**Priority:** High  
**Owner:** Developer

**What it is:**  
The sitemap includes `/blog/` but has no entries for individual blog posts. When articles are published (per the content strategy), they will not be automatically discovered by Google unless added to the sitemap or the sitemap is regenerated.

**Why it matters:**  
Blog articles are the primary content marketing tool. If they're not in the sitemap, Google may take weeks or months to discover them through crawling alone.

**How to fix it:**  
Implement a dynamic sitemap or a sitemap index with a separate `sitemap-blog.xml` that updates whenever a new post is added. Alternatively, manually add each published article URL to `sitemap.xml` at time of publication.

---

## 5. Medium Priority Issues

---

### M-01 — Title Tag Formulas Are Weak for Competitive Keywords

**What it is:**  
Current title tag formula: `[Service] — [Modifier] | Lintel NY`  
Example: "NYC Bathroom Renovation — Licensed HIC | Lintel NY"

The title format is decent but misses high-value modifiers that competitors use.

**Recommended formula:**  
`[Primary Keyword] in [Location] | [Differentiator] | Lintel NY`

Examples:
- "Bathroom Renovation NYC | Licensed, Permitted, Written Contracts | Lintel NY"
- "Kitchen Remodeling NYC | $28K–$175K | Licensed HIC | Lintel NY"
- "Co-op Renovation NYC | Board-Ready Documentation | Lintel NY"

**Owner:** SEO Specialist  
**Priority:** Medium

---

### M-02 — Trust Pages Have No Schema Beyond BreadcrumbList

**What it is:**  
Trust pages (`/trust/how-our-contract-works/`, `/trust/warranty-closeout/`, `/trust/change-order-policy/`, `/trust/licensing-insurance/`, `/trust/coop-alteration-checklist/`) all contain substantive FAQ-style content but only the permit-process page has confirmed FAQPage schema.

**How to fix it:**  
Add `FAQPage` JSON-LD schema to all trust pages that contain Q&A content. This enables Google to surface FAQ rich results directly in the SERP, increasing click-through rate.

**Owner:** Developer  
**Priority:** Medium

---

### M-03 — Location Pages Lack FAQPage Schema

**What it is:**  
All 8 location pages contain FAQ sections with 2–3 Q&A pairs but none have `FAQPage` structured data confirmed in source review.

**How to fix it:**  
Add `FAQPage` JSON-LD to all location page templates, mapping existing Q&A HTML to the schema format.

**Owner:** Developer  
**Priority:** Medium

---

### M-04 — No /services/ or /locations/ Hub Pages

**What it is:**  
The nav "Services" link points directly to `/services/bathroom-renovation-nyc/`. There is no `/services/` hub page. Similarly, "Locations" points to `/locations/brooklyn-brownstone-renovation/`.

**Why it matters:**  
- No services hub means there's no page that can rank for "home improvement services NYC" or "contractor services NYC."
- No locations hub means there's no page to rank for "service areas."
- Hub pages consolidate internal link equity and provide Google a map of site structure.

**How to fix it:**  
Create a `/services/` hub page and a `/locations/` hub page. Each should list all child pages with brief descriptions and link to each. Add them to the sitemap.

**Owner:** Developer + Content Writer  
**Priority:** Medium

---

### M-05 — No Breadcrumb Navigation in the HTML Body

**What it is:**  
BreadcrumbList schema is correctly implemented in JSON-LD, but there are no visible breadcrumb links in the HTML body (e.g., "Home > Services > Bathroom Renovation").

**Why it matters:**  
Visible breadcrumbs improve UX on deep pages, reinforce internal linking, and help Google understand site hierarchy. Schema breadcrumbs help SERP appearance; visible breadcrumbs help crawling and UX.

**Owner:** Developer  
**Priority:** Medium

---

### M-06 — Sitemap lastmod Dates Are All Identical

**What it is:**  
Every URL in the sitemap has `<lastmod>2026-04-29</lastmod>`. This is the same date for all 26 pages.

**Why it matters:**  
Identical lastmod dates tell Google nothing useful about which pages have been updated recently. More importantly, when new blog content is added, the sitemap needs to reflect accurate dates. A static identical date across all URLs may cause Googlebot to deprioritize re-crawling.

**How to fix it:**  
Either: (1) update `lastmod` to real, accurate dates for each page, or (2) remove the `lastmod` tag entirely from pages you aren't tracking. When blog posts are published, set their `lastmod` to the actual publication date.

**Owner:** Developer  
**Priority:** Medium

---

### M-07 — Gallery Page Should Be Noindexed Until Content Exists

**What it is:**  
The gallery page (`/gallery/`) is indexed in the sitemap with priority 0.7 but contains zero project content and a visible placeholder message.

**How to fix it:**  
Add `<meta name="robots" content="noindex, follow">` to the gallery page AND remove it from the sitemap until real project profiles are added. This prevents thin-content signals from harming the domain.

**Owner:** Developer  
**Priority:** Medium

---

### M-08 — The "Services" Dropdown Nav Link Is Not a Hub

**What it is:**  
`<a href="/services/bathroom-renovation-nyc/" class="nav__link">Services ▾</a>` — The dropdown parent link goes directly to the bathroom page rather than a services hub.

**Why it matters:**  
A user who clicks "Services" (rather than a specific dropdown item) lands on the bathroom page with no context that other services exist. This misrepresents the business's breadth.

**How to fix it:**  
Create `/services/` as a hub page and link the dropdown trigger to it.

**Owner:** Developer  
**Priority:** Medium

---

### M-09 — No OG Image Variation Per Page

**What it is:**  
Every page uses the same OG image: `https://lintelny.com/img/og-image.jpg`.

**Why it matters:**  
When content is shared on social media, all pages show the same image regardless of service or location. This reduces social CTR and makes shares look generic.

**How to fix it:**  
Create service-specific OG images (kitchen, bathroom, brownstone, etc.) and apply them to each service page. Minimum size: 1200×630px.

**Owner:** Developer / Designer  
**Priority:** Medium (low urgency until social traffic is meaningful)

---

## 6. Google Discoverability Analysis

*This analysis is a public search visibility snapshot conducted in May 2026. Search results vary by location, device, search history, and time. Exact ranking positions, impressions, clicks, and CTR data require Google Search Console access.*

---

### Brand Visibility

| Search Query | Visibility |
|---|---|
| "Lintel NY" | Weak — returns architectural lintel companies. The brand is not established in Google's index. |
| "lintelny.com" | Weak — 1–2 pages indexed. Site: operator shows very limited crawl coverage. |
| "Lintel NY contractor" | Not found in top results |
| "Lintel NY home improvement" | Not found in top results |

**Assessment:** The brand "Lintel NY" has a naming collision problem. The word "lintel" is an architectural building component (the horizontal beam above a window or door). Searching "lintel NY" or "lintel New York" returns genuine lintel repair and masonry contractors. Google cannot distinguish the brand name from the product name at this stage because the site has no external signals (links, mentions, GBP) confirming it as a business entity.

---

### Service Keyword Visibility

| Search Query | Visibility |
|---|---|
| Home improvement contractor NYC | Not ranking. Page 1 dominated by Thumbtack, Houzz, Yelp, AMNY, and established contractors. |
| Licensed home improvement contractor NYC | Not ranking. Same competitor landscape. |
| Kitchen remodeling NYC | Not ranking. Page 1: Klein Kitchen & Bath, Yelp, HomeAdvisor, MTK Contracting, NYHOMERESTORATION. |
| Bathroom renovation NYC | Not ranking. Page 1: Block Renovation, NYKB, various established contractors. |
| Brownstone renovation Brooklyn | Not ranking. Page 1: Brownstone Works, Gallery KBNY, Chapter, Zicklin, Klein, A to Z Renovations. |
| Co-op renovation contractor NYC | Not ranking. Page 1: Corniel Construction, Block Renovation, KS Renovation Group, Gallery KBNY. |
| Renovation contractor Queens | Not ranking. Page 1: Expertise.com, Block Renovation, MCG Corp, Muka Interiors. |
| Home improvement contractor Nassau County | Not ranking. Page 1: local Long Island contractors with years of reviews. |
| Roofing contractor NYC | Not ranking. Page 1: established roofing-specific contractors. |
| Electrical services NYC | Not ranking. Page 1: established electrical contractors. |

**Assessment:** Lintel NY is invisible for every target keyword. This is expected for a new site with no inbound links and no content marketing footprint. It does not reflect poor-quality pages — it reflects an authority problem that only backlinks, citations, reviews, and consistent content will solve over time.

---

### Competitive Landscape Summary

The following competitors consistently appear in the first-page results for Lintel NY's target keywords:

| Competitor | Strengths |
|---|---|
| Zicklin Contracting | 37+ years, strong local citations, DCA license prominently displayed |
| Gallery KBNY | Strong blog content on co-op board processes, good backlink profile |
| Klein Kitchen & Bath | 7-year warranty as differentiator, Yelp and Google reviews |
| Block Renovation | Marketplace model, strong domain authority, extensive blog |
| Chapter (hellochapter.com) | Modern brand, well-funded, in-house design, content-heavy |
| Brownstone Works | 20+ years, Brooklyn-specific, strong brand recognition |
| Corniel Construction | Aggressive content marketing around co-op board approvals |
| Sweeten | Platform with contractor matching, very high DA |

The common thread: **every competitor ranking on page 1 has (a) 50+ Google reviews, (b) inbound links from local press, directories, or industry publications, and (c) an active content marketing program.**

---

## 7. Local SEO / Google Business Profile Strategy

Local SEO for a contractor is built on Google's three local ranking factors: **Relevance, Distance, and Prominence.**

---

### 7.1 Google Business Profile Setup (Immediate Priority)

1. **Create and verify the GBP listing** at `business.google.com`. Verification will require a postcard, phone call, or video verification to the business address.
2. **Primary Category:** `Home Improvement Contractor`
3. **Secondary Categories:** `General Contractor`, `Kitchen Remodeler`, `Bathroom Remodeler`, `Roofing Contractor`, `Electrician`
4. **Business Name:** Lintel NY (exact match to all other listings)
5. **Address:** Must match the verified physical or registered address exactly. Once set, this becomes the master NAP.
6. **Service Area:** Set all 5 NYC boroughs + Nassau County + Suffolk County. Do not try to set a radius — set specific service areas.
7. **Phone:** (212) 347-2111
8. **Website:** https://lintelny.com/
9. **Hours:** Mon–Fri 9am–6pm (as stated on the contact page)

---

### 7.2 GBP Content Optimization

**Services:** Add every individual service with a description and price range. Google uses this to match GBP listings to service-specific queries.

**Description:** Write a 750-character business description optimized for local search. Example:

> "Lintel NY is a licensed NYC home improvement contractor (HIC #2109847-DCA) serving all five boroughs, Nassau County, and Suffolk County. We specialize in kitchen remodeling, bathroom renovation, co-op and condo alteration work, brownstone renovation, electrical services, and roofing. Every project includes written contracts, DOB permit filing, and a 2-year labor warranty. EPA RRP Lead-Safe Certified."

**Photos:** Upload at minimum 20 photos at launch. Required categories:
- Logo (high resolution)
- Cover photo (professional exterior or project image)
- At-work photos (on-site if possible)
- Completed project photos (before/after)
- License/credential documents

**Posts:** Publish 1 GBP Post per week. Types:
- Project spotlights (when gallery exists)
- Blog article links
- Seasonal service promotions
- Permit/process education

---

### 7.3 Review Strategy

Reviews are the most powerful local ranking signal within the Prominence factor.

**Phase 1 (Months 1–3): Get to 10 Google reviews**
- Ask every completed project client to leave a Google review. Send a direct link.
- Ask any past satisfied clients to leave a review retroactively.
- Target: 10 reviews at 5.0 rating before focusing on other strategies.

**Phase 2 (Months 3–6): Get to 25 reviews**
- Add a review request to the project closeout process (automatically after punch list sign-off).
- Respond to every review — positive and negative — within 48 hours.
- Do not incentivize reviews (violates Google's terms).

**Phase 3 (Ongoing): Maintain cadence**
- Target: 1 new review per completed project.
- Monitor with Google Alerts or GBP dashboard notifications.

**Review platforms beyond Google:**
- Houzz (critical for home improvement; drives backlinks)
- Yelp (used in NYC heavily)
- Angi (formerly Angie's List)
- Thumbtack
- HomeAdvisor / Angi Pro
- BBB (trust signal for high-ticket clients)

---

### 7.4 NAP Consistency

**Current NAP:**
- Name: Lintel NY
- Address: [UNCONFIRMED — must be established first]
- Phone: (212) 347-2111

Once the address is confirmed, this exact NAP must appear consistently across:
- GBP listing
- Website (footer, contact page, schema markup)
- All directory listings
- All citation sources

Any variation in spelling, abbreviation, or phone format (e.g., 212.347.2111 vs. (212) 347-2111) degrades the local signal.

---

### 7.5 Citation / Directory Strategy

Submit the business to these directories in order of priority:

**Tier 1 (submit immediately):**
1. Google Business Profile
2. Bing Places for Business
3. Apple Maps (via Apple Business Connect)
4. Yelp for Business
5. Houzz (create contractor profile)
6. Angi Pro (formerly Angie's List)
7. HomeAdvisor Pro

**Tier 2 (submit within 30 days):**
8. Thumbtack
9. BBB (Better Business Bureau — NYC)
10. Foursquare
11. Yellowpages.com
12. Superpages.com
13. Mapquest Business
14. Citysearch

**Tier 3 — Local NYC (submit within 60 days):**
15. NYC.gov contractor directories (where available)
16. nyc.gov/dcwp (ensure HIC license lookup returns current data)
17. DCWP licensee directory (verify the business appears in the public license search)

---

### 7.6 Local Landing Page Strategy

The current 8 location pages are a solid start. To dominate local search, each page needs to be expanded and each borough/county needs service-specific sub-pages.

**Current state:** 8 location pages, 550–950 words each.

**Target state:** Each location page should be 1,500+ words with:
- Specific neighborhood-level content
- Permit office information (already present — expand)
- HOA/co-op board context for that area
- 2–3 specific project examples or case studies from that area
- 5+ FAQ items
- Schema: LocalBusiness + BreadcrumbList + FAQPage

**Service × Location matrix (Phase 2):**  
Create targeted landing pages for high-value combinations:
- `/locations/brooklyn/kitchen-remodeling/`
- `/locations/brooklyn/bathroom-renovation/`
- `/locations/manhattan/coop-renovation/`
- `/locations/queens/kitchen-remodeling/`
- etc.

This is a Phase 2 effort but can dramatically expand local keyword coverage.

---

## 8. On-Page SEO Recommendations

### 8.1 Title Tag Template

**Homepage:**  
`Licensed Home Improvement Contractor NYC & Long Island | Lintel NY`

**Service Pages:**  
`[Service] in NYC | Licensed, Permitted, Written Contracts | Lintel NY`  
Max 60 characters. Include location modifier and one key differentiator.

**Location Pages:**  
`Home Improvement Contractor in [Borough/County] | Licensed HIC | Lintel NY`

**Trust Pages:**  
`[Page Topic] | Contractor Documentation | Lintel NY`

**Blog Posts:**  
`[Target Keyword] — [NYC/Location Modifier] | Lintel NY`

---

### 8.2 Meta Description Template

Write 140–160 character meta descriptions for every page. All are currently present but several are under-optimized.

**Formula:**  
`[Primary service/topic]. [Key differentiator]. [Location]. [Call to action].`

**Examples:**

Homepage:  
`Licensed NYC home improvement contractor. Written contracts, DOB permits, 2-year warranty. Serving all 5 boroughs and Long Island. Get a free written estimate.`

Bathroom:  
`Licensed bathroom renovation in NYC. DOB-permitted plumbing, waterproofing, and tile. $14K–$90K. Written contracts. EPA certified. Get a free estimate.`  
*(Current meta — keep this, it's good)*

Location pages: Add the borough name, the license number, and a specific CTA.

---

### 8.3 Heading Structure Template

**Homepage:**
```
H1: Licensed Home Improvement Contractor — NYC & Long Island
H2: Services [section]
H2: Our Process
H2: Trust & Credentials
H2: Coverage Area
H2: From the Journal
```

**Service Pages:**
```
H1: [Service] in [Location] — Licensed & Permitted
H2: Scope of Work
H2: Typical Cost Range
H2: Project Timeline
H2: What Lintel NY Includes
H2: Project Phases
H2: Frequently Asked Questions
H2: Related Services
```

**Location Pages:**
```
H1: Home Improvement Contractor in [Borough/County]
H2: [Borough-Specific Expertise Heading]
H2: Services Available in [Borough]
H2: Neighborhoods We Serve
H2: Frequently Asked Questions About [Borough] Renovation
```

---

### 8.4 Internal Linking Plan

**Current state:** Internal linking is present but inconsistent. Service pages link to locations; location pages link to services. No hub pages to consolidate equity.

**Recommended structure:**

```
Homepage
├── /services/          (hub)
│   ├── /bathroom-renovation-nyc/
│   ├── /kitchen-remodeling-nyc/
│   ├── /coop-condo-renovation-nyc/
│   ├── /brownstone-renovation-brooklyn/
│   ├── /electrical-services-nyc/
│   └── /roofing-contractor-nyc/
├── /locations/         (hub)
│   ├── /brooklyn-brownstone-renovation/
│   ├── /manhattan-coop-condo-renovation/
│   └── ... (all 8 locations)
├── /trust/
│   └── ... (all 6 trust pages)
├── /blog/
│   └── [individual articles — link to relevant service and location pages]
├── /gallery/
├── /about/
├── /contact/
└── /cost-calculator/
```

**Rules:**
- Every blog article should link to at least 2 service pages and 1 location page.
- Every service page should link to 3+ location pages in a "Where We Work" section.
- Every location page should link to 3+ service pages in a "Services Available" section.
- The homepage should link to all 6 service pages and all 8 location pages (currently does via cards — good).

---

## 9. Technical SEO Recommendations

### 9.1 Canonical URL Strategy

**Current state:** Canonical tags are correctly implemented on all crawled pages. The canonical URL format uses trailing slashes (e.g., `https://lintelny.com/services/bathroom-renovation-nyc/`).

**Recommended:** No changes needed to canonical logic. Ensure:
- Canonical self-references on ALL pages (including blog posts when published)
- Trust pages using directory structure (`/trust/permit-process/index.html`) — confirmed correct
- Location pages using `.html` files served via Netlify rewrite — confirmed canonical points to `/` URL

---

### 9.2 301 Redirect Audit

**Current state in netlify.toml:**

✅ HTTP → HTTPS redirect: Correct  
✅ www. → non-www redirect: Correct  
✅ `/services/:name.html` → `/services/:name/`: Correct  
✅ `/locations/:name.html` → `/locations/:name/`: Correct  
✅ Core pages (.html → /): Correct for about, blog, contact, gallery

**Missing redirects to add:**
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

**Action:** Confirm the redirect chain for already-indexed `.html` URLs is a single 301, not a chain redirect (301 → 301 → 200). Redirect chains dilute link equity.

---

### 9.3 Sitemap Cleanup

**Current sitemap issues:**
1. All `<lastmod>` dates are identical (`2026-04-29`) — not useful to Googlebot.
2. Blog posts are not included (because none exist yet).
3. No `/services/` or `/locations/` hub page URLs (because they don't exist yet).
4. Gallery page is included despite being a placeholder (remove until content is added).

**Recommended actions:**
1. Remove `/gallery/` from sitemap until project content exists.
2. Update `lastmod` to accurate per-page last-modified dates, or remove `lastmod` entirely.
3. Add a blog sitemap (`sitemap-blog.xml`) and reference it from `sitemap.xml` as a sitemap index when articles are published.
4. Submit the sitemap to Google Search Console.

---

### 9.4 Robots.txt Review

**Current content:**
```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://lintelny.com/sitemap.xml
```

**Assessment:** Correct and minimal. No issues.

**Additions to consider:**
```
Disallow: /thank-you/
Disallow: /cost-calculator/    # Optional: prevent calculator from being indexed if it's broken
```

The `/thank-you/` page (if it exists as a post-form-submission confirmation) should not be indexed, and a `noindex` meta tag should be added to it.

---

### 9.5 Core Web Vitals — Developer Actions

*Exact CWV scores (LCP, CLS, INP) require PageSpeed Insights, Chrome UX Report, or GSC data. The following are recommendations based on the site architecture.*

**Expected positives:**
- Static HTML on Netlify CDN: Very low TTFB (typically < 200ms)
- Google Fonts: Preloaded correctly with `preload` and `onload` swap technique
- CSS/JS: 1-year immutable cache headers

**Risks to investigate:**
1. **LCP (Largest Contentful Paint):** What is the LCP element on the homepage? If it's the logo SVG or a heading, LCP should be fast. If it's a hero image, verify the image is preloaded and properly sized.
2. **CLS (Cumulative Layout Shift):** Verify that web fonts (JetBrains Mono, DM Sans) don't cause layout shift during load. The `font-display: swap` approach (via Google Fonts `display=swap`) can cause CLS if text blocks reflow significantly.
3. **INP (Interaction to Next Paint):** Verify the hamburger nav JavaScript, dropdown menus, and contact form inputs respond within 200ms. The cost calculator JavaScript may be heavy.
4. **Image optimization:** All project/portfolio images (when added) must be served in WebP format with explicit `width` and `height` attributes to prevent CLS.

**Actions for Developer:**
- Run PageSpeed Insights on homepage, one service page, and the contact page.
- Add `loading="lazy"` to all below-fold images.
- Add explicit `width` and `height` to all `<img>` tags.
- Convert all images to WebP with JPEG/PNG fallback.
- Preload the LCP image with `<link rel="preload" as="image" href="...">`.

---

### 9.6 Security Headers Review

**Current headers (from netlify.toml):**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: [restrictive policy]
```

**Assessment:** Headers are solid. One issue:

The CSP `connect-src` currently allows only `'self'` and `https://api.anthropic.com`. When Google Analytics and GTM are added, update:

```
connect-src 'self' https://api.anthropic.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
img-src 'self' data: https: https://www.google-analytics.com;
```

---

## 10. Structured Data Recommendations

### 10.1 Current Schema Inventory

| Page Type | Schema Present | Schema Missing |
|---|---|---|
| Homepage | LocalBusiness, HomeAndConstructionBusiness, areaServed, hasCredential, contactPoint, geo | Real address (placeholder), sameAs links, AggregateRating |
| Service pages | Service, FAQPage, BreadcrumbList | AggregateRating (when reviews exist), HowTo (optional) |
| Location pages | LocalBusiness, BreadcrumbList | FAQPage (on most pages), areaServed specifics |
| Trust pages (permit) | FAQPage, BreadcrumbList | — |
| Trust pages (other) | BreadcrumbList only | FAQPage on contract, warranty, checklist pages |
| About | LocalBusiness, founder Person | — |
| Blog | None | WebSite, Blog schema |
| Gallery | None | ImageGallery (when content exists) |
| Contact | None | LocalBusiness contact schema |

---

### 10.2 Priority Schema Additions

**1. Add FAQPage to all trust pages**

The contract, change order, warranty, and alteration checklist pages all have Q&A content. Adding `FAQPage` schema enables rich FAQ results in SERPs.

**2. Add FAQPage to all location pages**

All 8 location pages have FAQ sections. Add `FAQPage` JSON-LD to each.

**3. Add sameAs links to LocalBusiness schema**

Once GBP, Yelp, Houzz, and other profiles are created:
```json
"sameAs": [
  "https://www.google.com/maps/place/[your-place-id]",
  "https://www.houzz.com/pro/lintelny/",
  "https://www.yelp.com/biz/lintel-ny",
  "https://www.bbb.org/us/ny/new-york/profile/lintel-ny"
]
```

**4. Confirm and correct the business address in all LocalBusiness schema**

Once the real address is established, update all instances:
- `index.html` (homepage)
- `about.html`
- All 8 location page HTML files
- Remove the TODO comment

**5. Add AggregateRating once reviews exist**

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "12",
  "bestRating": "5",
  "worstRating": "1"
}
```

This enables star rating display in Google SERPs — significant CTR boost.

**6. Add WebSite schema to homepage for Sitelinks Search Box (optional)**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://lintelny.com/",
  "name": "Lintel NY",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://lintelny.com/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**7. Add Article schema to blog posts when published**

```json
{
  "@type": "Article",
  "headline": "Post title",
  "datePublished": "2026-05-28",
  "dateModified": "2026-05-28",
  "author": {"@type": "Person", "name": "Saif Anwar"},
  "publisher": {"@type": "Organization", "name": "Lintel NY"},
  "image": "https://lintelny.com/img/blog/[post-image].jpg"
}
```

---

## 11. Content Strategy

The single most impactful action Lintel NY can take in the next 30 days is publishing substantive, targeted blog content. Without it, the domain cannot earn topical authority or organic traffic.

---

### 11.1 Content Pillars

Organize all content into four pillars:

| Pillar | Purpose | Examples |
|---|---|---|
| Cost & Budgeting | Capture research-phase traffic | "How much does a kitchen remodel cost in NYC?", "Bathroom renovation cost guide Brooklyn" |
| Process & Permits | Demonstrate expertise, build trust | "How DOB permits work for renovation in NYC", "What is an alteration agreement?" |
| Location-Specific | Local SEO, borough/county targeting | "Brownstone renovation guide Park Slope", "Co-op renovation rules Manhattan" |
| Contractor Selection | Intercept buyers in decision phase | "How to choose a licensed contractor in NYC", "Red flags to avoid in contractor estimates" |

---

### 11.2 Priority Blog Topics (Publish First)

| Priority | Title | Target Keyword | Link To |
|---|---|---|---|
| 1 | How Much Does a Kitchen Remodel Cost in NYC? (2026 Guide) | kitchen remodel cost NYC | /services/kitchen-remodeling-nyc/ |
| 2 | Bathroom Renovation Cost in NYC: What to Expect in 2026 | bathroom renovation cost NYC | /services/bathroom-renovation-nyc/ |
| 3 | What Is an Alteration Agreement and How Do You Get Board Approval? | alteration agreement NYC co-op | /trust/coop-alteration-checklist/, /services/coop-condo-renovation-nyc/ |
| 4 | Brooklyn Brownstone Renovation: A Complete Planning Guide | brownstone renovation guide Brooklyn | /services/brownstone-renovation-brooklyn/, /locations/brooklyn-brownstone-renovation/ |
| 5 | NYC DOB Permits: What Requires One and How the Filing Process Works | NYC DOB permit renovation | /trust/permit-process/ |
| 6 | How to Hire a Licensed Contractor in NYC: What to Check Before You Sign | licensed contractor NYC | /trust/licensing-insurance/, /trust/how-our-contract-works/ |
| 7 | Co-op Renovation in NYC: What Your Board Actually Requires | co-op board renovation NYC | /services/coop-condo-renovation-nyc/, /trust/coop-alteration-checklist/ |
| 8 | Panel Upgrade NYC: When You Need One and What It Costs | panel upgrade NYC cost | /services/electrical-services-nyc/ |
| 9 | Flat Roof vs. Shingle Roof in NYC: Which Is Right for Your Property? | flat roof vs shingle NYC | /services/roofing-contractor-nyc/ |
| 10 | Home Renovation in Queens: What Homeowners Should Know | home renovation Queens | /locations/queens-home-renovation/ |
| 11 | Nassau County Kitchen Remodel: Permits, Costs, and What's Different from NYC | Nassau County kitchen remodel | /locations/nassau-kitchen-remodeling/ |
| 12 | Pre-War Apartment Renovation NYC: Hidden Challenges and How to Plan | pre-war renovation NYC | /services/bathroom-renovation-nyc/, /services/electrical-services-nyc/ |
| 13 | How to Read a Renovation Estimate: What Every Line Item Means | renovation estimate NYC | /trust/how-our-contract-works/ |
| 14 | Change Orders in Construction: How to Protect Yourself | change order contractor NYC | /trust/change-order-policy/ |
| 15 | Contractor Warranty: What a 2-Year Labor Warranty Actually Covers | contractor warranty NYC | /trust/warranty-closeout/ |

---

### 11.3 Blog Post Structure Template

Every article must follow this structure:

```
Title (H1): [Target keyword + location modifier]
Introduction (150–200 words): State the problem, promise the answer.
H2: [Subtopic 1]
H2: [Subtopic 2]
H2: [Subtopic 3]
H2: How Lintel NY Handles This (contextual CTA)
H2: Frequently Asked Questions
  - 3–5 Q&A pairs (add FAQPage schema)
[Internal links to 2+ service pages and 1+ location page]
CTA: Get a written estimate / Call / Use the calculator
```

Minimum length: 800 words. Target: 1,200–1,500 words for competitive topics.

---

### 11.4 Case Study / Project Portfolio Strategy

This is a critical trust and conversion asset. When the gallery is built, each project profile should include:

- Project type (Kitchen, Bathroom, Brownstone, etc.)
- Borough/neighborhood
- Property type (Co-op, brownstone, single-family, etc.)
- Budget range (general)
- Timeline (duration)
- Scope summary (what was done)
- Key challenges (permits, board approval, pre-existing conditions)
- Before/after photos (if available)
- Quote from client (if authorized)

**Minimum 5 projects needed before launch.** Target: 15 projects in the first 6 months.

Each project page should have:
- URL: `/projects/[project-slug]/` (new URL pattern)
- Schema: `Project` (or `Service` with `result`)
- Internal links from relevant service and location pages

---

### 11.5 Service Page Content Upgrades

Current service pages are ~1,200 words and well-structured. Upgrades to increase depth:

- **Expand FAQ from 3 to 8–10 questions** per page. Target conversational long-tail queries.
- **Add a "Recent Projects" section** (once gallery exists) with 2–3 project thumbnails linking to case studies.
- **Add a "What to Expect at Your First Estimate" section** on each service page.
- **Add a comparison table** (e.g., "Permitted vs. Unpermitted Work — The Risk") on relevant pages.
- **Add borough-specific notes** (e.g., "Brownstone in Landmark District? Here's What Changes").

---

### 11.6 Trust Content (High-Value Differentiator)

The existing trust pages are an unusual and effective differentiator. Expand them:

- **Licensing & Insurance:** Add step-by-step screenshots or instructions for verifying the HIC license on DCWP's website.
- **Contract page:** Add a sample contract section breakdown with annotations (non-binding example).
- **Permit page:** Add a timeline graphic showing typical DOB permit wait times by project type.
- **Co-op checklist:** Add borough-specific notes (Manhattan co-ops vs. Brooklyn co-ops have different requirements).

---

## 12. Keyword Strategy

### 12.1 Primary Keywords (Highest Commercial Intent)

| Keyword | Est. Monthly Volume | Difficulty | Target Page |
|---|---|---|---|
| Home improvement contractor NYC | High | Very High | Homepage |
| Licensed contractor NYC | High | Very High | Homepage |
| Kitchen remodeling NYC | High | High | /services/kitchen-remodeling-nyc/ |
| Bathroom renovation NYC | High | High | /services/bathroom-renovation-nyc/ |
| Brownstone renovation Brooklyn | Medium | High | /services/brownstone-renovation-brooklyn/ |
| Co-op renovation NYC | Medium | High | /services/coop-condo-renovation-nyc/ |
| Roofing contractor NYC | Medium | High | /services/roofing-contractor-nyc/ |
| Electrical contractor NYC | Medium | High | /services/electrical-services-nyc/ |

*Note: Exact monthly volume data requires Google Keyword Planner or a third-party tool (Ahrefs, Semrush). Difficulty ratings are qualitative based on SERP analysis.*

---

### 12.2 Secondary Keywords (Local + Service Combinations)

| Keyword | Target Page |
|---|---|
| Home improvement contractor Brooklyn | /locations/brooklyn-brownstone-renovation/ |
| Renovation contractor Manhattan | /locations/manhattan-coop-condo-renovation/ |
| Home renovation Queens | /locations/queens-home-renovation/ |
| Contractor Nassau County | /locations/nassau-kitchen-remodeling/ |
| Kitchen remodel Long Island | /locations/long-island-renovation/ |
| Co-op board renovation contractor | /services/coop-condo-renovation-nyc/ |
| Brownstone gut renovation NYC | /services/brownstone-renovation-brooklyn/ |
| Panel upgrade NYC | /services/electrical-services-nyc/ |
| Flat roof replacement NYC | /services/roofing-contractor-nyc/ |

---

### 12.3 Long-Tail Keywords (Blog Targets — Lower Competition, Faster to Rank)

These are realistic near-term ranking opportunities for a new site:

- "How much does a bathroom renovation cost in NYC"
- "Do I need a permit for kitchen renovation in NYC"
- "What is an alteration agreement NYC co-op"
- "How to get board approval for renovation NYC"
- "Brownstone renovation cost Brooklyn 2026"
- "Panel upgrade cost NYC 2026"
- "How to verify contractor license NYC"
- "What does an NYC home improvement contract require"
- "Pre-war apartment electrical upgrade NYC"

These long-tail keywords have lower competition and high intent. A new site can realistically rank for these in 3–6 months with quality, well-structured articles.

---

## 13. Conversion & Lead Generation Recommendations

### 13.1 Contact Form Assessment

**Current form fields (12 total):**
Full Name, Email, Phone, Preferred Contact Method, Property Location, Property Address, Property Type, Service Needed, Budget Range, Desired Start, Board Approval Required, Permit Questions, Project Description

**Assessment:** The form is comprehensive but has form fatigue risk. 12 fields is high for an initial inquiry form.

**Recommendation:**
- **Primary form (short):** Name, Phone/Email, Service, Borough, Project Description. 5–6 fields. This is the primary CTA.
- **Secondary/detailed form (current):** Keep the 12-field version as an optional "detailed intake" on the estimate page.
- A/B test both forms. Track submission rates in GA4.

---

### 13.2 Cost Calculator Recovery

The calculator is a strong lead generation concept — it captures intent and delivers value before asking for contact info. Fix the calculator as described in C-03. Once functional:

1. Add a "Get a Formal Written Estimate" form as the output step — capture name/email/phone after showing the estimate range.
2. Track calculator completions as GA4 conversion events.
3. Add schema for the calculator page: `WebApplication` type.

---

### 13.3 Phone Number Visibility

- The phone number (212) 347-2111 is consistently displayed across all pages. This is good.
- Add `tel:` links to make the number clickable on mobile: `<a href="tel:+12123472111">(212) 347-2111</a>` — verify this is implemented in HTML (it was visible in the contact page analysis).
- Track phone number clicks as GA4 events.

---

### 13.4 Missing Trust Signals on Service Pages

Current service pages lack:
- Client testimonials or quotes
- Star ratings from Google
- Project photos (because gallery is empty)
- "X projects completed" stat
- Years in business statement

**Add to service pages:**
- 1–2 testimonial quotes (even anonymized by first name + borough)
- A "From the Team" note from Saif Anwar on complex service pages
- "We've completed renovations in [borough] buildings including [building type]" specifics

---

### 13.5 Sticky CTA Bar

**Recommendation for mobile:** Add a sticky bottom bar on mobile with:
- Phone number (click-to-call)
- "Get Estimate" button

This is the highest-converting mobile element for contractor sites. Many competitors use it.

---

### 13.6 Exit Intent / Abandonment

Consider a simple exit-intent prompt on long service pages: *"Not sure where to start? Get a no-obligation written estimate."* — link to contact form. This recovers abandoning visitors.

---

## 14. Performance & Core Web Vitals Recommendations

*Exact Core Web Vitals scores require PageSpeed Insights, Lighthouse, or Google Search Console's Core Web Vitals report. The following are architectural recommendations based on the code review.*

---

### 14.1 Confirmed Performance Positives

| Element | Status |
|---|---|
| Netlify CDN hosting | Fast global delivery |
| HSTS preload | HTTPS served immediately |
| Google Fonts preload | `<link rel="preload" as="style">` + `onload` swap |
| CSS/JS cache headers | 1-year immutable cache |
| No heavy JS frameworks | Vanilla HTML/CSS — lightweight |
| SVG logo | < 1KB |
| Security headers | Comprehensive, no performance cost |

---

### 14.2 Developer Actions for CWV

**Largest Contentful Paint (LCP):**
- Identify the LCP element on the homepage (likely the H1 or a hero area).
- If a hero image exists, preload it: `<link rel="preload" as="image" href="/img/hero.jpg">`.
- Ensure the LCP element is visible without JavaScript.

**Cumulative Layout Shift (CLS):**
- Add explicit `width` and `height` attributes to all `<img>` tags.
- Use `font-display: swap` for Google Fonts (already handled via the Google Fonts URL parameter).
- Avoid inserting content above the fold dynamically (e.g., cookie banners, promo bars).
- Reserve space for the nav dropdown menus to avoid CLS on load.

**Interaction to Next Paint (INP):**
- Keep JavaScript event handlers lightweight.
- Defer non-critical JavaScript with `defer` or `async` attributes.
- The cost calculator API call should be non-blocking — load the calculator UI immediately and fetch results async.

**Image Optimization (when gallery is populated):**
- Serve images in WebP format.
- Use responsive images with `srcset` and `sizes`.
- Compress all images to < 100KB for thumbnails, < 300KB for full-width images.
- Add `loading="lazy"` to all below-fold images.
- Always include descriptive `alt` text for accessibility and image search SEO.

---

### 14.3 Google Fonts Loading Optimization

The current implementation is correct:
```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/..." onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="..."></noscript>
```

One improvement: Self-host Google Fonts via `@font-face` with locally stored font files. This eliminates the external DNS lookup to `fonts.googleapis.com` and `fonts.gstatic.com` entirely, improving LCP.

---

## 15. Off-Site SEO / Authority Building Strategy

The site's most significant weakness is zero domain authority. No external links means Google has no third-party validation of the site's relevance or trustworthiness. This is the primary reason Lintel NY does not rank.

---

### 15.1 Citation Building (Immediate)

Submit to all directories listed in Section 7.5. Each approved listing creates a backlink and NAP citation, both of which improve local rankings.

**Most impactful directory backlinks for a contractor:**
- Houzz (very high DA; contractor profile links are followed)
- Angi / HomeAdvisor (high DA, high local relevance)
- BBB (trust signal + DA)
- Yelp (high DA in NYC)

---

### 15.2 Local Press and Link Outreach

**Target publications:**
- Brooklyn Eagle, Queens Chronicle, Bronx Times, Staten Island Advance
- Brick Underground (NYC real estate blog — very relevant, high DA)
- Brownstoner (Brooklyn-focused renovation blog)
- NYCurbed / Curbed NY
- Streeteasy blog (co-op/condo renovations)
- NYT Real Estate section (aspirational)

**Strategy:** Pitch as a source for renovation and contractor content. Examples:
- "Licensed contractor shares 5 things to check before hiring for a co-op renovation"
- "What Brooklyn brownstone owners should know before renovating in 2026"

---

### 15.3 Case Study & Project Coverage

Once real project case studies exist:
- Submit before/after stories to Houzz (they feature standout projects)
- Submit to Brownstoner's community features
- Pitch to Brick Underground as an example renovation
- Post on Instagram/Pinterest with proper tagging (generates referral traffic + social proof)

---

### 15.4 Industry Directories and Associations

- Join NARI (National Association of the Remodeling Industry) — provides a member directory backlink
- Join NAHB (National Association of Home Builders) — member directory
- NYC Chamber of Commerce — local credibility
- Brooklyn Chamber of Commerce (if Brooklyn is a primary market)

---

### 15.5 Supplier / Partner Backlinks

- If the business works with specific material suppliers (tile, plumbing, electrical), ask to be listed on their contractor/dealer locator pages.
- If the business has completed work in specific co-op or condo buildings, ask the building management or HOA if they have a preferred vendor page.

---

### 15.6 Content-Based Link Acquisition

High-quality blog content (Section 11) can attract natural backlinks:
- Cost guides are frequently linked to by real estate agents, interior designers, and architects
- Permit guides are linked to by NYC legal and real estate blogs
- The alteration checklist page is linkable from co-op/condo community forums and boards

Promote published articles via:
- LinkedIn (Saif Anwar personal profile — share as contractor expertise)
- Nextdoor (neighborhood-specific posts about renovation tips)
- Reddit (r/nyc, r/Brooklyn, r/renovations — helpful answers with link to the full guide)

---

## 16. 30/60/90-Day Action Plan

---

### 30-Day Plan — Fix, Track, and Launch

**Developer (2–3 days of work):**
- [ ] Install Google Analytics 4 + Google Tag Manager
- [ ] Update CSP headers to allow GA4 + GTM
- [ ] Fix the cost calculator error and add fallback UX
- [ ] Add `noindex` to gallery page and remove from sitemap
- [ ] Add FAQPage schema to all trust pages
- [ ] Add FAQPage schema to all location pages
- [ ] Verify and fix the `.html` redirect chain in Netlify
- [ ] Add `/trust/:name.html` redirect rule to netlify.toml
- [ ] Update sitemap lastmod dates or remove them
- [ ] Set up Google Search Console and submit sitemap
- [ ] Add click-to-call `tel:` tracking to phone links

**Business Owner (ongoing):**
- [ ] Establish confirmed business address (or registered mail service)
- [ ] Update schema address across all pages
- [ ] Create and verify Google Business Profile
- [ ] Set GBP primary and secondary categories
- [ ] Upload 20 photos to GBP
- [ ] Write GBP business description
- [ ] Submit to Tier 1 directories (Google, Bing, Apple, Yelp, Houzz, Angi)

**Content Writer (30 days):**
- [ ] Publish Blog Article 1: Kitchen Remodel Cost NYC
- [ ] Publish Blog Article 2: Bathroom Renovation Cost NYC
- [ ] Publish Blog Article 3: What Is an Alteration Agreement?
- [ ] Write 3–5 real project case studies (brief text profiles)

---

### 60-Day Plan — Build Authority and Content

**Developer:**
- [ ] Build /services/ hub page
- [ ] Build /locations/ hub page
- [ ] Update nav links to point to hub pages
- [ ] Add sticky mobile CTA bar (phone + estimate button)
- [ ] Add visible breadcrumb navigation to all pages
- [ ] Upgrade service page H1s (see Section 8.2)
- [ ] Run PageSpeed Insights and fix LCP/CLS issues
- [ ] Add OG images per service (5 unique images)

**Business Owner:**
- [ ] Actively solicit first 10 Google reviews from past clients
- [ ] Submit to Tier 2 directories (see Section 7.5)
- [ ] Publish 1 GBP Post per week (4 posts in 30 days)
- [ ] Add real client testimonials to homepage and service pages
- [ ] Resolve the physical address / placeholder schema issue definitively

**Content Writer:**
- [ ] Publish Blog Articles 4–8 (see priority list, Section 11.2)
- [ ] Add "Recent from the Journal" section to homepage with 3 latest articles
- [ ] Expand location page content to 1,200+ words for Brooklyn, Manhattan, Queens
- [ ] Expand service page FAQs from 3 to 8+ questions each

**SEO Specialist:**
- [ ] Conduct keyword gap analysis against top 3 competitors
- [ ] Review GSC Coverage report for crawl errors
- [ ] Review initial keyword impression data in GSC
- [ ] Begin outreach to local directories (Tier 2 and 3)
- [ ] Begin link outreach to local press (2–3 pitches)

---

### 90-Day Plan — Scale Content and Local Presence

**Developer:**
- [ ] Build dynamic blog sitemap (sitemap-blog.xml)
- [ ] Implement AggregateRating schema (once 10+ reviews exist)
- [ ] Build 5 real project case study pages (/projects/)
- [ ] Launch gallery with 5+ real project profiles
- [ ] Remove noindex from gallery page after content launch
- [ ] Implement exit intent CTA on service pages
- [ ] A/B test short form vs. long form on contact page

**Business Owner:**
- [ ] Join NARI or NAHB for member directory backlink
- [ ] Join Brooklyn and/or NYC Chamber of Commerce
- [ ] Reach 20+ Google reviews
- [ ] Verify GBP insights: which queries, calls, and directions requests are coming in

**Content Writer:**
- [ ] Publish Blog Articles 9–15 (complete initial 15-article foundation)
- [ ] Expand Nassau County, Suffolk County, Bronx, Staten Island location pages
- [ ] Write 3–5 additional case studies linked from service and location pages

**SEO Specialist:**
- [ ] Track keyword ranking progress for target terms (GSC + third-party tool)
- [ ] Submit to NARI, BBB, and remaining Tier 3 citations
- [ ] Begin content-based link outreach (Brick Underground, Brownstoner)
- [ ] Review and optimize GBP based on 90-day performance data
- [ ] Identify any new crawl issues from GSC

---

## 17. Developer Checklist

See the companion file: `/docs/lintelny-developer-seo-checklist.md`

---

## 18. Final Diagnosis

Lintel NY has the right bones: clean code, solid content framework, genuine trust signals, and a clear positioning strategy. The service pages are better than most contractor sites. The trust/policy documentation is a real competitive differentiator. The structured data is partially implemented and correctly formatted.

But the site is invisible because it is brand new, has no external signals, and has not published a single piece of content that Google can index and rank. The three empty or broken pages — the Journal, the gallery, and the cost calculator — are not minor gaps. They are the primary conversion and authority-building tools on the site, and they are not working.

**The fundamental ranking problem is not technical. It is a content and authority problem.**

The technical infrastructure is sound. The canonical tags, redirects, and Netlify configuration are properly set up. The schema, while incomplete in places, is implemented correctly where it exists. There is no penalty, no crawl block, no canonical loop, no redirect chain issue causing the site to fail. Google simply has not been given enough reasons to trust or rank this site yet.

**What will move the needle, in order of impact:**

1. **Google Business Profile — verified and optimized.** This is the single most impactful action for local contractor visibility. It takes the business from invisible to present in the Local Pack.

2. **10 blog articles published in 30 days.** Long-tail content is the fastest path to organic traffic for a new site. A well-structured article targeting "bathroom renovation cost NYC 2026" can rank in the top 10 within 2–3 months.

3. **10 Google reviews within 60 days.** Reviews affect GBP ranking directly and convert hesitant visitors.

4. **25 citations submitted.** Each citation is a trust vote for the local algorithm.

5. **5 real project case studies.** The gallery page is an active conversion killer right now. Three before/after case studies with real project details would transform it.

6. **Fix the calculator.** It's in the navigation, highlighted across the site, and broken. Every click it receives is a lead lost.

7. **Confirmed business address in schema and GBP.** The placeholder is a live liability.

Execute this plan in the order of the 30/60/90-day timeline, and the site has a realistic path to page 1 for local contractor terms within 6 months and for competitive service terms within 9–12 months.

---

*Prepared by: External Technical SEO Audit*  
*Based on: Live website crawl and HTML source inspection (May 2026), public Google search visibility snapshot*  
*Not included: Google Search Console data, Google Analytics data, hosting server logs, third-party backlink data. These should be obtained and reviewed alongside this report.*
