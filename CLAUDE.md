# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production (server output for Vercel)
- `pnpm preview` - Preview production build locally
- `pnpm test` - Run tests with Vitest
- `pnpm check` - Check code formatting with Prettier
- `pnpm format` - Format code with Prettier

### Content Management
- `pnpm make:post "Title Here"` - Create new blog post with slug generation
- Uses Bun runtime: `bun run scripts/new-post/index.ts "Post Title"`
- Creates MDX file at `src/content/blog/[slug]/index.mdx`
- `pnpm make:book "Book Title"` - Create new book entry for bookshelf
- Uses Bun runtime: `bun run scripts/new-book/index.ts "Book Title"`
- Creates MDX file at `src/content/books/[slug]/index.mdx`
- See `BOOKSHELF.md` for detailed bookshelf documentation

## Architecture

Astro-based personal website with server-side rendering deployed to Vercel.

### Content System
- **Blog posts**: MDX files in `src/content/blog/[slug]/index.mdx`
- **Books**: MDX files in `src/content/books/[slug]/index.mdx` (separate from blog posts)
- **Schema validation**: Zod schemas in `src/content/config.ts`
  - Blog schema: `title`, `date`, `summary`, `lastUpdate`, `hero`
  - Books schema: `title`, `author`, `dateFinished`, `isbn`, `cover`, `goodreadsUrl`, `rating`
- **Dynamic routing**: Blog posts via `[slug].astro`, books via `books/[slug].astro`
- **Static paths**: Generated at build time via `getStaticPaths()`

### Page Structure
- `/` - Home page with recent posts and contact form
- `/notes` - Full blog listing
- `/[slug]` - Individual blog posts
- `/bookshelf` - Book listing page grouped by year
- `/books/[slug]` - Individual book pages with reading notes
- `/feed.xml` and `/rss.xml` - RSS feeds
- `/api/contact` - Contact form endpoint with Resend integration

### Key Features
- **OG Image Generation**: `scripts/generate-post-covers/index.js` creates 1200x630 PNG covers using Satori during build
- **Contact Form**: Server-side API with rate limiting (3 requests/15min) and honeypot spam protection
- **GitHub Integration**: Blog posts link to source files for editing
- **Analytics**: Google Analytics via Partytown web worker

### Layout Components
- **PageLayout**: Base layout with optional `expandHeader` prop
- **BlogPost**: Wraps MDX content with metadata display for blog posts
- **Book**: Wraps MDX content with metadata display for books (cover, author, rating, etc.)
- **BaseHead**: Meta tags and common head elements
- **ContactForm**: Form component posting to `/api/contact`

### Build Configuration
- **Output**: Server-side rendering (`output: "server"`)
- **Adapter**: Vercel deployment adapter
- **Integrations**: MDX, Sitemap, Tailwind, Partytown
- **Custom plugin**: `generatePostCovers()` runs on `astro:build:done` hook

### Testing Strategy
- **Framework**: Vitest with co-located test files
- **Pattern**: `*.test.ts` files alongside source
- **Example**: `src/utils/group-by.test.ts` tests utility functions

### Code Style
- **Prettier config**:
  - Tab indentation (width 4)
  - 100 character line width
  - MDX files: 80 char width with prose wrap
  - Bracket same line
- **TypeScript**: Extends `astro/tsconfigs/strict` with `strictNullChecks`

### Environment Variables
Required for production (accessed via `src/lib/env.ts`):
- `RESEND_API_KEY` - For contact form email sending
- `CONTACT_EMAIL` - Recipient for contact form submissions