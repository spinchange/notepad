/**
 * content_notepad.js — injected into the Notepad tab
 *
 * Watches chrome.storage.local for a 'notepadCapture' key.
 * When a new payload arrives, inserts the markdown content into
 * the #editor textarea and fires an input event so the app saves.
 *
 * Insert modes:
 *   append  — adds content at the end (default)
 *   prepend — adds content at the beginning
 *   replace — replaces all existing content
 *
 * The Notepad app itself is NOT modified — this is purely bolt-on.
 */

const STORAGE_KEY = 'notepadCapture';

let lastTimestamp = 0;

function insertContent(payload) {
  const { content, insertMode, timestamp } = payload;

  // Deduplicate — ignore if we've already processed this payload
  if (timestamp <= lastTimestamp) return;
  lastTimestamp = timestamp;

  const editor = document.getElementById('editor');
  if (!editor) {
    console.warn('[Notepad Capture] #editor not found');
    return;
  }

  const current = editor.value;

  let next;
  switch (insertMode) {
    case 'prepend':
      next = content + (current ? '\n\n---\n\n' + current : '');
      break;
    case 'replace':
      next = content;
      break;
    case 'append':
    default:
      next = current ? current + '\n\n---\n\n' + content : content;
      break;
  }

  editor.value = next;

  // Scroll to where the new content was inserted
  if (insertMode === 'append') {
    editor.scrollTop = editor.scrollHeight;
    editor.selectionStart = editor.selectionEnd = next.length;
  } else {
    editor.scrollTop = 0;
    editor.selectionStart = editor.selectionEnd = 0;
  }

  // Notify the app of the change (triggers autosave / dirty state)
  editor.dispatchEvent(new Event('input', { bubbles: true }));
  editor.focus();

  console.log(`[Notepad Capture] Inserted ${content.length} chars (mode: ${insertMode})`);
}

// --- Listen for storage changes ---
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes[STORAGE_KEY]) return;
  const payload = changes[STORAGE_KEY].newValue;
  if (payload) insertContent(payload);
});

// --- Also handle any payload that was stored before this script loaded ---
chrome.storage.local.get(STORAGE_KEY, (data) => {
  if (data[STORAGE_KEY]) {
    // Only auto-insert if it's fresh (within last 10 seconds)
    const payload = data[STORAGE_KEY];
    if (Date.now() - (payload.timestamp || 0) < 10_000) {
      insertContent(payload);
    }
  }
});
