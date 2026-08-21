# Stanford EH&S — Static Archive

A static snapshot of `ehs.stanford.edu`, prepared for temporary hosting on GitHub Pages at the same domain while the production site is offline.

Captured with HTTrack on 20 August 2026 · **1,948 pages · 4,067 files · 581 MB**

---

## What was improved

The archive is in better shape than the crawl it came from — and in a few respects, better than the site it copied.

### Links now resolve

| | |
|---|---|
| Internal references checked | 204,579 |
| Broken | **6** |

The raw crawl left thousands of links pointing at the live server or at HTTrack's own scaffolding. All of them were rewritten to relative paths:

- **7,478** links to the homepage repointed after promoting the real page to `index.html`
- **6,671** site-root-absolute links (`/about-us`) converted to working relative paths
- **620** asset references repaired — HTTrack had saved these files under hashed names but never updated the pages that used them
- **495** redirect stubs removed and their references cleaned up

Two links had been broken on the *live* site and are now fixed: `field--safety` and a truncated Fire Marshal's Office URL, both stale aliases that 404'd in production. They now reach the real pages.

### Images display correctly

**32,121 image references, 5 broken** — and the 5 are decorative.

The crawl left every `srcset` pointing at absolute production URLs, 27,700 of them naming thumbnail sizes that were never downloaded. Because browsers don't fall back from a failed `srcset` candidate to `src`, those would have rendered as broken images beside perfectly good local files. All were pruned or relativised.

### JavaScript works

**7,678 subresources upgraded from `http://` to `https://`.** jQuery alone was loading over plain HTTP on 1,906 pages; on an HTTPS host the browser blocks it, which would have taken down most interactive JavaScript sitewide.

A second, better-hidden instance of the same problem — 127 escaped `http://` image references inside client-rendered JSON — was also fixed.

### Documents are served locally

57 embedded PDFs and documents previously rendered through Google Docs Viewer and Office Online, which required those services to reach the domain. All now embed the local file directly. No third-party dependency.

### Old URLs still work

Every page answers its original extensionless WordPress URL. GitHub Pages resolves `/about-us` to `about-us.html` automatically, and 39 `index.html` stubs cover the directories that would otherwise have been ambiguous. `/about-us`, `/about-us/` and `/about-us.html` all reach the same page.

### Markup is clean

- **6,016** stray `</p>` tags removed (each was rendering as an empty paragraph)
- **0** stray or unclosed tags across all 1,948 pages
- **0** HTTrack comments, scaffolding or artefacts remaining

### Security issues resolved

- HTTP Basic Auth credentials that HTTrack had baked into 159 files — removed (and the credential rotated)
- 3,853 SAML login links whose `RelayState` exposed internal origin ports (12093, 12169, 12171) — removed

---

## What differs from the live site

A static host cannot run code or store data, so anything that needed a server had to change.

### Removed

| Feature | Why | What visitors see |
|---|---|---|
| **Site search** | Needed the WordPress backend | Search box removed from the header |
| **Add to cart / checkout** | No commerce backend | Product pages remain a browsable catalogue with a contact line |
| **Log In (SUNet SSO)** | Signatures were environment-specific and expired | Menu item removed |
| **Product sort dropdown** | Needed server-side sorting | Removed; products still list |
| **Video like/dislike** | Votes couldn't persist | Buttons removed; view counts kept as a snapshot |
| **Favorites, page-visit tracking, `wp-admin`** | Server-dependent or obsolete | No visible change |

### Changed to email

Following the wording EH&S already used elsewhere on the site for disabled forms:

- **720 product and cart pages** — *"To order this item please contact us at ehswebteam@lists.stanford.edu."*
- **Request a consultation** — now a `mailto:` link
- **Glossary term submission** — was a captured "page not found" screen; now a real page with a contact route

### Content gaps

Some material was never captured because it returned an error during the crawl:

- 19 captured "page not found" screens were removed. Ten had inbound links, each repointed to its best real equivalent (for example, the Local Bloodborne Pathogen plan now goes to the institutional version in the Manuals).
- Three topic icons and one diagram (`D5 Gas Cylinder Corral`) were never downloaded and are absent from production too.
- Five pages under `/service`, `/directions`, `/reference`, `/topic/covid-19` and `/topic/occupational-health-center` were not mirrored; a handful of links to them remain unresolved.

---

## What still works

- **Client-side filtering on 31 pages** — Glossary, References, Training, Forms & Tools, Learning Library, News, Manuals, Services, Staff and the Safety Store all filter their own content as you type, with no server needed. This meaningfully offsets the loss of global search.
- **External systems**, all unaffected: SU-17 incident reporting, ChemTracker, WasteTag, Qualtrics, Smartsheet, Google Forms, Zingtree decision trees, Stanford campus maps
- **All PDFs, images and documents** — 323 MB of local files
- **Google Tag Manager** — retained, so archive traffic appears in analytics
- **`wp-json/`** — retained

---

## Hosting notes

- **`.nojekyll`** is present. It stops GitHub Pages running Jekyll over 4,067 files on every deploy, and guarantees files are served exactly as committed.
- **`CNAME`** must contain `ehs.stanford.edu`, set through the repository settings.
- **Start a fresh repository with no history.** The site is 581 MB against GitHub Pages' 1 GB limit; committing it twice would approach the ceiling. Do not use Git LFS — Pages does not serve LFS objects.
- **Bandwidth** is capped at 100 GB/month (soft). With 323 MB of PDFs, sustained traffic could approach it.
- Largest single file is 57 MB (`2201_EHS_Biosafety_Manual_v6-final.pdf`), under the 100 MB per-file limit.

---

## Further detail

- `STATIC-HOSTING-AUDIT.md` — full audit, findings and verification counts
- `FORMS-INVENTORY.md` — every form found, what it did, and how it was handled
