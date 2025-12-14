# Redwater Revenue

Production website for [redwaterrev.com](https://redwaterrev.com) - Growth systems for service businesses.

## Overview

A high-conversion landing page built for Redwater Revenue, an agency specializing in SEO, automation, and marketing systems for service businesses. Features an interactive revenue calculator, smooth scroll navigation, and optimized performance.

## Tech Stack

- React 19 with TypeScript
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

## Features

- 📊 Interactive revenue loss calculator
- 🎨 Premium dark theme with warm color palette
- ⚡ Optimized performance (code splitting, lazy loading)
- 📱 Fully responsive design
- ♿ Accessible (ARIA labels, keyboard navigation)
- 🔒 Secure (no API keys exposed, client-side only)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This site is deployed to GitHub Pages via GitHub Actions.

**Live Site**: https://nicholasrougeau.github.io/redwater/

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
```

## Project Structure

```
/
├── components/          # Reusable UI components
│   ├── Background.tsx   # Animated particle background
│   ├── Navbar.tsx       # Navigation with smooth scroll
│   ├── Button.tsx       # Custom button component
│   ├── Card.tsx         # Card container component
│   └── ErrorBoundary.tsx # Error handling
├── sections/            # Page sections
│   ├── Hero.tsx         # Hero banner
│   ├── Problems.tsx     # Problem statements
│   ├── Solutions.tsx    # Solutions showcase
│   ├── Results.tsx      # Social proof/results
│   ├── RevenueCalculator.tsx # Interactive calculator
│   └── CTA.tsx          # Call-to-action
├── src/
│   └── index.css        # Tailwind directives & custom styles
├── App.tsx              # Main app component
├── index.tsx            # React entry point
└── index.html           # HTML template
```

## Configuration

### GitHub Pages

The site is configured for GitHub Pages deployment with:
- Base path: `/redwater/` (set in vite.config.ts)
- Automated deployment via GitHub Actions
- Custom domain: redwaterrev.com

### Custom Domain Setup

To link to your custom domain:

1. Go to GitHub repo Settings → Pages
2. Add custom domain: `redwaterrev.com`
3. In your DNS provider, add:
   - A records to GitHub Pages IPs
   - CNAME record: `www` → `nicholasrougeau.github.io`
4. Enable "Enforce HTTPS" in GitHub settings

## Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production (outputs to dist/)
- `npm run preview` - Preview production build locally
- `npm run lint` - TypeScript type checking

## License

Private - All rights reserved

## Contact

For inquiries: [nick@redwaterrev.com](mailto:nick@redwaterrev.com)
