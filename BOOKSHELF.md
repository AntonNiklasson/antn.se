# Bookshelf Feature Documentation

## Overview

The bookshelf feature allows you to track books you've read and maintain notes/highlights from your reading. It's built as a separate content collection from blog posts, using the same MDX-based approach.

## Directory Structure

```
src/content/books/
  [slug]/
    index.mdx
```

Each book is stored in its own directory with an `index.mdx` file.

## Content Schema

Books use the following frontmatter schema (defined in `src/content/config.ts`):

```yaml
---
title: "Book Title"              # Required
author: "Author Name"            # Required
dateFinished: 2025-01-15        # Required - date you finished reading
isbn: "9780735211292"           # Optional - for API lookups
cover: "https://..."            # Optional - URL to cover image
goodreadsUrl: "https://..."     # Optional - link to Goodreads page
rating: 5                       # Optional - your rating (1-5)
---
```

## Creating a New Book

### Option 1: Using the script (requires Bun)

```bash
pnpm make:book "Book Title"
```

This creates a new book entry with a template at `src/content/books/[slug]/index.mdx`.

### Option 2: Manual creation

1. Create directory: `src/content/books/[slug]/`
2. Create file: `src/content/books/[slug]/index.mdx`
3. Add frontmatter and content

## Readwise/Obsidian Workflow

### Current Manual Workflow

1. Export your highlights from Readwise to Obsidian (Readwise has built-in Obsidian sync)
2. In your Obsidian vault, find the book note
3. Copy the relevant content (highlights, notes, etc.)
4. Paste into the MDX file for that book in `src/content/books/[slug]/index.mdx`
5. Commit and deploy

### Suggested Structure for Book Notes

```markdown
## Summary

Brief overview of the book.

## Notes

Your reading notes go here.

## Key Takeaways

- Bullet point
- Bullet point

## Quotes

> Important quote from the book
```

## Getting Book Metadata & Covers

### Open Library API

Open Library provides free access to book covers and metadata:

**Cover Images:**
```
https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg
```

Size options: S (small), M (medium), L (large)

**Book Metadata:**
```
https://openlibrary.org/api/books?bibkeys=ISBN:{ISBN}&format=json&jscmd=data
```

Rate limits: 100 requests per 5 minutes for ISBN lookups.

### Google Books API

Alternative source for book information:
```
https://www.googleapis.com/books/v1/volumes?q=isbn:{ISBN}
```

### Hardcover API (GraphQL)

If you need more social features, Hardcover has a developer-friendly GraphQL API that's free to use.

### Manual Approach

1. Find your book on Goodreads
2. Copy the cover image URL from the page
3. Add the Goodreads URL and cover URL to your book's frontmatter
4. Optionally add the ISBN for future API integration

## Pages

- `/bookshelf` - Lists all books grouped by year finished
- `/books/[slug]` - Individual book page with your notes

## Layout Components

- `src/layouts/Book.astro` - Layout for individual book pages
- `src/pages/bookshelf.astro` - Listing page
- `src/pages/books/[slug].astro` - Dynamic route for books

## Future Enhancements

Potential improvements to consider:

1. **Automated Readwise Sync**: Use Readwise API to automatically fetch highlights
2. **Build-time API Integration**: Fetch cover images and metadata during build
3. **Reading Status**: Add "currently reading" vs "finished" states
4. **Tags/Categories**: Genre tags, topics, etc.
5. **Reading Stats**: Total books, pages read, etc.
6. **Book Search**: Search through your notes and highlights
