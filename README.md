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
- **Keyboard shortcuts** — Ctrl+S (save), Ctrl+O (open), Ctrl+N (new)
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
| Tab | Insert tab |

### Settings

Click the **Settings** button to:

- Toggle the letterhead bar (logo + name)
- Choose or remove a logo image
- Pick editor background and text colors
- Set a background image
- Reset everything to defaults

### Branding / Letterhead

1. Click **Settings** and check **Show letterhead**
2. Click the dashed box or **Choose** to pick a logo image
3. Type your name or company in the text field
4. Everything saves automatically — it will be there next time you open the page

## Browser Support

Requires the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) — works in **Chrome** and **Edge**. Firefox and Safari can use the notepad but without file open/save (they'll get browser-standard fallback dialogs).

## How It Works

It's a single HTML file. No build step, no framework, no backend. The File System Access API lets the browser read and write files with user permission. Settings are stored in `localStorage`.

## License

MIT
