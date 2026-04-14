# Young Contractors Website Rebuild -- Design Spec

**Date:** 2026-04-14
**Status:** Draft

## Overview

Rebuild the Young Contractors website from a single-page HTML/CSS/JS site into a modern multi-page Astro site. The goal is better UX, improved SEO through proper multi-page architecture, and room to grow. Deployed to Netlify.

## Business Context

Young Contractors Ltd is a premium tiling and stone worktop contractor based in Kent, working on high-end residential and commercial developments across London. The site needs to convey quality, professionalism, and credibility to developers and property groups.

## Tech Stack

- **Framework:** Astro (static site generator)
- **Styling:** Scoped CSS within Astro components (no CSS framework)
- **JavaScript:** Vanilla JS for interactive elements (lightbox, hamburger, FAQ accordion)
- **Forms:** Netlify Forms (existing integration, kept as-is)
- **Fonts:** Libre Baskerville (headings via Google Fonts), system sans-serif stack (body)
- **Images:** Existing WebP assets carried over from current site
- **Hosting:** Netlify (static deploy)
- **Architecture:** Hardcoded `.astro` pages (no content collections)

## Colour Palette

| Role | Colour | Hex |
|------|--------|-----|
| Background (primary) | Off White | #fafaf7 |
| Background (accent) | Warm Stone | #f0ede6 |
| Primary / CTAs | Forest Green | #3c5544 |
| Primary hover | Dark Green | #2e4038 |
| Text (headings) | Charcoal | #2d2d2d |
| Text (body) | Dark Grey | #555555 |
| Footer background | Charcoal | #2d2d2d |
| Footer text | Light Grey | #cccccc |

## Typography

