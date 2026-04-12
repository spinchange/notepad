# Notepad Capture — Chrome Extension

Captures content from any tab and sends it to the [Notepad](https://spinchange.github.io/notepad/) app.

## Install

1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** → select this `extension/` folder

## Usage

- Click the extension icon on any page
- Choose **Capture Selection** (uses highlighted text) or **Capture Page** (full article)
- Options:
  - **Add frontmatter** — prepends `---\ntitle / source / date\n---`
  - **Append / Prepend / Replace** — where the content goes in the editor
- Click capture — the Notepad tab updates instantly

**Keyboard shortcut:** `Alt+Shift+N` (Windows/Linux) / `Cmd+Shift+N` (Mac) opens the popup.
You can change this at `chrome://extensions/shortcuts`.

## How it works

```
Popup (popup.js + htmlToMarkdown.js)
  → chrome.scripting.executeScript → extracts HTML from active tab
  → converts to markdown
  → writes payload to chrome.storage.local

Content script (content_notepad.js) — runs on the Notepad tab
  → watches chrome.storage.onChanged
  → inserts markdown into #editor textarea
  → fires input event so the app registers the change
```

The Notepad app itself is unmodified — the extension is a bolt-on.

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Extension manifest (MV3) |
| `popup.html` | Popup UI |
| `popup.js` | Capture logic, frontmatter, storage write |
| `htmlToMarkdown.js` | Standalone HTML→Markdown converter |
| `content_notepad.js` | Injected into the Notepad tab; listens for storage changes |

## Notes

- The content script matches `https://spinchange.github.io/notepad/*` and `localhost`.
  If you host the app elsewhere, add the URL to `content_scripts.matches` in `manifest.json`.
- The HTML→Markdown converter handles headings, paragraphs, links, images,
  bold/italic/code, lists, blockquotes, code fences, and tables.
  For higher fidelity (e.g. nested lists), drop in [Turndown](https://github.com/mixmark-io/turndown):
  download `turndown.js`, add it to this folder, replace the `<script src="htmlToMarkdown.js">`
  tag in `popup.html` with `<script src="turndown.js">`, and in `popup.js` replace
  `htmlToMarkdown(html)` with `new TurndownService().turndown(html)`.
- Browser-internal pages (`chrome://`, `chrome-extension://`) cannot be captured — the
  extension will show an error message.
