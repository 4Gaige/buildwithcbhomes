# CB Built Homes — Website

A complete static website for CB Built Homes: Birmingham-area painting,
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

The site now uses **CB Built Homes' own project photos** (from Joseph),
stored web-optimized in `assets/photos/` — 20 images, EXIF-corrected, resized to
~1600px, ~5.6 MB total. The stock imagery and its footer disclosure have been
removed. To add more photos later, drop optimized JPEGs into `assets/photos/`
and reference them the same way. The retired hand-drawn illustrations remain in
`assets/retired-illustrations/` and can be deleted.

## Content status (updated 2026-09-04)

Real business details are now live: CB Built Homes, owners Joseph
Capra & Connor Barnett, (205) 383-7177, info@buildwithcbhomes.com, Cahaba
Heights AL, real customer testimonials (Mike, Valerie, Bill), and real social
links (Instagram/Facebook/TikTok).

Done:

1. **Licensed & Insured** — footer copyright on all pages, the How We Work
   block on about.html, and the commercial/services bullet now say
   "Licensed & Insured". No license number is published; documentation is
   available on request.
2. **Instagram strip links** — the 7 footer photo tiles now go to
   instagram.com/cbbuilthomes.

Still to do:

1. **Contact form backend** — still a demo; wire to Formspree (below).
2. **Blog numbers** — the deck-cost article uses broad illustrative ranges
   (marked `PLACEHOLDER COPY`). Review against real pricing.
3. **More photos** — 20 of Joseph's photos are in use; the rest of the batch
   can be added anytime for a deeper gallery.

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