- **Headings:** Libre Baskerville (serif), loaded via Google Fonts
- **Body:** System sans-serif stack (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- **Scale:** Responsive sizing, base 1rem body, headings 1.2rem--2.5rem depending on context

## Sitemap

```
/                     Home
/about                About Us
/services             Services (all three categories)
/projects             Projects overview (grid of all projects)
/projects/royal-mint-gardens        Individual project page
/projects/chelsea-waterfront        Individual project page
/projects/york-place                Individual project page
/projects/premier-place             Individual project page
/projects/riverstone-fulham         Individual project page
/gallery              Image gallery with lightbox
/testimonials         Client testimonials (placeholder content)
/faq                  Frequently asked questions (placeholder content)
/contact              Contact form + details
```

## Shared Layout

### Header / Navigation
- Logo (existing `logo-young-contractors.webp`) aligned left
- Horizontal nav links: Home, About, Services, Projects, Gallery, Testimonials, FAQ
- Contact styled as a green CTA button (right-aligned)
- Sticky/fixed on scroll
- Mobile: hamburger menu toggle below 768px, full-screen or slide-out nav overlay

### Footer
- Dark charcoal (#2d2d2d) background
- Left column: company name, phone (07931 216828), email (danny@youngcontractors.co.uk), address
- Right column: quick links to all pages, certification logos (Tile Association, RB Services), Instagram link
- Copyright: &copy; 2026 Young Contractors Ltd

## Page Designs

### Home (`/`)

Sections in order:

1. **Hero:** Full-screen background image (existing project photo) with dark overlay. Headline: "Premium Tiling & Stone Specialists". Subtitle about craftsmanship. Two CTAs: "View Our Projects" (green solid) and "Get In Touch" (white outline).

2. **Intro snippet:** Two-column layout. Left: 2-3 sentence company intro drawn from existing About content, with "Learn More About Us" link. Right: featured project image.

3. **Services overview:** Warm stone background. Three cards (Tiling Solutions, Fabrication, Repair & Maintenance) with icon circles, short descriptions. "View All Services" link below.

4. **Featured Projects:** Three project cards in a row (Royal Mint Gardens, Chelsea Waterfront, York Place). Each has project photo, name, key stat. "View All Projects" link below.

5. **Why Choose Us:** Dark charcoal background. Stats/credentials: years experience, units completed, TTA certification. Compact cards with green accent numbers.

6. **Testimonial teaser:** Single featured placeholder quote, client name, company. "Read More Testimonials" link.

7. **CTA banner:** Forest green background. "Ready to Start Your Project?" headline, subtitle, white "Contact Us" button.

### About (`/about`)

- Company story section with heading, paragraphs drawn from existing content (heritage, expertise, commitment to quality)
- Featured image (existing kitchen/project photo) alongside text
- Values or approach section (craftsmanship, reliability, quality materials)
- Certification badges (Tile Association, RB Services)

### Services (`/services`)

Three category sections, each with a heading and grid of service cards:

**Tiling Solutions:**
- Residential Tiling
- Retail Tiling
- Leisure Tiling
- Commercial Tiling
- Wet Room Systems
- Pedestal Systems (terraces/balconies)

**Fabrication Services:**
- Kitchen Tops & Splashbacks
- Vanity Tops

**Repair & Maintenance:**
- Stone repair, polishing, anti-slip treatment

Each card has a title, brief description, and optional icon. Content drawn from existing site.

### Projects (`/projects`)

- Grid layout of all 5 project cards
- Each card: project photo, name, client, unit count
- Cards link to individual project pages

### Individual Project Pages (`/projects/[name]`)

- Hero image (existing project photo)
- Project name, client name, unit/scope count
- Brief description paragraph
- Image gallery (subset of existing images relevant to project)
- "Back to Projects" link
- "Next Project" / "Previous Project" navigation

### Gallery (`/gallery`)

- Responsive CSS grid of all project/showcase images (existing 8-9 WebP images)
- `auto-fit, minmax(300px, 1fr)` grid sizing
- Click to open lightbox (vanilla JS modal overlay with close button)
- Image hover effect (subtle scale)

### Testimonials (`/testimonials`)

- Grid of testimonial cards (3 columns desktop, 1 mobile)
- Each card: quote text, client name, company/role
- All placeholder content for now
- 4-6 placeholder testimonials

### FAQ (`/faq`)

- Accordion-style expandable sections (vanilla JS click-to-toggle)
- Placeholder questions covering:
  - What areas do you cover?
  - What types of tiling do you offer?
  - Do you provide free quotes?
  - How long does a typical project take?
  - What materials do you work with?
  - Are you certified/insured?
- Each item: question as the clickable header, answer revealed on expand

### Contact (`/contact`)

- Two-column layout
- Left: Netlify form (name, email, phone (new field), message) with `data-netlify="true"`
- Right: contact details (phone, email, address), possibly a static map embed later
- Form validation via HTML5 required attributes
- Submit button styled in forest green

## Responsive Approach

- Mobile-first CSS
- Breakpoint at 768px for tablet/desktop
- Navigation collapses to hamburger on mobile
- Grids collapse to single column on mobile
- Hero text scales down, CTAs stack vertically
- Footer stacks to single column on mobile

## SEO

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Unique `<title>` and `<meta description>` per page
- Proper heading hierarchy (single `<h1>` per page)
- Image `alt` attributes on all images
- Open Graph meta tags for social sharing
- Sitemap generated by Astro

## Assets

All existing images carried over from `img/` directory:
- `logo-young-contractors.webp` -- site logo
- `instagram.png` -- social icon
- 5x project property images
- 8x gallery/showcase images
- 2x certification logos (Tile Association, RB Services)
- `favicon.ico`

## Project Structure

```
YoungContractors/
├── public/
│   ├── favicon.ico
│   └── img/           (all existing images moved here)
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ServiceCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── TestimonialCard.astro
│   │   ├── FaqItem.astro
│   │   ├── Lightbox.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   (shared head, nav, footer)
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── services.astro
│       ├── projects/
│       │   ├── index.astro
│       │   ├── royal-mint-gardens.astro
│       │   ├── chelsea-waterfront.astro
│       │   ├── york-place.astro
│       │   ├── premier-place.astro
│       │   └── riverstone-fulham.astro
│       ├── gallery.astro
│       ├── testimonials.astro
│       ├── faq.astro
│       └── contact.astro
├── astro.config.mjs
└── package.json
```

## Out of Scope

- CMS integration (can be added later)
- Blog/news section
- Analytics/tracking (can be added post-launch)
- Custom domain setup
- Email service integration beyond Netlify Forms
- Animation libraries (keep it lightweight)
