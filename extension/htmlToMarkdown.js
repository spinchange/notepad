/**
 * htmlToMarkdown — lightweight HTML-to-Markdown converter.
 * No dependencies. Uses DOMParser for safe, structured traversal.
 * Replace with Turndown.js for higher fidelity if needed.
 */

function htmlToMarkdown(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Strip non-content elements
  for (const el of doc.querySelectorAll(
    'script, style, noscript, nav, [role="navigation"], [role="banner"], [role="complementary"]'
  )) {
    el.remove();
  }

  // Prefer semantic main content over full body
  const root =
    doc.querySelector('article, main, [role="main"]') || doc.body;

  return convertNode(root).replace(/\n{3,}/g, '\n\n').trim();
}

function convertNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    // Collapse whitespace but preserve a single space
    return node.textContent.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const tag = node.tagName.toLowerCase();

  // Invisible / skipped elements
  if (['script', 'style', 'noscript', 'nav', 'footer', 'aside'].includes(tag)) {
    return '';
  }

  const inner = () =>
    Array.from(node.childNodes).map(convertNode).join('');

  switch (tag) {
    // --- Block headings ---
    case 'h1': return `\n# ${inner().trim()}\n\n`;
    case 'h2': return `\n## ${inner().trim()}\n\n`;
    case 'h3': return `\n### ${inner().trim()}\n\n`;
    case 'h4': return `\n#### ${inner().trim()}\n\n`;
    case 'h5': return `\n##### ${inner().trim()}\n\n`;
    case 'h6': return `\n###### ${inner().trim()}\n\n`;

    // --- Block containers ---
    case 'p':
    case 'div':
    case 'section':
    case 'article':
    case 'main':
    case 'header': {
      const text = inner().trim();
      return text ? `${text}\n\n` : '';
    }

    case 'blockquote': {
      const lines = inner().trim().split('\n');
      return lines.map(l => `> ${l}`).join('\n') + '\n\n';
    }

    case 'pre': {
      const codeEl = node.querySelector('code');
      const lang = (codeEl?.className || '').match(/language-(\S+)/)?.[1] || '';
      const text = (codeEl || node).textContent;
      return `\`\`\`${lang}\n${text.replace(/\n$/, '')}\n\`\`\`\n\n`;
    }

    case 'hr': return '\n---\n\n';
    case 'br': return '  \n';

    // --- Inline formatting ---
    case 'strong':
    case 'b': {
      const t = inner().trim();
      return t ? `**${t}**` : '';
    }
    case 'em':
    case 'i': {
      const t = inner().trim();
      return t ? `*${t}*` : '';
    }
    case 's':
    case 'del': {
      const t = inner().trim();
      return t ? `~~${t}~~` : '';
    }
    case 'code': {
      // Only inline code — pre>code is handled above
      if (node.closest('pre')) return node.textContent;
      return `\`${node.textContent}\``;
    }

    // --- Links & media ---
    case 'a': {
      const href = node.getAttribute('href') || '';
      const text = inner().trim();
      if (!text) return href;
      if (!href || href.startsWith('javascript:')) return text;
      return `[${text}](${href})`;
    }
    case 'img': {
      const src = node.getAttribute('src') || '';
      const alt = (node.getAttribute('alt') || '').trim();
      return src ? `![${alt}](${src})` : '';
    }

    // --- Lists ---
    case 'ul': {
      const items = Array.from(node.children)
        .filter(c => c.tagName === 'LI')
        .map(li => `- ${convertListItem(li)}`)
        .join('\n');
      return items ? items + '\n\n' : '';
    }
    case 'ol': {
      const items = Array.from(node.children)
        .filter(c => c.tagName === 'LI')
        .map((li, idx) => `${idx + 1}. ${convertListItem(li)}`)
        .join('\n');
      return items ? items + '\n\n' : '';
    }
    case 'li': return inner().trim();

    // --- Tables ---
    case 'table': return convertTable(node);
    case 'thead':
    case 'tbody':
    case 'tfoot':
    case 'tr':
    case 'th':
    case 'td': return inner();  // handled by convertTable

    default:
      return inner();
  }
}

function convertListItem(li) {
  // Flatten nested lists inline for now
  return Array.from(li.childNodes)
    .map(convertNode)
    .join('')
    .trim()
    .replace(/\n+/g, ' ');
}

function convertTable(table) {
  const rows = Array.from(table.querySelectorAll('tr'));
  if (!rows.length) return '';

  const cellText = (cell) =>
    Array.from(cell.childNodes).map(convertNode).join('').trim().replace(/\|/g, '\\|');

  const toRow = (tr) => {
    const cells = Array.from(tr.querySelectorAll('th, td'));
    return '| ' + cells.map(cellText).join(' | ') + ' |';
  };

  const headerRow = rows[0];
  const colCount = headerRow.querySelectorAll('th, td').length;
  const separator = '| ' + Array(colCount).fill('---').join(' | ') + ' |';

  const lines = [toRow(headerRow), separator, ...rows.slice(1).map(toRow)];
  return lines.join('\n') + '\n\n';
}
