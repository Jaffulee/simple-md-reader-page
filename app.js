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

async function loadDocList() {
  const grid = document.getElementById("docGrid");
  const errEl = document.getElementById("docError");

  const jsonUrl = new URL("docs/_docs.json", window.location.href);

  try {
    const res = await fetch(jsonUrl);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

    const data = await res.json();
    if (!data || !Array.isArray(data.docs)) {
      throw new Error("Invalid JSON: expected { docs: [...] }");
    }

    const docs = [...data.docs];

    const hasAnyDate = docs.some(d =>
      typeof d.date === "string" && !Number.isNaN(Date.parse(d.date))
    );

    docs.sort((a, b) => {
      const aHas = typeof a.date === "string" && !Number.isNaN(Date.parse(a.date));
      const bHas = typeof b.date === "string" && !Number.isNaN(Date.parse(b.date));

      if (hasAnyDate) {
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;

        if (aHas && bHas) {
          const diff = Date.parse(b.date) - Date.parse(a.date);
          if (diff !== 0) return diff;
        }
      }

      const at = (a.title || "").toLowerCase();
      const bt = (b.title || "").toLowerCase();
      return at.localeCompare(bt);
    });

    grid.innerHTML = "";

    docs.forEach((doc) => {
      const a = document.createElement("a");
      a.className = "doc-card";
      a.href = `viewer.html?doc=${encodeURIComponent(doc.file)}`;

      const title = document.createElement("h3");
      title.className = "doc-title";
      title.textContent = doc.title;

      const summary = document.createElement("p");
      summary.className = "doc-meta";
      summary.textContent = doc.summary;

      a.append(title, summary);
      grid.appendChild(a);
    });

    errEl.hidden = true;
  } catch (e) {
    errEl.hidden = false;
    errEl.textContent = `Could not load documentation list. (${e.message})`;
  }
}



initThemeToggle();
loadDocList();
