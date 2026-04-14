# Young Contractors Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Young Contractors single-page HTML site into a modern multi-page Astro site with improved UX, SEO, and new Testimonials/FAQ pages.

**Architecture:** Static Astro site with hardcoded `.astro` pages (no content collections). Scoped CSS per component, vanilla JS for interactivity (lightbox, hamburger, FAQ accordion). Netlify Forms for contact. Existing WebP images carried over.

**Tech Stack:** Astro, scoped CSS, vanilla JS, Netlify Forms, Google Fonts (Libre Baskerville)

**Design Spec:** `docs/superpowers/specs/2026-04-14-website-rebuild-design.md`

---

## File Structure

```
YoungContractors/
├── public/
│   ├── favicon.ico
│   └── img/
│       ├── logo-young-contractors.webp
│       ├── instagram.png
│       ├── young-contractors-royal-mint-garden.webp
│       ├── young-contractors-chelsea-waterfront.webp
│       ├── young-contractors-york-place.webp
│       ├── young-contractors-premier-place.webp
│       ├── young-contractors-fulham-riverstone.webp
│       ├── young-contractors-project-img-1-scaled.webp
│       ├── young-contractors-project-img-2-scaled.webp
│       ├── young-contractors-project-img-3-scaled.webp
│       ├── young-contractors-project-img-4-scaled.webp
│       ├── young-contractors-project-img-5-scaled.webp
│       ├── young-contractors-project-img-6-scaled.webp
│       ├── young-contractors-project-img-7-scaled.webp
│       ├── young-contractors-project-img-8-scaled.webp
│       ├── young-contractors-project-installed-kitchen-top-scaled.webp
│       ├── young-contractors-the-tile-association-logo.webp
│       └── young-contractors-rb-services-logo-new.webp
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
│   │   └── BaseLayout.astro
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
├── package.json
└── tsconfig.json
```

---

