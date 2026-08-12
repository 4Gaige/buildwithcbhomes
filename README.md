# CB Construction — Website

A complete static website for CB Construction: Birmingham-area painting,
fences, decks, and remodeling — growing toward custom home construction.
Designed in an editorial, photography-forward style: white pages, high-contrast
display serif, warm greige bands.

**To view it:** open `index.html` in any browser. Internet access is needed for
the fonts and photos (both are hotlinked; see "Photography" below).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — photo slider, welcome, tiles, founder card, rotating testimonials, blog, galleries carousel, service area, CTA, Instagram strip |
| `about.html` | Philosophy hero, About CB, Now/Next/The Goal roadmap, founder story, how we work |
| `services.html` | Six service blocks + four-step process |
| `portfolio.html` | Editorial offset project grid with lightbox |
| `blog.html` | The Journal — post list + newsletter signup |
| `posts/*.html` | Three complete starter articles |
| `contact.html` | Estimate request form + office info |

## Photography

All photos are **hotlinked from Unsplash** (free license, no attribution
required). Nothing is stored locally, so:

- The site needs internet access to display images.
- Before launch, replace them with your own project photos — either swap the
  `images.unsplash.com` URLs for local files (e.g. `assets/photos/deck-1.jpg`),
  or keep any Unsplash shots you like (their license permits commercial use).
- The footer carries a line disclosing that photography is representative
  stock imagery — remove it once your own photos are in.
- There are no true fence/deck close-ups in the current set (the Outdoor
  Living slots use a backyard scene) — prioritize real photos there first.
- The original hand-drawn illustrations from the previous design are kept in
  `assets/retired-illustrations/` in case you want them; nothing references
  them, and the folder can be deleted.

## Content status (updated 2026-08-12)

Real business details are now live: CB Construction Partners, owners Joseph
Capra & Connor Barnett, (205) 383-7177, info@buildwithcbhomes.com, Cahaba
Heights AL, real customer testimonials (Mike, Valerie, Bill), and real social
links (Instagram/Facebook/TikTok).

Still to do:

1. **License** — the site says "Insured" only, per the owners. When the
   Alabama license is issued, update the footer bottom bar (all 9 pages) and
   the "Insured" block on about.html to "Licensed & Insured" + the number.
2. **Real job photos** — Joseph sent ~24 photos by email; swap them in for
   the Unsplash stock images (hero, portfolio, galleries, Instagram strip)
   and then remove the "representative stock imagery" line in the footer.
3. **Instagram strip links** — tiles still point to `#`; link them to real
   posts or the profile.
4. **Blog numbers** — the deck-cost article uses broad illustrative ranges
   (marked `PLACEHOLDER COPY`). Review against real pricing.

## Make the contact form real

Forms currently show a thank-you message with an honest "nothing was sent"
note (`data-demo-form` in `js/site.js`). To receive submissions:

- **Formspree** — create a free form at formspree.io, change the form tag to
  `<form action="https://formspree.io/f/YOUR_ID" method="POST">`, and remove
  the `data-demo-form` attribute (this also removes the preview note).
- **Netlify Forms** — if hosting on Netlify, add the `netlify` attribute
  to the form tag instead.

## Hosting

Any static host works (Netlify, Vercel, GitHub Pages, registrar hosting).
Upload the folder; `index.html` is the entry point.

## Design notes

- Fonts (Google Fonts): **Bodoni Moda** (display headings, italic accents),
  **Cormorant Garamond** (body serif), **Jost** (letterspaced caps).
- Palette (CSS variables in `css/styles.css`): ink `#1c1c1c`, body navy
  `#29455f`, greige bands `#f2efe9` / `#eae5de`, form fields `#f4efe8`,
  slate `#54708b`, navy `#0b3150`, red-orange accent `#d9502e`.
- Interactions in `js/site.js` (no frameworks): hero photo slider, rotating
  numbered testimonials, galleries carousel with 01/04 counter, portfolio
  lightbox, mobile menu, scroll reveals, demo form handling.
