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

## Before you launch — swap these placeholders

Search the HTML for `PLACEHOLDER` and `SAMPLE` comments; they mark every spot.

1. **Founder name & bio** — `[Founder Name]` on the homepage and About page.
2. **Phone** — `(205) 555-0100` (and `tel:2055550100`) in the footer of every
   page and on the Contact page.
3. **Address** — `123 Main Street, Suite 2, Homewood, Alabama 35209` in every
   footer and the Contact info band.
4. **Email** — `hello@cbconstruction.example` on the Contact page.
5. **License number** — `[License #]` in every footer's bottom bar.
6. **Testimonials** — every quote is attributed to "Sample Client" and marked
   with `SAMPLE TESTIMONIAL` comments. Replace with real reviews (with
   permission) before launch — publishing fake reviews can violate FTC rules.
7. **Social links** — footer Instagram/Facebook/Google links and the Instagram
   strip tiles point to `#`. Point them at real profiles or remove them.
8. **Blog numbers** — the deck-cost article uses broad illustrative ranges
   (marked `PLACEHOLDER COPY`). Review against your real pricing.

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
