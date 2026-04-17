# AGENTS.md

## Purpose

This file records repo-specific agent guidance and durable notes discovered while working in `C:\dev\repos\notepad`.

## Working Rules

- Prefer PowerShell for local commands.
- Keep notes here concise and specific to this repo.
- Append durable findings during the session instead of keeping them only in chat.

## Session Notes

- 2026-04-05: Created `AGENTS.md` to capture repo guidance and session discoveries.
- 2026-04-05: `index.html` is the full app; current read mode already implements a lightweight custom formatter for headings, lists, quotes, inline styles, tags, and journal-style entries.
- 2026-04-05: User is considering markdown rendering on save and via the Read button, with `C:\dev\repos\mdview` as a reference for possible reuse.
- 2026-04-05: Initial recommendation is to treat markdown rendering in Notepad as a branch-level feature unless scope expands into a dedicated markdown-first product or large shared rendering library extraction.
- 2026-04-05: `C:\dev\repos\yanp\app.html` is the relevant reference app; `C:\dev\repos\yanp\index.html` is a spec/documentation page, not the editor app.
- 2026-04-05: `yanp/app.html` is a single-file browser vault app that already reads and writes `.md`, parses simple YAML frontmatter, resolves wikilinks, and renders markdown with `marked` in viewer mode while switching to raw markdown in edit mode.
- 2026-04-05: Most reusable ideas from `yanp/app.html` for Notepad are product patterns rather than direct code copy: markdown viewer/edit split, frontmatter-aware note metadata, and save-to-disk as raw markdown with immediate rendered refresh.
- 2026-04-05: Notepad now treats `.md` and `.markdown` files as markdown in Read mode; other file types still use the existing custom plain-text/journal renderer.
- 2026-04-05: Markdown Read mode hides a leading YAML frontmatter block instead of rendering it as body content.
- 2026-04-06: Markdown Read mode now parses simple top-of-file YAML frontmatter and shows a metadata header bar for `title`, `status`, `date`, `author`, and `tags`.
- 2026-04-06: Help text and legacy rendering were aligned away from clickable tag filtering; tags are now presented as inline text/pills rather than interactive filters.
- 2026-04-16: Markdown Read mode should not show the shared inline search bar; markdown uses browser find (`Ctrl+F`) while the inline search/filter UI remains legacy plain-text-only.
- 2026-04-16: Catppuccin theme button now cycles flavors in order: Latte -> Frappe -> Macchiato -> Mocha, persisted as `notepad-theme=catppuccin-<flavor>`.

## 2026-04-12 Session

**Committed:** All uncommitted markdown work from 2026-04-05/06 (~619-line diff) was reviewed, bug-fixed, and committed.

**Bugs fixed in `formatMarkdownInline`:**
- Double-escape bug: captured `href`/`src`/`alt`/`title` groups were from already-HTML-escaped text; calling `escapeHtml()` on them again double-encoded `&` in URLs. Fixed by removing redundant `escapeHtml()` calls on captured groups.
- Double-link bug: bare-URL auto-linker ran after the `[text](url)` regex, matching URLs already inside `href="..."` attributes and wrapping them in a second `<a>` tag. Fixed with negative lookbehind `(?<![="'])`.

**Added:** CommonMark two-space hard line break support in `renderMarkdownReadMode`. Paragraph lines now preserve trailing spaces until after hard-break detection; lines ending with `  ` emit `<br>` instead of joining with a space.

**Updated:** Help panel restructured into three sections (Markdown / YAML frontmatter / Plain text journal), now matches CommonMark spec, added CommonMark spec link (spec.commonmark.org). Ctrl+F noted as the find mechanism in markdown mode.

**Updated:** CHANGELOG backfilled for watermark, SVG icon, print fix (Apr 5) and markdown/frontmatter work (Apr 6). README updated with markdown rendering, frontmatter, and watermark features; Read Mode section rewritten to describe both modes clearly.

**Renderer notes — known acceptable limitations:**
- Nested lists render flat (no nesting support)
- `\*` escape sequences not supported (not a CommonMark escape)
- Renderer is hand-rolled, not a full CommonMark implementation — edge cases possible

**Discussed but not built:**
- Chrome Extension companion: clean architecture for tab capture → chrome.storage → content script on Notepad page → textarea insert. ~50-100 lines. Notepad stays passive.
- stdout/pipe to browser: not achievable via any browser API; clipboard bridge is the practical workaround.
- CommonMark chosen as canonical spec over GFM (GFM is a superset; following CommonMark ensures compatibility with GFM and most renderers, not vice versa).

## 2026-04-12 Session (continued)

**Added PWA:** `manifest.json`, `sw.js` (cache-first, offline capable), `icon-192.png`, `icon-512.png`. Two lines added to `index.html`: manifest link + SW registration. Web Share Target included in manifest — other apps can share text/URL into the editor via query params (`?text=&title=&url=`), handled and cleaned up on load.

**SW cache versioning rule:** bump `CACHE = 'notepad-vN'` in `sw.js` any time `index.html` changes. Currently at v4. The activate handler deletes old caches automatically.

**Table renderer improvements:**
- Column alignment now parsed from delimiter row (`:---` left, `---:` right, `:---:` center) and applied as inline `style` on `<th>`/`<td>`
- Escaped pipes (`\|`) handled via placeholder swap before splitting
- Ragged rows padded to header column count

**Code fence infinite loop fixes (renderMarkdownReadMode):**
- Root cause: `fenceMatch` regex only accepted `\w+` info strings; fences like `` ```js,ignore `` or `` ```` `` (4 backticks) caused `fenceMatch` to fail, paragraph loop to break immediately on `/^`{3,}/`, and `i` to never advance.
- Fix 1: `fenceMatch` now uses `` /^(`{3,})([^`]*)$/ `` — handles 3+ backtick fences and any info string without backticks.
- Fix 2: closing fence matched with `startsWith(fence)` to respect opening depth.
- Fix 3: paragraph loop break updated to `/^`{3,}/`.
- Fix 4: safety guard added — if `paragraphLines` is empty after the loop, `i++` unconditionally. Prevents any future unknown trigger from causing a freeze.

**Built:** Chrome Extension companion in `extension/` — 5 files, no dependencies, MV3.
- `manifest.json` — permissions: activeTab, scripting, storage; content_scripts match notepad URL
- `popup.html` + `popup.js` — captures selection or full page, converts HTML→Markdown, writes to chrome.storage.local
- `htmlToMarkdown.js` — standalone DOM-based converter (headings, links, lists, tables, code blocks, blockquotes)
- `content_notepad.js` — injected on Notepad tab; watches storage, inserts into #editor, fires input event
- Keyboard shortcut: Alt+Shift+N (configurable at chrome://extensions/shortcuts)
- Insert modes: append (default), prepend, replace
- Notepad app not modified — extension is bolt-on
