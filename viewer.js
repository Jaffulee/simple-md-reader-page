function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function initThemeToggle() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") setTheme(saved);

  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

function prettifyTitle(filename) {
  return filename
    .replace(/\.md$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

async function loadDoc() {
  const params = new URLSearchParams(window.location.search);
  const doc = params.get("doc");

  const contentEl = document.getElementById("content");
  const pillEl = document.getElementById("docPill");
  const errEl = document.getElementById("viewerError");
  const currentDocLink = document.getElementById("currentDocLink");

  if (!doc) {
    contentEl.innerHTML = "<p>No document specified.</p>";
    pillEl.textContent = "No doc";
    return;
  }

  pillEl.textContent = doc;
  if (currentDocLink) currentDocLink.textContent = prettifyTitle(doc);

  const docUrl = new URL(`docs/${doc}`, window.location.href);

  try {
    const res = await fetch(docUrl);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

    const md = await res.text();

    // Marked config (safe-ish defaults; still avoid untrusted markdown)
    marked.setOptions({
      mangle: false,
      headerIds: true
    });

    contentEl.innerHTML = marked.parse(md);
    document.title = `${prettifyTitle(doc)} • Docs`;

    errEl.hidden = true;
  } catch (e) {
    errEl.hidden = false;
    errEl.textContent = `Could not load document. (${e.message})`;
    contentEl.innerHTML = "<p>Failed to render document.</p>";
  }
}

initThemeToggle();
loadDoc();
