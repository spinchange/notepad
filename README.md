<img src="notebook.svg" width="80" align="right">

# Notepad

A full-featured text editor in a single HTML file. No server, no dependencies, no install.

**Live:** [https://spinchange.github.io/notepad/](https://spinchange.github.io/notepad/)

## Features

- **Open, edit, and save** plain text files directly on your computer
- **Save in place** — no download dialog after the first save
- **Light/Dark mode** with toggle and persistent preference (defaults to light)
- **Letterhead/branding** — add a logo and company name as stationery
- **Custom colors** — change editor background and text color
- **Background image** — use any image as editor wallpaper
- **Read mode** — toggle between editing and a formatted reading view
- **Markdown rendering** — open a `.md` or `.markdown` file and Read mode renders it with full markdown (headings, lists, tables, code blocks, blockquotes, images, links, inline styles)
- **YAML frontmatter** — optional `---` metadata block at the top of a `.md` file renders as a header bar (`title`, `status`, `date`, `author`, `tags`)
- **Inline formatting** — `**bold**`, `*italic*`, `~~strikethrough~~`, `` `code` ``, `> blockquotes`, and auto-linked URLs
- **Headings** — `#`, `##`, `###` rendered as styled headings
- **Lists** — `- item` or `* item` rendered as bullet lists
- **Horizontal rules** — `---` rendered as a divider
- **Timestamped entries** — lines like `[12:30:45 @MACHINE] text #tag` render as cards with time sidebar and machine badge
- **Hashtag filtering** — `#tags` appear as clickable pills; click one to filter entries by that tag
- **Search** — real-time search bar in read mode to filter entries by text
- **Word count** — live word count in the toolbar
- **Stopwatch timer** — click to start/stop, double-click to reset
- **Font family picker** — choose from system fonts (Segoe UI, Arial, Verdana, Georgia, Times New Roman, Consolas); no external dependencies
- **Font size control** — adjustable slider in settings (10px–32px)
- **Line spacing control** — adjustable slider in settings (1.2–2.4)
- **Editor watermark** — faded background logo behind the editor text, with adjustable opacity
- **Copy button** — copy editor text to clipboard with one click
- **Email button** — open Gmail compose with content pre-filled as a draft
- **Help button** — in-app formatting reference, shortcuts, and link to README
- **Keyboard shortcuts** — Ctrl+S (save), Ctrl+O (open), Ctrl+N (new), Ctrl+R (read mode)
- **Tab key** inserts a tab character
- **Unsaved changes warning** before closing or switching files
- **Print-friendly** — letterhead shows in print, toolbar hides
- **All settings persist** across sessions via localStorage

## Usage

Open `index.html` in Chrome or Edge, or visit the GitHub Pages link above. Bookmark it — the page title is just "Notepad".

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+S | Save |
| Ctrl+O | Open |
| Ctrl+N | New |
| Ctrl+R | Toggle read mode |
| Tab | Insert tab |

### Settings

Click the **Settings** button to:

- Toggle the letterhead bar (logo + name)
- Choose or remove a logo image
- Choose font family
- Adjust font size
- Adjust line spacing
- Pick editor background and text colors
- Set a background image
- Set a watermark (faded logo behind the editor text) and adjust its opacity
- Reset everything to defaults

### Branding / Letterhead

1. Click **Settings** and check **Show letterhead**
2. Click the dashed box or **Choose** to pick a logo image
3. Type your name or company in the text field
4. Everything saves automatically — it will be there next time you open the page

### Read Mode

Click the **Read** button (or Ctrl+R) to switch from editing to a formatted view.

**Markdown files** (`.md`, `.markdown`): full markdown rendering with headings, lists, ordered lists, tables, fenced code blocks, blockquotes, images, links, inline styles, and horizontal rules. An optional YAML frontmatter block at the top of the file is parsed and shown as a metadata header bar rather than rendered as body text. Use browser Ctrl+F to search within the rendered content.

**Plain text / journal files**: the notepad renderer applies a lightweight format:
- `=== Sunday, February 15, 2026 ===` becomes a styled date header
- `[12:30:45 @LUNA] journal entry #tag` renders as a card with timestamp, machine badge, and tag pills
- `#hashtags` become inline tag pills
- URLs become clickable links
- `**bold**`, `*italic*`, `~~strikethrough~~`, `` `code` ``, and `> blockquotes` are rendered inline
- `# Heading`, `## Heading`, `### Heading` — three levels of headings
- `- item` or `* item` — bullet lists
- `---` — horizontal rule
- A search bar at the top filters entries in real-time

Click **Edit** to return to the raw text editor.

## Browser Support

Requires the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) — works in **Chrome** and **Edge**. Firefox and Safari can use the notepad but without file open/save (they'll get browser-standard fallback dialogs).

## How It Works

It's a single HTML file. No build step, no framework, no backend. The File System Access API lets the browser read and write files with user permission. Settings are stored in `localStorage`.

## License

MIT