## Task 1: Scaffold Astro Project and Move Assets

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`
- Move: `img/*` → `public/img/*`, `favicon.ico` → `public/favicon.ico`
- Delete after migration: `index.html`, `css/`, `js/`

- [ ] **Step 1: Initialise Astro project**

Run from `C:/Users/Rhys/YoungContractors`:

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

If prompted about overwriting, allow it. This creates `package.json`, `astro.config.mjs`, `tsconfig.json`, and a starter `src/pages/index.astro`.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Move assets to `public/`**

```bash
mkdir -p public/img
cp img/* public/img/
cp favicon.ico public/favicon.ico
```

- [ ] **Step 4: Remove old site files**

```bash
rm -rf css/ js/ img/ index.html favicon.ico
```

- [ ] **Step 5: Verify dev server starts**

```bash
npx astro dev
```

Expected: Server starts at `http://localhost:4321` and shows the default Astro starter page.

- [ ] **Step 6: Verify images are accessible**

Open `http://localhost:4321/img/logo-young-contractors.webp` in a browser. Expected: the logo image loads.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "scaffold: initialise Astro project and move assets to public/"
```

---

## Task 2: Base Layout with Header and Footer

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Header.astro`**

```astro
---
const currentPath = Astro.url.pathname;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
];
---

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="logo">
      <img src="/img/logo-young-contractors.webp" alt="Young Contractors Ltd Logo" />
    </a>
    <nav class="main-nav">
      <ul class="nav-links">
        {navLinks.map((link) => (
          <li>
            <a href={link.href} class={currentPath === link.href ? "active" : ""}>
              {link.label}
            </a>
          </li>
        ))}
        <li><a href="/contact" class="nav-cta">Contact</a></li>
      </ul>
    </nav>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </button>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #fafaf7;
    border-bottom: 1px solid #e8e4dc;
  }

  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo img {
    height: 48px;
    width: auto;
  }

  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    text-decoration: none;
    color: #555;
    font-size: 0.95rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    transition: color 0.2s;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: #3c5544;
  }

  .nav-cta {
    background: #3c5544 !important;
    color: #fff !important;
    padding: 0.5rem 1.25rem;
    border-radius: 4px;
    transition: background 0.2s !important;
  }

  .nav-cta:hover {
    background: #2e4038 !important;
  }

  .hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    flex-direction: column;
    gap: 5px;
  }

  .hamburger .line {
    display: block;
    width: 24px;
    height: 2px;
    background: #2d2d2d;
    transition: transform 0.3s, opacity 0.3s;
  }

  .hamburger.active .line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.active .line:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active .line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

    .main-nav {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #fafaf7;
      border-bottom: 1px solid #e8e4dc;
      padding: 1rem 1.5rem;
    }

    .main-nav.open {
      display: block;
    }

    .nav-links {
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>

<script>
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });
  }
</script>
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
---
const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
---

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-col">
      <h4>Young Contractors Ltd</h4>
      <p>07931 216828</p>
      <p><a href="mailto:danny@youngcontractors.co.uk">danny@youngcontractors.co.uk</a></p>
      <p>C/O Azets River House, 1 Maidstone Road, Sidcup, Kent, United Kingdom, DA14 5RH</p>
    </div>
    <div class="footer-col">
      <h4>Quick Links</h4>
      <ul>
        {quickLinks.map((link) => (
          <li><a href={link.href}>{link.label}</a></li>
        ))}
      </ul>
    </div>
    <div class="footer-col">
      <h4>Certifications</h4>
      <div class="cert-logos">
        <img src="/img/young-contractors-the-tile-association-logo.webp" alt="The Tile Association" />
        <img src="/img/young-contractors-rb-services-logo-new.webp" alt="RB Services" />
      </div>
      <div class="social">
        <a href="https://www.instagram.com/young_contractorsltd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src="/img/instagram.png" alt="Instagram" class="social-icon" />
        </a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Young Contractors Ltd. All rights reserved.</p>
  </div>
</footer>

<style>
  .site-footer {
    background: #2d2d2d;
    color: #ccc;
    padding: 3rem 1.5rem 1.5rem;
  }

  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .footer-col h4 {
    color: #fff;
    font-family: 'Libre Baskerville', Georgia, serif;
    font-size: 1.1rem;
    margin: 0 0 1rem;
  }

  .footer-col p,
  .footer-col a {
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.6;
    text-decoration: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .footer-col a:hover {
    color: #fff;
  }

  .footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-col ul li {
    margin-bottom: 0.4rem;
  }

  .cert-logos {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .cert-logos img {
    height: 48px;
    width: auto;
  }

  .social-icon {
    height: 28px;
    width: 28px;
    filter: invert(1);
    transition: opacity 0.2s;
  }

  .social-icon:hover {
    opacity: 0.7;
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 2rem auto 0;
    padding-top: 1.5rem;
    border-top: 1px solid #444;
    text-align: center;
    font-size: 0.85rem;
    color: #888;
  }

  @media (max-width: 768px) {
    .footer-inner {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .cert-logos {
      justify-content: center;
    }

    .social {
      text-align: center;
    }
  }
</style>
```

- [ ] **Step 3: Create `src/layouts/BaseLayout.astro`**

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} | Young Contractors Ltd</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={`${title} | Young Contractors Ltd`} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
</head>
<body>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</body>
</html>

<style is:global>
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #555;
    background: #fafaf7;
    line-height: 1.6;
    font-size: 1rem;
  }

  h1, h2, h3, h4 {
    font-family: 'Libre Baskerville', Georgia, serif;
    color: #2d2d2d;
    font-weight: 400;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: #3c5544;
  }

  .section-padding {
    padding: 5rem 1.5rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .section-subtitle {
    text-align: center;
    color: #888;
    font-size: 1rem;
    margin-bottom: 3rem;
  }
</style>
```

- [ ] **Step 4: Update `src/pages/index.astro` to use layout**

Replace the contents of `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home" description="Young Contractors Ltd - Premium tiling and stone worktop specialists serving London's most prestigious developments.">
  <p>Site coming soon.</p>
</BaseLayout>
```

- [ ] **Step 5: Verify layout renders**

Run `npx astro dev` and open `http://localhost:4321`. Expected: page shows the header with nav links, "Site coming soon." text, and the dark footer with contact details and certifications.

- [ ] **Step 6: Commit**

```bash
git add src/ public/
git commit -m "feat: add base layout with header, footer, and global styles"
```

---

## Task 3: Hero Component and Homepage

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/ProjectCard.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
interface Props {
  title: string;
  subtitle: string;
  backgroundImage: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const { title, subtitle, backgroundImage, primaryCta, secondaryCta } = Astro.props;
---

<section class="hero" style={`background-image: url('${backgroundImage}')`}>
  <div class="hero-overlay">
    <div class="hero-content">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {(primaryCta || secondaryCta) && (
        <div class="hero-ctas">
          {primaryCta && <a href={primaryCta.href} class="btn btn-primary">{primaryCta.label}</a>}
          {secondaryCta && <a href={secondaryCta.href} class="btn btn-outline">{secondaryCta.label}</a>}
        </div>
      )}
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .hero-overlay {
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-content {
    text-align: center;
    padding: 2rem;
    max-width: 700px;
  }

  .hero-content h1 {
    font-size: 2.8rem;
    color: #fff;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero-content p {
    color: #ddd;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: background 0.2s, border-color 0.2s;
  }

  .btn-primary {
    background: #3c5544;
    color: #fff;
  }

  .btn-primary:hover {
    background: #2e4038;
  }

  .btn-outline {
    border: 1px solid #fff;
    color: #fff;
    background: transparent;
  }

  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2rem;
    }

    .hero-ctas {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
```

- [ ] **Step 2: Create `src/components/ServiceCard.astro`**

```astro
---
interface Props {
  title: string;
  description: string;
  icon: string;
}

const { title, description, icon } = Astro.props;
---

<div class="service-card">
  <div class="service-icon">{icon}</div>
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  .service-card {
    background: #fff;
    border-radius: 8px;
    padding: 2rem 1.5rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s;
  }

  .service-card:hover {
    transform: translateY(-2px);
  }

  .service-icon {
    width: 48px;
    height: 48px;
    background: #3c5544;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.2rem;
  }

  .service-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .service-card p {
    font-size: 0.9rem;
    color: #888;
    line-height: 1.5;
  }
</style>
```

- [ ] **Step 3: Create `src/components/ProjectCard.astro`**

```astro
---
interface Props {
  name: string;
  client: string;
  units: string;
  image: string;
  href: string;
}

const { name, client, units, image, href } = Astro.props;
---

<a href={href} class="project-card">
  <div class="project-image">
    <img src={image} alt={name} loading="lazy" />
  </div>
  <div class="project-info">
    <h3>{name}</h3>
    <p>{units} &middot; {client}</p>
  </div>
</a>

<style>
  .project-card {
    display: block;
    background: #f0ede6;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    transition: transform 0.2s;
  }

  .project-card:hover {
    transform: translateY(-3px);
  }

  .project-image img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
  }

  .project-info {
    padding: 1.25rem;
  }

  .project-info h3 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .project-info p {
    color: #888;
    font-size: 0.9rem;
  }
</style>
```

- [ ] **Step 4: Build the full homepage in `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ServiceCard from '../components/ServiceCard.astro';
import ProjectCard from '../components/ProjectCard.astro';
---

<BaseLayout title="Home" description="Young Contractors Ltd - Premium tiling and stone worktop specialists serving London's most prestigious developments.">

  <Hero
    title="Premium Tiling & Stone Specialists"
    subtitle="Delivering exceptional craftsmanship for London's most prestigious residential and commercial developments."
    backgroundImage="/img/young-contractors-project-img-1-scaled.webp"
    primaryCta={{ label: "View Our Projects", href: "/projects" }}
    secondaryCta={{ label: "Get In Touch", href: "/contact" }}
  />

  <!-- Intro -->
  <section class="section-padding" style="background: #fafaf7;">
    <div class="container intro-grid">
      <div class="intro-text">
        <h2>Expert Tiling & Fabrication</h2>
        <p>At Young Contractors Ltd, we pride ourselves on being a leading tiling company specialising in the supply and installation of natural stone, porcelain, large-format tiles, and mosaic wall/floor tiling. We also offer bespoke stone worktops across residential, retail, leisure, and commercial sectors.</p>
        <a href="/about" class="text-link">Learn More About Us &rarr;</a>
      </div>
      <div class="intro-image">
        <img src="/img/young-contractors-project-img-4-scaled.webp" alt="Modern kitchen with stone worktop" loading="lazy" />
      </div>
    </div>
  </section>

  <!-- Services Overview -->
  <section class="section-padding" style="background: #f0ede6;">
    <div class="container">
      <h2 class="section-title">Our Services</h2>
      <p class="section-subtitle">What we specialise in</p>
      <div class="services-grid">
        <ServiceCard title="Tiling Solutions" description="Residential, commercial, wet rooms & more" icon="T" />
        <ServiceCard title="Fabrication" description="Kitchen tops, splashbacks & vanity units" icon="F" />
        <ServiceCard title="Repair & Maintenance" description="Polishing, restoration & anti-slip treatment" icon="R" />
      </div>
      <div class="section-link">
        <a href="/services" class="text-link">View All Services &rarr;</a>
      </div>
    </div>
  </section>

  <!-- Featured Projects -->
  <section class="section-padding" style="background: #fafaf7;">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">Trusted by leading developers across London</p>
      <div class="projects-grid">
        <ProjectCard name="Royal Mint Gardens" client="IJM Land" units="263 units" image="/img/young-contractors-royal-mint-garden.webp" href="/projects/royal-mint-gardens" />
        <ProjectCard name="Chelsea Waterfront" client="Hutchison Property Group" units="326 units" image="/img/young-contractors-chelsea-waterfront.webp" href="/projects/chelsea-waterfront" />
        <ProjectCard name="York Place" client="Avanton" units="299 units" image="/img/young-contractors-york-place.webp" href="/projects/york-place" />
      </div>
      <div class="section-link">
        <a href="/projects" class="text-link">View All Projects &rarr;</a>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="why-choose-us section-padding" style="background: #2d2d2d;">
    <div class="container">
      <h2 class="section-title" style="color: #fff;">Why Choose Us</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-number">15+</span>
          <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">1000+</span>
          <span class="stat-label">Units Completed</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">TTA</span>
          <span class="stat-label">Certified Member</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial Teaser -->
  <section class="section-padding testimonial-teaser" style="background: #fafaf7;">
    <div class="container" style="text-align: center;">
      <h2 class="section-title">What Our Clients Say</h2>
      <blockquote class="featured-quote">
        "Outstanding quality and professionalism from start to finish. Young Contractors delivered beyond our expectations on every detail."
      </blockquote>
      <p class="quote-attribution">&mdash; Client Name, Company</p>
      <a href="/testimonials" class="text-link">Read More Testimonials &rarr;</a>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="cta-banner">
    <div class="container" style="text-align: center;">
      <h2 style="color: #fff; margin-bottom: 0.5rem;">Ready to Start Your Project?</h2>
      <p style="color: #c8e4d0; margin-bottom: 1.5rem;">Get in touch for a free consultation</p>
      <a href="/contact" class="btn-cta">Contact Us</a>
    </div>
  </section>

</BaseLayout>

<style>
  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .intro-text h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .intro-text p {
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .intro-image img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    max-height: 350px;
  }

  .text-link {
    color: #3c5544;
    font-weight: 500;
    text-decoration: none;
    font-size: 0.95rem;
  }

  .text-link:hover {
    text-decoration: underline;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .section-link {
    text-align: center;
    margin-top: 2rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .stat-card {
    background: #404040;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
  }

  .stat-number {
    display: block;
    color: #3c5544;
    font-size: 2rem;
    font-weight: 700;
    font-family: 'Libre Baskerville', Georgia, serif;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    color: #ccc;
    font-size: 0.9rem;
  }

  .featured-quote {
    font-style: italic;
    color: #555;
    font-size: 1.15rem;
    line-height: 1.7;
    max-width: 600px;
    margin: 1.5rem auto;
    border: none;
    padding: 0;
  }

  .quote-attribution {
    color: #2d2d2d;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .cta-banner {
    background: #3c5544;
    padding: 4rem 1.5rem;
  }

  .btn-cta {
    display: inline-block;
    background: #fff;
    color: #3c5544;
    padding: 0.75rem 2.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;
  }

  .btn-cta:hover {
    background: #f0ede6;
  }

  @media (max-width: 768px) {
    .intro-grid {
      grid-template-columns: 1fr;
    }

    .services-grid,
    .projects-grid,
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 5: Verify homepage renders**

Run `npx astro dev`, open `http://localhost:4321`. Expected: full homepage with hero, intro, services cards, project cards, stats section, testimonial teaser, and green CTA banner. Check mobile view at 375px width -- grids should stack to single column.

- [ ] **Step 6: Commit**

```bash
git add src/
git commit -m "feat: add hero component, service/project cards, and full homepage"
```

---

## Task 4: About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About Us" description="Learn about Young Contractors Ltd - a leading tiling and stone worktop company serving London's most prestigious developments.">

  <section class="page-hero">
    <h1>About Us</h1>
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container about-grid">
      <div class="about-text">
        <h2>Our Story</h2>
        <p>At Young Contractors Ltd, we pride ourselves on being a leading tiling company that specialises in the supply and installation of natural stone, porcelain, large-format tiles, and mosaic wall/floor tiling.</p>
        <p>We also offer bespoke stone worktops in the residential, retail, leisure, and commercial sectors. With a commitment to excellence, we offer comprehensive supply and installation services designed to meet the unique needs of each of our clients.</p>
      </div>
      <div class="about-image">
        <img src="/img/young-contractors-project-installed-kitchen-top-scaled.webp" alt="Installed stone kitchen worktop" loading="lazy" />
      </div>
    </div>
  </section>

  <section class="section-padding" style="background: #f0ede6;">
    <div class="container">
      <h2 class="section-title">Our Approach</h2>
      <div class="values-grid">
        <div class="value-card">
          <h3>Relationships First</h3>
          <p>We believe in building strong, lasting relationships with our clients. Your satisfaction is our top priority, and we strive to exceed your expectations in every project.</p>
        </div>
        <div class="value-card">
          <h3>Expert Craftsmanship</h3>
          <p>Our experienced craftsmen are meticulous in their work, delivering precise and immaculate results that stand the test of time.</p>
        </div>
        <div class="value-card">
          <h3>High-Quality Service</h3>
          <p>We are dedicated to providing quick, high-quality service. Our skilled team uses only the best materials and techniques to ensure a high-end finish on every job.</p>
        </div>
        <div class="value-card">
          <h3>Commercially Competitive</h3>
          <p>Leveraging our extensive industry connections, we are in a favourable position to offer our clients the best value and superior service.</p>
        </div>
        <div class="value-card">
          <h3>Comprehensive Solutions</h3>
          <p>From the initial consultation to the final installation, we handle every aspect of your tiling and fabrication needs, ensuring a seamless and hassle-free experience.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container certs-section">
      <h2 class="section-title">Certifications & Affiliations</h2>
      <div class="certs-row">
        <img src="/img/young-contractors-the-tile-association-logo.webp" alt="The Tile Association" />
        <img src="/img/young-contractors-rb-services-logo-new.webp" alt="RB Services" />
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .page-hero {
    background: #2d2d2d;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .page-hero h1 {
    color: #fff;
    font-size: 2.5rem;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
  }

  .about-text h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .about-text p {
    line-height: 1.8;
    margin-bottom: 1rem;
  }

  .about-image img {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    max-height: 400px;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .value-card {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .value-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .value-card p {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .certs-row {
    display: flex;
    justify-content: center;
    gap: 3rem;
    align-items: center;
    margin-top: 1.5rem;
  }

  .certs-row img {
    height: 64px;
    width: auto;
  }

  @media (max-width: 768px) {
    .about-grid {
      grid-template-columns: 1fr;
    }

    .values-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Verify about page renders**

Open `http://localhost:4321/about`. Expected: page hero with "About Us" title, story section with image, values grid, and certifications.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add about page with company story, values, and certifications"
```

---

## Task 5: Services Page

**Files:**
- Create: `src/pages/services.astro`

- [ ] **Step 1: Create `src/pages/services.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Services" description="Expert tiling solutions, stone fabrication, and repair services from Young Contractors Ltd.">

  <section class="page-hero">
    <h1>Our Services</h1>
  </section>

  <!-- Tiling Solutions -->
  <section class="section-padding" style="background: #fafaf7;">
    <div class="container">
      <h2 class="section-title">Tiling Solutions</h2>
      <p class="section-subtitle">Expert tiling for every sector and application</p>
      <div class="services-grid">
        <div class="service-card">
          <h3>Residential Tiling</h3>
          <p>Transform your project with our expert tiling services, whether it's for a new bathroom, kitchen, or any other living space.</p>
        </div>
        <div class="service-card">
          <h3>Retail Spaces</h3>
          <p>Create stunning retail environments that attract customers and enhance your brand with our custom tiling solutions.</p>
        </div>
        <div class="service-card">
          <h3>Leisure Facilities</h3>
          <p>Enhance the aesthetic appeal and functionality of your leisure spaces with our durable and stylish tiles.</p>
        </div>
        <div class="service-card">
          <h3>Commercial Properties</h3>
          <p>Optimise your commercial spaces with our high-quality tiling that combines beauty with practicality, ensuring cost-effectiveness and efficiency.</p>
        </div>
        <div class="service-card">
          <h3>Wet Room Systems</h3>
          <p>Using top-of-the-range materials, waterproofing your bathroom correctly is vital to a long-lasting area.</p>
        </div>
        <div class="service-card">
          <h3>Tiled Pedestal System</h3>
          <p>Tiled terraces and balconies are an ever-present requirement. We can use our metal frame system or pedestals to create your perfect space.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Fabrication Services -->
  <section class="section-padding" style="background: #f0ede6;">
    <div class="container">
      <h2 class="section-title">Fabrication Services</h2>
      <p class="section-subtitle">Bespoke stone worktops and surfaces</p>
      <div class="services-grid services-grid-2">
        <div class="service-card">
          <h3>Kitchen Tops, Splashbacks & Bespoke Items</h3>
          <p>From templating to installation, we deliver bespoke kitchen tops and splashbacks that are both functional and beautiful.</p>
        </div>
        <div class="service-card">
          <h3>Vanity Tops</h3>
          <p>Add a touch of elegance to your bathrooms with our custom-made vanity tops, designed to meet your specific preferences.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Repair & Maintenance -->
  <section class="section-padding" style="background: #fafaf7;">
    <div class="container">
      <h2 class="section-title">Repair & Maintenance</h2>
      <p class="section-subtitle">Restore and protect your surfaces</p>
      <div class="services-grid services-grid-1">
        <div class="service-card">
          <h3>Repair & Maintenance Services</h3>
          <p>From natural stone repairs to polishing and anti-slip application, we offer services to help maintain or bring back your area to a near-new finish.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-banner">
    <div class="container" style="text-align: center;">
      <h2 style="color: #fff; margin-bottom: 0.5rem;">Need a Quote?</h2>
      <p style="color: #c8e4d0; margin-bottom: 1.5rem;">Get in touch to discuss your project requirements</p>
      <a href="/contact" class="btn-cta">Contact Us</a>
    </div>
  </section>

</BaseLayout>

<style>
  .page-hero {
    background: #2d2d2d;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .page-hero h1 {
    color: #fff;
    font-size: 2.5rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .services-grid-2 {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
    margin: 0 auto;
  }

  .services-grid-1 {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }

  .service-card {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .service-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .service-card p {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .cta-banner {
    background: #3c5544;
    padding: 4rem 1.5rem;
  }

  .btn-cta {
    display: inline-block;
    background: #fff;
    color: #3c5544;
    padding: 0.75rem 2.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.2s;
  }

  .btn-cta:hover {
    background: #f0ede6;
  }

  @media (max-width: 768px) {
    .services-grid,
    .services-grid-2,
    .services-grid-1 {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Verify services page renders**

Open `http://localhost:4321/services`. Expected: three service category sections with cards, CTA banner at bottom.

- [ ] **Step 3: Commit**

```bash
git add src/pages/services.astro
git commit -m "feat: add services page with tiling, fabrication, and repair sections"
```

---

## Task 6: Projects Overview and Individual Project Pages

**Files:**
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/royal-mint-gardens.astro`
- Create: `src/pages/projects/chelsea-waterfront.astro`
- Create: `src/pages/projects/york-place.astro`
- Create: `src/pages/projects/premier-place.astro`
- Create: `src/pages/projects/riverstone-fulham.astro`

- [ ] **Step 1: Create `src/pages/projects/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/ProjectCard.astro';
---

<BaseLayout title="Projects" description="Explore our portfolio of premium tiling and stone projects across London's leading developments.">

  <section class="page-hero">
    <h1>Our Projects</h1>
    <p>Trusted by leading developers across London</p>
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container">
      <div class="projects-grid">
        <ProjectCard name="Royal Mint Gardens" client="IJM Land" units="263 units" image="/img/young-contractors-royal-mint-garden.webp" href="/projects/royal-mint-gardens" />
        <ProjectCard name="Chelsea Waterfront" client="Hutchison Property Group" units="326 units" image="/img/young-contractors-chelsea-waterfront.webp" href="/projects/chelsea-waterfront" />
        <ProjectCard name="York Place" client="Avanton" units="299 units" image="/img/young-contractors-york-place.webp" href="/projects/york-place" />
        <ProjectCard name="Premier Place" client="Greycoat" units="9-floor office refurb" image="/img/young-contractors-premier-place.webp" href="/projects/premier-place" />
        <ProjectCard name="Riverstone Fulham" client="Riverstone Living" units="160 units" image="/img/young-contractors-fulham-riverstone.webp" href="/projects/riverstone-fulham" />
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .page-hero {
    background: #2d2d2d;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .page-hero h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .page-hero p {
    color: #ccc;
    font-size: 1.1rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Create `src/pages/projects/royal-mint-gardens.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Royal Mint Gardens" description="Young Contractors' tiling and worktop installation at Royal Mint Gardens - 263 units for IJM Land.">

  <section class="project-hero">
    <img src="/img/young-contractors-royal-mint-garden.webp" alt="Royal Mint Gardens" />
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container project-content">
      <h1>Royal Mint Gardens</h1>
      <div class="project-meta">
        <span><strong>Client:</strong> IJM Land</span>
        <span><strong>Units:</strong> 263</span>
        <span><strong>Scope:</strong> Bathroom, Communal, Lobby, Amenity Tiling, Kitchen & Vanity Top Installation</span>
      </div>
      <p>Bathroom, Communal, Lobby, Amenity Tiling, Kitchen & Vanity Top Installation across 263 residential units for IJM Land.</p>
      <div class="project-nav">
        <a href="/projects" class="back-link">&larr; Back to Projects</a>
        <a href="/projects/chelsea-waterfront" class="next-link">Next: Chelsea Waterfront &rarr;</a>
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .project-hero img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
  }

  .project-content h1 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }

  .project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e8e4dc;
    font-size: 0.95rem;
  }

  .project-content p {
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .project-nav {
    display: flex;
    justify-content: space-between;
    padding-top: 1.5rem;
    border-top: 1px solid #e8e4dc;
  }

  .back-link, .next-link {
    color: #3c5544;
    text-decoration: none;
    font-weight: 500;
  }

  .back-link:hover, .next-link:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .project-hero img {
      height: 250px;
    }

    .project-meta {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
```

- [ ] **Step 3: Create `src/pages/projects/chelsea-waterfront.astro`**

Same structure as royal-mint-gardens. Key differences:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Chelsea Waterfront" description="Young Contractors' tiling and worktop installation at Chelsea Waterfront - 326 units for Hutchison Property Group.">

  <section class="project-hero">
    <img src="/img/young-contractors-chelsea-waterfront.webp" alt="Chelsea Waterfront" />
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container project-content">
      <h1>Chelsea Waterfront</h1>
      <div class="project-meta">
        <span><strong>Client:</strong> Hutchison Property Group</span>
        <span><strong>Units:</strong> 326</span>
        <span><strong>Scope:</strong> Bathroom, Communal, Lobby, Leisure Centre, Amenity Tiling, Kitchen & Vanity Top Install</span>
      </div>
      <p>Bathroom, Communal, Lobby, Leisure Centre, Amenity Tiling, Kitchen & Vanity Top Installation across 326 residential units for Hutchison Property Group.</p>
      <div class="project-nav">
        <a href="/projects/royal-mint-gardens" class="back-link">&larr; Previous: Royal Mint Gardens</a>
        <a href="/projects/york-place" class="next-link">Next: York Place &rarr;</a>
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .project-hero img { width: 100%; height: 400px; object-fit: cover; display: block; }
  .project-content h1 { font-size: 2.2rem; margin-bottom: 1rem; }
  .project-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e8e4dc; font-size: 0.95rem; }
  .project-content p { line-height: 1.8; margin-bottom: 2rem; }
  .project-nav { display: flex; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid #e8e4dc; }
  .back-link, .next-link { color: #3c5544; text-decoration: none; font-weight: 500; }
  .back-link:hover, .next-link:hover { text-decoration: underline; }
  @media (max-width: 768px) { .project-hero img { height: 250px; } .project-meta { flex-direction: column; gap: 0.5rem; } }
</style>
```

- [ ] **Step 4: Create `src/pages/projects/york-place.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="York Place" description="Young Contractors' tiling at York Place - 299 units for Avanton.">

  <section class="project-hero">
    <img src="/img/young-contractors-york-place.webp" alt="York Place" />
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container project-content">
      <h1>York Place</h1>
      <div class="project-meta">
        <span><strong>Client:</strong> Avanton</span>
        <span><strong>Units:</strong> 299</span>
        <span><strong>Scope:</strong> Bathroom, Communal, Lobby, Amenity Tiling</span>
      </div>
      <p>Bathroom, Communal, Lobby, Amenity Tiling across 299 residential units for Avanton.</p>
      <div class="project-nav">
        <a href="/projects/chelsea-waterfront" class="back-link">&larr; Previous: Chelsea Waterfront</a>
        <a href="/projects/premier-place" class="next-link">Next: Premier Place &rarr;</a>
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .project-hero img { width: 100%; height: 400px; object-fit: cover; display: block; }
  .project-content h1 { font-size: 2.2rem; margin-bottom: 1rem; }
  .project-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e8e4dc; font-size: 0.95rem; }
  .project-content p { line-height: 1.8; margin-bottom: 2rem; }
  .project-nav { display: flex; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid #e8e4dc; }
  .back-link, .next-link { color: #3c5544; text-decoration: none; font-weight: 500; }
  .back-link:hover, .next-link:hover { text-decoration: underline; }
  @media (max-width: 768px) { .project-hero img { height: 250px; } .project-meta { flex-direction: column; gap: 0.5rem; } }
</style>
```

- [ ] **Step 5: Create `src/pages/projects/premier-place.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Premier Place" description="Young Contractors' tiling at Premier Place - 9-floor office refurbishment for Greycoat.">

  <section class="project-hero">
    <img src="/img/young-contractors-premier-place.webp" alt="Premier Place" />
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container project-content">
      <h1>Premier Place</h1>
      <div class="project-meta">
        <span><strong>Client:</strong> Greycoat</span>
        <span><strong>Units:</strong> Nine Floor Office Refurb</span>
        <span><strong>Scope:</strong> Lobby, WC, Toilets, Staff Changing Room Tiling</span>
      </div>
      <p>Lobby, WC, Toilets, Staff Changing Room Tiling across a nine-floor office refurbishment for Greycoat.</p>
      <div class="project-nav">
        <a href="/projects/york-place" class="back-link">&larr; Previous: York Place</a>
        <a href="/projects/riverstone-fulham" class="next-link">Next: Riverstone Fulham &rarr;</a>
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .project-hero img { width: 100%; height: 400px; object-fit: cover; display: block; }
  .project-content h1 { font-size: 2.2rem; margin-bottom: 1rem; }
  .project-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e8e4dc; font-size: 0.95rem; }
  .project-content p { line-height: 1.8; margin-bottom: 2rem; }
  .project-nav { display: flex; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid #e8e4dc; }
  .back-link, .next-link { color: #3c5544; text-decoration: none; font-weight: 500; }
  .back-link:hover, .next-link:hover { text-decoration: underline; }
  @media (max-width: 768px) { .project-hero img { height: 250px; } .project-meta { flex-direction: column; gap: 0.5rem; } }
</style>
```

- [ ] **Step 6: Create `src/pages/projects/riverstone-fulham.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Riverstone Fulham" description="Young Contractors' tiling at Riverstone Fulham - 160 units for Riverstone Living.">

  <section class="project-hero">
    <img src="/img/young-contractors-fulham-riverstone.webp" alt="Riverstone Fulham" />
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container project-content">
      <h1>Riverstone Fulham</h1>
      <div class="project-meta">
        <span><strong>Client:</strong> Riverstone Living</span>
        <span><strong>Units:</strong> 160</span>
        <span><strong>Scope:</strong> Bathroom, Communal, Lobby, Tiling, Balcony Tiling & Frame Install</span>
      </div>
      <p>Bathroom, Communal, Lobby, Tiling, Balcony Tiling & Frame Installation across 160 residential units for Riverstone Living.</p>
      <div class="project-nav">
        <a href="/projects/premier-place" class="back-link">&larr; Previous: Premier Place</a>
        <a href="/projects" class="next-link">All Projects &rarr;</a>
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .project-hero img { width: 100%; height: 400px; object-fit: cover; display: block; }
  .project-content h1 { font-size: 2.2rem; margin-bottom: 1rem; }
  .project-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e8e4dc; font-size: 0.95rem; }
  .project-content p { line-height: 1.8; margin-bottom: 2rem; }
  .project-nav { display: flex; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid #e8e4dc; }
  .back-link, .next-link { color: #3c5544; text-decoration: none; font-weight: 500; }
  .back-link:hover, .next-link:hover { text-decoration: underline; }
  @media (max-width: 768px) { .project-hero img { height: 250px; } .project-meta { flex-direction: column; gap: 0.5rem; } }
</style>
```

- [ ] **Step 7: Verify projects pages render**

Open `http://localhost:4321/projects` -- should show grid of 5 project cards. Click "Royal Mint Gardens" -- should open individual project page with hero image, meta, and navigation to next project. Click through all 5 project pages to verify navigation chain.

- [ ] **Step 8: Commit**

```bash
git add src/pages/projects/
git commit -m "feat: add projects overview and 5 individual project pages"
```

---

## Task 7: Gallery Page with Lightbox

**Files:**
- Create: `src/components/Lightbox.astro`
- Create: `src/pages/gallery.astro`

- [ ] **Step 1: Create `src/components/Lightbox.astro`**

```astro
<div class="lightbox" id="lightbox">
  <button class="lightbox-close" aria-label="Close">&times;</button>
  <img class="lightbox-image" id="lightbox-image" alt="Expanded gallery image" />
</div>

<style>
  .lightbox {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 200;
    align-items: center;
    justify-content: center;
  }

  .lightbox.active {
    display: flex;
  }

  .lightbox-image {
    max-width: 90%;
    max-height: 90vh;
    object-fit: contain;
  }

  .lightbox-close {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 201;
  }
</style>

<script>
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image') as HTMLImageElement;

  document.querySelectorAll('.gallery-image').forEach((img) => {
    img.addEventListener('click', () => {
      if (lightbox && lightboxImage) {
        lightboxImage.src = (img as HTMLImageElement).src;
        lightboxImage.alt = (img as HTMLImageElement).alt;
        lightbox.classList.add('active');
      }
    });
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || (e.target as HTMLElement).classList.contains('lightbox-close')) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
</script>
```

- [ ] **Step 2: Create `src/pages/gallery.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Lightbox from '../components/Lightbox.astro';

const images = [
  { src: "/img/young-contractors-project-img-1-scaled.webp", alt: "Tiling project 1" },
  { src: "/img/young-contractors-project-img-2-scaled.webp", alt: "Tiling project 2" },
  { src: "/img/young-contractors-project-img-3-scaled.webp", alt: "Tiling project 3" },
  { src: "/img/young-contractors-project-img-4-scaled.webp", alt: "Kitchen worktop installation" },
  { src: "/img/young-contractors-project-img-5-scaled.webp", alt: "Tiling project 5" },
  { src: "/img/young-contractors-project-img-6-scaled.webp", alt: "Tiling project 6" },
  { src: "/img/young-contractors-project-img-7-scaled.webp", alt: "Tiling project 7" },
  { src: "/img/young-contractors-project-img-8-scaled.webp", alt: "Tiling project 8" },
  { src: "/img/young-contractors-project-installed-kitchen-top-scaled.webp", alt: "Installed kitchen worktop" },
];
---

<BaseLayout title="Gallery" description="Browse our portfolio of tiling, stone worktop, and fabrication projects.">

  <section class="page-hero">
    <h1>Gallery</h1>
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container">
      <div class="gallery-grid">
        {images.map((image) => (
          <div class="gallery-item">
            <img class="gallery-image" src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  </section>

  <Lightbox />

</BaseLayout>

<style>
  .page-hero {
    background: #2d2d2d;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .page-hero h1 {
    color: #fff;
    font-size: 2.5rem;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .gallery-item {
    overflow: hidden;
    border-radius: 8px;
  }

  .gallery-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
    display: block;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .gallery-image:hover {
    transform: scale(1.05);
  }
</style>
```

- [ ] **Step 3: Verify gallery page renders**

Open `http://localhost:4321/gallery`. Expected: grid of 9 images. Click any image -- lightbox opens showing full-size image. Click outside or press Escape -- lightbox closes.

- [ ] **Step 4: Commit**

```bash
git add src/components/Lightbox.astro src/pages/gallery.astro
git commit -m "feat: add gallery page with lightbox"
```

---

## Task 8: Testimonials Page

**Files:**
- Create: `src/components/TestimonialCard.astro`
- Create: `src/pages/testimonials.astro`

- [ ] **Step 1: Create `src/components/TestimonialCard.astro`**

```astro
---
interface Props {
  quote: string;
  name: string;
  role: string;
}

const { quote, name, role } = Astro.props;
---

<div class="testimonial-card">
  <blockquote>{quote}</blockquote>
  <div class="attribution">
    <strong>{name}</strong>
    <span>{role}</span>
  </div>
</div>

<style>
  .testimonial-card {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  blockquote {
    font-style: italic;
    color: #555;
    line-height: 1.7;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    border: none;
    padding: 0;
  }

  .attribution strong {
    display: block;
    color: #2d2d2d;
    font-size: 0.95rem;
  }

  .attribution span {
    color: #888;
    font-size: 0.85rem;
  }
</style>
```

- [ ] **Step 2: Create `src/pages/testimonials.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TestimonialCard from '../components/TestimonialCard.astro';
---

<BaseLayout title="Testimonials" description="Read what our clients say about working with Young Contractors Ltd.">

  <section class="page-hero">
    <h1>Testimonials</h1>
    <p>What our clients say about us</p>
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container">
      <div class="testimonials-grid">
        <TestimonialCard
          quote="Outstanding quality and professionalism from start to finish. Young Contractors delivered beyond our expectations on every detail."
          name="Client Name"
          role="Project Manager, Development Company"
        />
        <TestimonialCard
          quote="The tiling work across all 263 units was completed to an exceptional standard. Their team was reliable, communicative, and a pleasure to work with."
          name="Client Name"
          role="Director, Property Group"
        />
        <TestimonialCard
          quote="We've used Young Contractors on multiple developments and they consistently deliver high-quality work on time and within budget."
          name="Client Name"
          role="Construction Manager"
        />
        <TestimonialCard
          quote="Their attention to detail on the stone worktop installations was impressive. Every kitchen was finished to a premium standard."
          name="Client Name"
          role="Site Manager"
        />
        <TestimonialCard
          quote="Professional, efficient, and excellent craftsmanship. Young Contractors are our go-to tiling subcontractor for high-end residential projects."
          name="Client Name"
          role="Contracts Manager"
        />
        <TestimonialCard
          quote="From the initial consultation through to completion, the team was knowledgeable and responsive. The finished result speaks for itself."
          name="Client Name"
          role="Project Director"
        />
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .page-hero {
    background: #2d2d2d;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .page-hero h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .page-hero p {
    color: #ccc;
    font-size: 1.1rem;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    .testimonials-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 3: Verify testimonials page renders**

Open `http://localhost:4321/testimonials`. Expected: 6 placeholder testimonial cards in a 3-column grid. On mobile (375px), single column.

- [ ] **Step 4: Commit**

```bash
git add src/components/TestimonialCard.astro src/pages/testimonials.astro
git commit -m "feat: add testimonials page with placeholder content"
```

---

## Task 9: FAQ Page with Accordion

**Files:**
- Create: `src/components/FaqItem.astro`
- Create: `src/pages/faq.astro`

- [ ] **Step 1: Create `src/components/FaqItem.astro`**

```astro
---
interface Props {
  question: string;
  answer: string;
}

const { question, answer } = Astro.props;
---

<div class="faq-item">
  <button class="faq-question" aria-expanded="false">
    <span>{question}</span>
    <span class="faq-icon">+</span>
  </button>
  <div class="faq-answer">
    <p>{answer}</p>
  </div>
</div>

<style>
  .faq-item {
    border-bottom: 1px solid #e8e4dc;
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: 'Libre Baskerville', Georgia, serif;
    font-size: 1.05rem;
    color: #2d2d2d;
  }

  .faq-icon {
    font-size: 1.5rem;
    color: #3c5544;
    transition: transform 0.2s;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .faq-item.open .faq-icon {
    transform: rotate(45deg);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .faq-item.open .faq-answer {
    max-height: 300px;
  }

  .faq-answer p {
    padding-bottom: 1.25rem;
    line-height: 1.7;
    font-size: 0.95rem;
    color: #555;
  }
</style>
```

- [ ] **Step 2: Create `src/pages/faq.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import FaqItem from '../components/FaqItem.astro';
---

<BaseLayout title="FAQ" description="Frequently asked questions about Young Contractors' tiling and stone worktop services.">

  <section class="page-hero">
    <h1>Frequently Asked Questions</h1>
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container faq-container">
      <FaqItem
        question="What areas do you cover?"
        answer="We primarily work across London and the South East, covering residential and commercial developments. For larger projects, we're happy to discuss requirements outside of these areas."
      />
      <FaqItem
        question="What types of tiling do you offer?"
        answer="We specialise in the supply and installation of natural stone, porcelain, large-format tiles, and mosaic wall/floor tiling. We also handle wet room waterproofing systems, tiled pedestal systems for balconies and terraces, and bespoke stone worktops."
      />
      <FaqItem
        question="Do you provide free quotes?"
        answer="Yes, we offer free consultations and quotes for all projects. Contact us with your project details and we'll arrange a time to discuss your requirements."
      />
      <FaqItem
        question="How long does a typical project take?"
        answer="Project timelines vary depending on the size and complexity of the work. A single bathroom may take a few days, while a large multi-unit residential development can span several months. We'll provide a detailed timeline during the quotation stage."
      />
      <FaqItem
        question="What materials do you work with?"
        answer="We work with a wide range of premium materials including natural stone, porcelain, ceramic, marble, granite, and quartz. We source materials from leading suppliers to ensure the highest quality finish."
      />
      <FaqItem
        question="Are you certified and insured?"
        answer="Yes, we are proud members of The Tile Association and hold all necessary insurance and certifications for the work we undertake. We are committed to maintaining the highest industry standards."
      />
    </div>
  </section>

</BaseLayout>

<style>
  .page-hero {
    background: #2d2d2d;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .page-hero h1 {
    color: #fff;
    font-size: 2.5rem;
  }

  .faq-container {
    max-width: 800px;
  }
</style>

<script>
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      if (item) {
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
        button.setAttribute('aria-expanded', String(!isOpen));
      }
    });
  });
</script>
```

- [ ] **Step 3: Verify FAQ page renders**

Open `http://localhost:4321/faq`. Expected: 6 questions listed with `+` icons. Click a question -- answer expands with smooth animation, `+` rotates to `x`. Click another question -- previous closes, new one opens.

- [ ] **Step 4: Commit**

```bash
git add src/components/FaqItem.astro src/pages/faq.astro
git commit -m "feat: add FAQ page with accordion"
```

---

## Task 10: Contact Page

**Files:**
- Create: `src/components/ContactForm.astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create `src/components/ContactForm.astro`**

```astro
<form name="contact" method="POST" data-netlify="true" class="contact-form">
  <input type="hidden" name="form-name" value="contact" />

  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" placeholder="Your full name" required />
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" placeholder="your@email.com" required />
  </div>

  <div class="form-group">
    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone" placeholder="Your phone number" />
  </div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" placeholder="Tell us about your project" rows="5" required></textarea>
  </div>

  <button type="submit" class="submit-btn">Send Message</button>
</form>

<style>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #2d2d2d;
  }

  input, textarea {
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #fff;
    transition: border-color 0.2s;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #3c5544;
  }

  .submit-btn {
    background: #3c5544;
    color: #fff;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
    align-self: flex-start;
  }

  .submit-btn:hover {
    background: #2e4038;
  }
</style>
```

- [ ] **Step 2: Create `src/pages/contact.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ContactForm from '../components/ContactForm.astro';
---

<BaseLayout title="Contact" description="Get in touch with Young Contractors Ltd for a free consultation on your tiling or stone worktop project.">

  <section class="page-hero">
    <h1>Contact Us</h1>
    <p>Get in touch to discuss your project</p>
  </section>

  <section class="section-padding" style="background: #fafaf7;">
    <div class="container contact-grid">
      <div class="form-column">
        <h2>Send Us a Message</h2>
        <p>Fill in the form below and we'll get back to you as soon as possible.</p>
        <ContactForm />
      </div>
      <div class="details-column">
        <h2>Contact Details</h2>
        <div class="detail-item">
          <h3>Phone</h3>
          <p><a href="tel:07931216828">07931 216828</a></p>
        </div>
        <div class="detail-item">
          <h3>Email</h3>
          <p><a href="mailto:danny@youngcontractors.co.uk">danny@youngcontractors.co.uk</a></p>
        </div>
        <div class="detail-item">
          <h3>Address</h3>
          <p>C/O Azets River House, 1 Maidstone Road, Sidcup, Kent, United Kingdom, DA14 5RH</p>
        </div>
      </div>
    </div>
  </section>

</BaseLayout>

<style>
  .page-hero {
    background: #2d2d2d;
    padding: 4rem 1.5rem;
    text-align: center;
  }

  .page-hero h1 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .page-hero p {
    color: #ccc;
    font-size: 1.1rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 4rem;
  }

  .form-column h2,
  .details-column h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .form-column > p {
    margin-bottom: 1.5rem;
    color: #888;
  }

  .detail-item {
    margin-bottom: 1.5rem;
  }

  .detail-item h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .detail-item p {
    line-height: 1.6;
  }

  .detail-item a {
    color: #3c5544;
    text-decoration: none;
  }

  .detail-item a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
```

- [ ] **Step 3: Verify contact page renders**

Open `http://localhost:4321/contact`. Expected: two-column layout with form on left (name, email, phone, message fields + submit button) and contact details on right. Verify form fields have focus styles. On mobile, columns stack.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactForm.astro src/pages/contact.astro
git commit -m "feat: add contact page with Netlify form and contact details"
```

---

## Task 11: Astro Config and Build Verification

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Update `astro.config.mjs` for Netlify**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://youngcontractors.co.uk',
  build: {
    format: 'directory',
  },
});
```

- [ ] **Step 2: Add `.gitignore` entries**

Ensure `.gitignore` contains:

```
node_modules/
dist/
.astro/
.superpowers/
```

- [ ] **Step 3: Run production build**

```bash
npx astro build
```

Expected: Build completes with no errors. Output in `dist/` directory with all pages as `index.html` files in their route directories.

- [ ] **Step 4: Preview the build**

```bash
npx astro preview
```

Open `http://localhost:4321` and click through all pages:
- Home: hero, intro, services, projects, stats, testimonial, CTA
- About: story, values, certs
- Services: three sections of cards
- Projects: grid of 5, click into each project page, verify prev/next nav
- Gallery: image grid, lightbox opens/closes
- Testimonials: 6 cards
- FAQ: accordion open/close
- Contact: form renders, details shown

- [ ] **Step 5: Commit**

```bash
git add astro.config.mjs .gitignore
git commit -m "chore: configure Astro for Netlify deployment and add gitignore"
```

---

## Task 12: Final Polish and Cross-Page Testing

- [ ] **Step 1: Test all navigation links**

Click every nav link in the header from every page. Verify the Contact CTA button works. Verify footer quick links all work. Verify all "View All ..." links on homepage work.

- [ ] **Step 2: Test mobile responsive layout**

In browser DevTools, test at 375px width. Verify:
- Hamburger menu appears and toggles nav
- All grids collapse to single column
- Hero text is readable and CTAs stack
- Footer stacks properly
- Gallery images resize correctly
- Contact form is usable

- [ ] **Step 3: Test lightbox**

On gallery page, click images, verify lightbox opens. Press Escape to close. Click outside image to close. Verify on mobile.

- [ ] **Step 4: Test FAQ accordion**

Click all FAQ items. Verify only one opens at a time. Verify smooth animation.

- [ ] **Step 5: Run final build**

```bash
npx astro build
```

Expected: Clean build, no warnings.

- [ ] **Step 6: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final polish and cross-page fixes"
```

(Only if there were fixes needed. Skip if build was clean and everything worked.)
