/**
 * popup.js — Notepad Capture popup
 *
 * Flow:
 *   1. User clicks "Capture Selection" or "Capture Page"
 *   2. chrome.scripting.executeScript runs in the active tab to extract HTML
 *   3. htmlToMarkdown() converts it (defined in htmlToMarkdown.js)
 *   4. Optional frontmatter is prepended
 *   5. Payload is written to chrome.storage.local
 *   6. content_notepad.js (running on the Notepad tab) picks it up and inserts it
 */

const STORAGE_KEY = 'notepadCapture';

// --- UI refs ---
const tabInfo      = document.getElementById('tabInfo');
const addFrontmatter = document.getElementById('addFrontmatter');
const btnSelection = document.getElementById('btnSelection');
const btnPage      = document.getElementById('btnPage');
const statusEl     = document.getElementById('status');

let currentTab = null;

// --- Init ---
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  currentTab = tab;
  tabInfo.textContent = tab?.title || tab?.url || '(unknown tab)';
  tabInfo.title = tab?.url || '';
});

// --- Helpers ---
function setStatus(msg, type = '') {
  statusEl.textContent = msg;
  statusEl.className = type;
}

function setDisabled(on) {
  btnSelection.disabled = on;
  btnPage.disabled = on;
}

function getInsertMode() {
  return document.querySelector('input[name="insertMode"]:checked').value;
}

function buildFrontmatter(tab) {
  const today = new Date().toISOString().slice(0, 10);
  return [
    '---',
    `title: "${(tab.title || '').replace(/"/g, '\\"')}"`,
    `source: ${tab.url || ''}`,
    `date: ${today}`,
    '---',
    ''
  ].join('\n');
}

// --- Capture helpers (run in the target tab via executeScript) ---

/** Returns the selection as HTML, or empty string if nothing selected. */
function getSelectionHTML() {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return '';
  const range = sel.getRangeAt(0);
  const div = document.createElement('div');
  div.appendChild(range.cloneContents());
  return div.innerHTML;
}

/** Returns a best-effort content HTML from the page. */
function getPageHTML() {
  // Prefer semantic main content
  const main =
    document.querySelector('article') ||
    document.querySelector('main') ||
    document.querySelector('[role="main"]');
  return (main || document.body).innerHTML;
}

// --- Core capture flow ---
async function capture(mode) {
  if (!currentTab) { setStatus('No active tab found.', 'error'); return; }

  setDisabled(true);
  setStatus('Capturing…');

  try {
    const scriptFn = mode === 'selection' ? getSelectionHTML : getPageHTML;

    const [{ result: html }] = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: scriptFn
    });

    if (!html || !html.trim()) {
      if (mode === 'selection') {
        setStatus('No text selected on that page.', 'error');
      } else {
        setStatus('Could not capture page content.', 'error');
      }
      setDisabled(false);
      return;
    }

    let markdown = htmlToMarkdown(html);

    if (!markdown.trim()) {
      setStatus('Nothing useful found to convert.', 'error');
      setDisabled(false);
      return;
    }

    if (addFrontmatter.checked) {
      markdown = buildFrontmatter(currentTab) + '\n' + markdown;
    }

    const payload = {
      content: markdown,
      insertMode: getInsertMode(),
      timestamp: Date.now()
    };

    await chrome.storage.local.set({ [STORAGE_KEY]: payload });
    setStatus('Sent to Notepad.', 'success');

  } catch (err) {
    console.error('[Notepad Capture]', err);
    const msg = err.message || String(err);
    if (msg.includes('Cannot access')) {
      setStatus('Cannot access this page (browser restriction).', 'error');
    } else {
      setStatus('Error: ' + msg, 'error');
    }
  }

  setDisabled(false);
}

// --- Event listeners ---
btnSelection.addEventListener('click', () => capture('selection'));
btnPage.addEventListener('click', () => capture('page'));
