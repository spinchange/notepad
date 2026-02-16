# Notepad

A single-file browser notepad with real file system access. No server, no dependencies, no install.

**Live:** [https://spinchange.github.io/notepad/](https://spinchange.github.io/notepad/)

## Features

- **Open, edit, and save** plain text files directly on your computer
- **Save in place** — no download dialog after the first save
- **Dark/Light mode** with toggle and persistent preference
- **Letterhead/branding** — add a logo and company name as stationery
- **Custom colors** — change editor background and text color
- **Background image** — use any image as editor wallpaper
- **Read mode** — toggle between editing and a formatted reading view
- **Inline formatting** — `**bold**`, `*italic*`, `~~strikethrough~~`, `` `code` ``, `> blockquotes`, and auto-linked URLs
- **Headings** — `#`, `##`, `###` rendered as styled headings
- **Lists** — `- item` or `* item` rendered as bullet lists
- **Horizontal rules** — `---` rendered as a divider
- **Timestamped entries** — lines like `[12:30:45 @MACHINE] text #tag` render as cards with time sidebar and machine badge
- **Hashtag filtering** — `#tags` appear as clickable pills; click one to filter entries by that tag
- **Search** — real-time search bar in read mode to filter entries by text
- **Word count** — live word count in the toolbar
- **Stopwatch timer** — click to start/stop, double-click to reset
- **Font size control** — adjustable slider in settings (10px–32px)
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
- Adjust font size
- Pick editor background and text colors
- Set a background image
- Reset everything to defaults

### Branding / Letterhead

1. Click **Settings** and check **Show letterhead**
2. Click the dashed box or **Choose** to pick a logo image
3. Type your name or company in the text field
4. Everything saves automatically — it will be there next time you open the page

### Read Mode

Click the **Read** button (or Ctrl+R) to switch from editing to a formatted view:

- `=== Sunday, February 15, 2026 ===` becomes a styled date header
- `[12:30:45 @LUNA] journal entry #tag` renders as a card with timestamp, machine badge, and tag pills
- `#hashtags` become clickable filters — click one to show only matching entries
- URLs become clickable links
- `**bold**`, `*italic*`, `~~strikethrough~~`, `` `code` ``, and `> blockquotes` are rendered inline
- `# Heading`, `## Heading`, `### Heading` — three levels of headings
- `- item` or `* item` — bullet lists
- `---` — horizontal rule
- A search bar at the top filters entries in real-time
- Click **Edit** to return to the raw text editor

Works great with plain text journals, logs, or any structured text — but also handles plain unformatted text just fine.

## Browser Support

Requires the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) — works in **Chrome** and **Edge**. Firefox and Safari can use the notepad but without file open/save (they'll get browser-standard fallback dialogs).

## How It Works

It's a single HTML file. No build step, no framework, no backend. The File System Access API lets the browser read and write files with user permission. Settings are stored in `localStorage`.

## License

MIT
