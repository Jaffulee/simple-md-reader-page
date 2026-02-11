# Getting Started

This template provides a lightweight, structured way to publish Markdown content as standalone pages using a single reusable viewer.

It is designed for simplicity, clarity, and full static hosting compatibility — including GitHub Pages.

---

## Overview

Each document in this system is:

- Written in standard Markdown
- Registered inside `docs/_docs.json`
- Rendered dynamically using `viewer.html`
- Accessible via a unique, shareable URL

No build tools. No frameworks. No backend.

---

## How It Works

The homepage reads a structured JSON file:

```json
{
  "file": "doc1.md",
  "title": "Getting Started",
  "summary": "Introduction and setup guide for the template.",
  "date": "2026-02-01"
}
```

Each entry defines:

- `file` → The Markdown file inside `/docs`
- `title` → Display title on the homepage
- `summary` → Short preview text shown beneath the title
- `date` (optional) → ISO format (`YYYY-MM-DD`), used for sorting (newest first)

If at least one document includes a valid `date`, the homepage will sort documents by date (descending).  
If no documents include dates, the system falls back to alphabetical sorting by title.

## Adding a New Document

1. Create a new `.md` file inside `/docs`
2. Add a corresponding entry in `_docs.json`
3. Refresh the homepage

The template automatically:

- Sorts by date (if provided)
- Falls back to alphabetical sorting
- Generates shareable URLs
