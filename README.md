# InAmigos Foundation Website

This is a modern, performance-optimized static website for the InAmigos Foundation. 

It was built using the design system and architecture of the Stand Sustainable Foundation, adapted to fit InAmigos' content and brand identity (Deep Forest Green).

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Typography**: Source Serif 4 (Display) & Public Sans (Body)
- **Animations**: Custom `FadeUp` with IntersectionObserver & Lenis smooth scroll
- **Deployment**: Static Export (`next build` outputs static files)

## Features

- **No Backend Required**: Designed for simple static hosting (Vercel, Netlify, GitHub Pages, or S3).
- **External Integrations**: Uses external links for donations (Razorpay) and volunteer signups (Google Forms) to avoid the need for complex backend API routes and databases.
- **Enterprise SEO**: Structured JSON-LD schema for NGO validation, auto-generated sitemap, and dynamic metadata.
- **Responsive Architecture**: Fully responsive across mobile, tablet, and desktop viewports.

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
# Generate static export (outputs to /out directory)
npm run build
```

## Content Management

All content is managed through TypeScript files located in `src/content/`:
- `about.ts`: Organizational info, credentials, initiatives
- `blog.ts`: Articles and news
- `contact.ts`: Contact info and social links
- `events.ts`: Event listings
- `gallery.ts`: Masonry image gallery
- `home.ts`: Hero carousel, featured items, and impact stats
- `navigation.ts`: Site configuration, top nav, and footer links
- `programs.ts`: Core focus areas
- `team.ts`: Team directory (grouped by roles)
