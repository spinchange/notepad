# Changelog

## 2026-04-12 (continued)

- Add **table of contents** — `toc: true` in frontmatter renders a sticky left-sidebar TOC with anchor links, indented by heading level; collapses to single column on narrow screens; hidden on print
- Add **frontmatter fields** `project`, `priority`, and `due` — displayed as labeled pills in the markdown read mode header bar alongside the existing `status`, `date`, `author`, and `tags` fields

## 2026-04-12

- Add **PWA support** — installable from Chrome/Edge; `manifest.json` + `sw.js` cache core assets for offline use; icon at 192px and 512px
- Add **Web Share Target** — installed PWA appears as a share destination on Android Chrome; shared title/text/URL is inserted into the editor and the query params are cleaned from the URL
- Add **table column alignment** — delimiter row colons (`:---`, `---:`, `:---:`) now apply `text-align` to header and body cells
- Add **escaped pipe support** in tables — `\|` inside a cell renders as a literal `|`
- Fix **ragged table rows** — body rows shorter than the header are padded with empty cells
- Fix **infinite loop in Read mode** on code fences with non-word info strings (e.g. `` ```js,ignore ``), 4+ backtick fences, and any other line that no block handler claims; a safety guard now ensures the parser always advances
- Fix **CommonMark hard line breaks** — lines ending with two or more spaces emit `<br>` in rendered paragraphs
- Update **help panel** — three-section layout (Markdown / YAML frontmatter / Plain text journal), CommonMark spec link, Ctrl+F noted for markdown find

## 2026-04-06

- Add **markdown read mode** — `.md` and `.markdown` files render with full markdown formatting in Read mode (headings, lists, code blocks, tables, blockquotes, inline styles, images, links)
- Add **YAML frontmatter support** — optional `---` block at the top of a markdown file is parsed and displayed as a metadata header bar (`title`, `status`, `date`, `author`, `tags`)
- Search bar hidden in markdown read mode (use browser Ctrl+F for find)

## 2026-04-05

- Add **editor watermark** — set a faded background logo behind the editor text via Settings → Watermark; adjustable opacity
- Add **notebook SVG icon** — favicon and repo icon
- Fix **print layout** cutting off content after the first page

## 2026-02-17

- Add **Word export** — toolbar "Word" button downloads a `.doc` file with markdown formatting converted and optional letterhead included
- Add **font family picker** in settings — choose from system fonts (Segoe UI, Arial, Verdana, Georgia, Times New Roman, Consolas) with no external dependencies
- Add **line spacing slider** in settings (1.2–2.4, defaults to 1.6)
- Both settings apply to editor and reader and persist in localStorage

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
