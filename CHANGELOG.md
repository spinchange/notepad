# Changelog

## 2026-02-16

- Add **Copy** button — copies editor text to clipboard
- Add **Email** button — opens Gmail compose with content pre-filled
- Default theme changed to **light mode** (dark still persists via localStorage)
- Fix timer and word count styling to respond correctly to light/dark toggle
- Fix search bar in read mode losing focus after each keystroke

## 2026-02-15

- Add **headings** (`#`, `##`, `###`), **bullet lists** (`- item`), **strikethrough** (`~~text~~`), and **horizontal rules** (`---`) in read mode
- Add **help panel** with formatting reference and keyboard shortcuts
- Enable **word wrap** in editor
- Add **stopwatch timer** — click to start/stop, double-click to reset
- Add **word count** in toolbar
- Add **font size slider** in settings (10px–32px, persisted)
- Add **read mode** with search, tag filtering, and inline formatting
- Change search placeholder to generic "Search..."

## 2026-02-14

- Initial release: single-file browser notepad
- Open, edit, save plain text files via File System Access API
- Dark/light mode toggle
- Letterhead branding (logo + company name)
- Custom editor background and text colors
- Background image support
- Keyboard shortcuts (Ctrl+S, Ctrl+O, Ctrl+N)
- Tab key inserts tab character
- Unsaved changes warning
- Print-friendly layout
- All settings persist in localStorage
