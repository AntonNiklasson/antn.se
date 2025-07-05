# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests with Vitest
- `pnpm check` - Check code formatting with Prettier
- `pnpm format` - Format code with Prettier

### Content Management
- `pnpm make:post` - Create new blog post (requires title argument)
- Example: `bun run scripts/new-post/index.ts "My New Post"`

## Architecture

This is an Astro-based personal blog and notes website with the following key components:

### Content Structure
- **Blog posts**: Located in `src/content/blog/` as MDX files with frontmatter
- **Content schema**: Defined in `src/content/config.ts` with Zod validation
- **Page content**: Static content in `src/content/page-content/index.mdx`

### Key Features
- **Automatic OG image generation**: Custom Astro plugin generates cover images for blog posts using Satori
- **Content collections**: Uses Astro's content collections for type-safe blog post management
- **View transitions**: Smooth page transitions using Astro's ViewTransitions
- **RSS feed**: Generated at `/feed.xml` and `/rss.xml`

### Layout System
- **PageLayout**: Base layout with header, navigation, and Google Analytics
- **BlogPost**: Specialized layout for blog posts with date display and GitHub edit links
- **BaseHead**: Common head elements and meta tags

### Build Process
- **Post covers**: Automatically generated during build using `generatePostCovers()` plugin
- **Static generation**: All pages are statically generated at build time
- **Deployment**: Configured for Vercel with `vercel.json`

### Development Tools
- **Package manager**: pnpm (specified in `packageManager` field)
- **Node version**: 20.x (specified in `engines`)
- **TypeScript**: Strict configuration extending Astro's strict tsconfig
- **Prettier**: Configured with custom settings for tabs, 100-char width, and special MDX formatting

### Testing
- **Framework**: Vitest for unit tests
- **Location**: Tests are co-located with source files (e.g., `src/utils/group-by.test.ts`)

### Styling
- **Framework**: Tailwind CSS with typography plugin
- **Global styles**: Located in `src/styles/global.css`
- **Responsive**: Mobile-first approach with prose styling for content

## Notes

- Blog posts are automatically linked to GitHub for editing via footer links
- The site uses Swedish locale for date formatting in OG images
- Custom post creation script handles slug generation and frontmatter setup
- All blog posts require a date field and support optional summary, hero image, and lastUpdate fields