# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nimble Needle is a Next.js website for a professional tailoring business in Ottawa with two locations. It features a modern, responsive design with gradients, animations, and smooth scrolling effects.

## Technology Stack
- **Framework**: Next.js 13.5.1 with App Router
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: Radix UI components via shadcn/ui
- **Fonts**: Google Fonts (Playfair Display, Montserrat, Poppins)
- **Images**: Next.js Image component with optimization disabled for static export
- **Icons**: Lucide React

## Key Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production (static export)
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Data Scraping
```bash
npm run scrape:website           # Scrape nibbleneedle.ca content
npm run scrape:reviews           # Scrape Google reviews
npm run scrape:reviews-enhanced  # Enhanced Google reviews scraping
npm run find-place-id           # Find Google Place ID for reviews
```

## Architecture

### Page Structure
- **Homepage**: `app/page.tsx` - Main landing page with hero, services overview, testimonials
- **Service Pages**:
  - `app/services/page.tsx` - Complete services overview with pricing
  - `app/clothing-alterations/page.tsx` - Detailed clothing alterations page
  - `app/zipper-repair/page.tsx` - Zipper repair services and pricing
  - `app/wedding-dress-alterations/page.tsx` - Bridal alterations specialist page
- **Info Pages**:
  - `app/about/page.tsx` - Company story, values, and team information
  - `app/contact-us/page.tsx` - Location details, maps, and contact info
- **Layout**: `app/layout.tsx` - Root layout with metadata and structured data

### Component Structure
- **UI Components**: `components/ui/` (shadcn/ui components)
- **Custom Components**: 
  - `Navigation.tsx` - Fixed header with scroll effects and mobile menu
  - `HeroSection.tsx` - Main hero section with parallax
  - `SocialSidebar.tsx` - Social media sidebar
  - `LocationSelector.tsx` - Location selection dropdown
  - `Breadcrumb.tsx` - Navigation breadcrumbs for pages
- **Data**: `lib/data.ts` - Static data (testimonials, services, locations)
- **Hooks**: `hooks/` - Custom React hooks (toast, Google reviews)
- **Utilities**: `lib/utils.ts` - Tailwind class utilities

### Design System
- **Colors**: Pink primary (#ec4899), gray scale, gradients
- **Typography**: Playfair Display for headings, Montserrat for body text
- **Animations**: Intersection Observer for scroll animations, parallax effects
- **Layout**: Responsive grid layouts, max-width containers (max-w-7xl)

### Static Export Configuration
The site is configured for static export (`output: 'export'`) with:
- Images unoptimized for static hosting
- ESLint disabled during builds
- Absolute paths using `@/*` aliases

### Data Management
- Static data in `lib/data.ts` for services, testimonials, locations
- Real Google Reviews can be integrated via `/api/reviews` route
- Scraped data stored in `scraped-data/` directory with timestamps

## Development Notes

### Styling Conventions
- Use Tailwind utility classes
- Custom gradients: `bg-gradient-to-r from-pink-500 to-pink-600`
- Responsive breakpoints: `md:`, `lg:`, `xl:`
- Animation classes: `transition-all duration-300`, `transform hover:scale-105`

### Component Patterns
- All components use TypeScript
- Custom components in `components/` directory
- UI components follow shadcn/ui patterns
- Animations use Intersection Observer API for performance

### Image Handling
- All images optimized for web (WebP format preferred)
- Using Next.js Image component with `fill` prop for responsive images
- Images stored in `public/` directory

### Google Reviews Integration
- Mock data currently used in `lib/data.ts`
- Real implementation available via Google Places API
- See `docs/google-reviews-setup.md` for integration guide
- Scripts available for scraping reviews data

## File Locations

### Key Configuration Files
- `next.config.js` - Next.js configuration with static export
- `tailwind.config.ts` - Tailwind configuration with custom fonts
- `tsconfig.json` - TypeScript configuration with path aliases
- `components.json` - shadcn/ui component configuration

### Data and Content
- `lib/data.ts` - All static content and business data
- `scraped-data/` - Historical scraped data for reference
- `public/` - Static assets (images, logo, mockups)

### Scripts and Tools
- `scripts/` - Data scraping and utility scripts
- `docs/` - Setup guides and documentation

## Business Information

### Locations
1. **Downtown Ottawa - Preston**: 141 Preston St, (343) 588-1300
2. **New Location - Riverside**: 3681 Riverside Dr, (343) 588-3182

### Services
- Alterations and repairs (wedding dresses, suits, casual wear)
- Custom and retail suits
- Zipper repairs
- Vintage clothing restoration

### Hours
- Tue-Sat: 9am-9pm
- Sun-Mon: 10am-7pm