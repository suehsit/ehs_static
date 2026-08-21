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

Five links had been broken on the *live* site and are now fixed: `field--safety` and a truncated Fire Marshal's Office URL, both stale aliases that 404'd in production; plus three in client-side templates — a training path that never matched its own post type, a pre-migration Drupal path, and a program-area link missing the HTML-entity strip its sibling page applies to identical data.

**31 external links were repaired.** The homepage-repointing pass had also inserted `/index.html` into outside URLs that had no path of their own, turning `https://starsexpress.stanford.edu/?ref=…` into `https://starsexpress.stanford.edu/index.html?ref=…`. STARS is where every training page's Register button goes, and it was broken on 14 of them. Nineteen other external URLs that genuinely end in `index.html`, on CDC and DEA, were left alone.

### The client-rendered half

The count above is every link present in the HTML as delivered. Fourteen landing pages — Topics, Roles, Training, Manuals, Services, Forms & Tools, News, Learning Library, References and the Safety Store — plus all 15 manuals build their result lists and chapter navigation from JSON embedded in the page, so their links exist only after JavaScript runs. A static link check cannot see them, and the earlier relativisation pass had missed them for the same reason.

**82 root-absolute links found and fixed.** 51 were real navigation, relativised with the correct `../` depth — including 23 in manual sub-pages two and three levels deep, where the path is assembled from a runtime placeholder. 31 turned out not to be links at all: WordPress facet-checkbox markup whose hrefs pointed at paths that never existed on any version of the site, and whose clicks are intercepted anyway.

**Every section link on every manual landing page was broken**, in a way only a static archive would trigger. They were built as `window.location.pathname + '/' + slug`, which was right when the page answered at `/manual/biosafety-manual` but produces `/manual/biosafety-manual.html/animal-housing` once the extension is part of the path. Now derived from the filename instead, which holds at the domain root, on a subpath and over `file://`. All 344 declared section links have a correct path shape.

**Every topic icon on 11 pages was broken**, and this one was self-inflicted: the relativisation pass had rewritten the icon base URL from a directory into a file, so the JavaScript that appends filenames to it produced `…/topics/index.htmlanimal-safety.png`. Two more icons on the Topics page were still loading from production.

Verified by loading the archive's own functions into Node and resolving every generated link against disk: 23 of 23 topic links now resolve, up from 20, and every mirrored Biosafety Manual section is reachable from its manual.

### Images display correctly

**32,121 image references, 5 broken** — and the 5 are decorative.

The crawl left every `srcset` pointing at absolute production URLs, 27,700 of them naming thumbnail sizes that were never downloaded. Because browsers don't fall back from a failed `srcset` candidate to `src`, those would have rendered as broken images beside perfectly good local files. All were pruned or relativised.

That count covered `src` and `srcset`. Widening it to any attribute found **2,368 more references still pointing at production** — the WooCommerce gallery's `data-thumb`, `data-large_image` and `data-src` across roughly 1,180 Safety Store pages, plus the 13 role tiles on the Roles page. A local file existed for every one. Thumbnails were repointed to the mirrored `-300x300` size rather than the full-size original, and all 1,177 zoom images were checked against the dimensions their own markup declares: every one matches.

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

**710 detail pages are missing** — the largest single gap in the archive, and the one thing here that cannot be fixed by editing files.

| Section | Present | Referenced | Missing |
|---|---|---|---|
| `/manual` + sections | 36 | 370 | **334** |
| `/reference` | 41 | 163 | **122** |
| `/forms-tools` | 79 | 159 | **80** |
| `/news` | 4 | 64 | **60** |
| `/training` | 17 | 71 | **54** |
| `/services` | 16 | 46 | **30** |
| `/learning-library` | 5 | 35 | **30** |

The cause is the same blind spot described above, one layer up. HTTrack finds pages by following links in the HTML. These detail pages were only ever linked from JavaScript-generated result lists, so the crawler never saw them and never fetched them. The tell: 19 of 20 sampled reference pages that *are* present are also linked by an ordinary href somewhere else in the site — which is how they got captured.

The landing-page catalogues hold each item's title, teaser, type and topic tags, but not its body text, so **the content is not recoverable from anything on disk.** `MISSING-PAGES.md` lists all 710 with titles and paths.

If `ehs.stanford.edu` still answers, re-crawling from that list closes the gap in an hour or two and is worth trying first, because it either works or rules itself out immediately. Failing that, the catalogue metadata is enough to generate stub pages that keep the teasers and stop the 404s. `STATIC-HOSTING-AUDIT.md` §4d lays out the options.

Smaller gaps, all from crawl errors:

- 19 captured "page not found" screens were removed. Ten had inbound links, each repointed to its best real equivalent (for example, the Local Bloodborne Pathogen plan now goes to the institutional version in the Manuals).
- Five topic icons are missing, and one diagram (`D5 Gas Cylinder Corral`). Two of the icons and the diagram returned 404 during the crawl, so they are gone from production too; the other three were never requested at all, because only JavaScript names them, and may still exist on the server. The theme has no fallback icon, so two of the 23 tiles on the Topics page render a broken image.
- Five pages under `/service`, `/directions`, `/reference`, `/topic/covid-19` and `/topic/occupational-health-center` were not mirrored; a handful of links to them remain unresolved.
- Two retired topics, Health & Wellness and Weather Conditions, and 15 of the 22 program areas named in the News and Learning Library tags have no page. The program areas are internal org units — Administration, Finance, Leadership and similar — that were never published publicly.

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
- `MISSING-PAGES.md` — the 710 pages referenced by client-side links but never captured, with titles and paths
- `FORMS-INVENTORY.md` — every form found, what it did, and how it was handled
