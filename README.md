<!DOCTYPE html>
<html lang="en">

<body>

<p>
<a href="https://jaffulee.github.io/Jaffulee/">
  Visit my website
</a>
</p>

<hr>

<h1>Markdown Blog Reader Template</h1>

<p>
This repository implements a clean, responsive <strong>Markdown-powered blog and documentation reader</strong>
built entirely with <strong>plain HTML, CSS, and JavaScript</strong>.
</p>

<p>
It is designed for lightweight static hosting (e.g. GitHub Pages) while still supporting:
</p>

<ul>
  <li>Dynamic document loading via <code>fetch()</code></li>
  <li>Structured metadata via <code>_docs.json</code></li>
  <li>Single-template rendering for unlimited Markdown files</li>
  <li>Mobile-first responsive layout</li>
  <li>Light / dark theme toggle with persistence</li>
</ul>

<hr>

<h2>Project Structure</h2>

<pre>
/
├── index.html          # Homepage (auto-generates document cards)
├── viewer.html         # Markdown viewer template
├── styles.css          # Responsive styling and theming
├── app.js              # Homepage logic (loads docs list)
├── viewer.js           # Viewer logic (loads Markdown content)
└── docs/
    ├── _docs.json      # Document registry (file, title, summary)
    ├── doc1.md
    └── doc2.md
</pre>

<hr>

<h2>How Document Registration Works</h2>

<p>
The homepage reads metadata from:
</p>

<pre><code>docs/_docs.json</code></pre>

<p>
Each document must follow this strict schema:
</p>

<pre><code>{
  "docs": [
    {
      "file": "doc1.md",
      "title": "Getting Started",
      "summary": "Introduction and setup guide for the template."
    }
  ]
}
</code></pre>

<ul>
  <li><strong>file</strong> – Markdown filename inside <code>/docs</code></li>
  <li><strong>title</strong> – Display title on homepage</li>
  <li><strong>summary</strong> – Short preview text shown beneath the title</li>
</ul>

<p>
Each document is rendered at:
</p>

<pre><code>viewer.html?doc=filename.md</code></pre>

<hr>

<h2>Local Development & Debugging</h2>

<p>
Because the project loads JSON and Markdown using <code>fetch()</code>, it must be served over HTTP.
Opening <code>index.html</code> directly (via <code>file://</code>) will cause fetch errors.
</p>

<h3>Run a Local Server (Python)</h3>

<ol>
  <li>Open a terminal in the project root directory.</li>
  <li>Start the server:</li>
</ol>

<pre><code>python -m http.server 8000</code></pre>

<p>
Then open your browser and navigate to:
</p>

<pre><code>http://localhost:8000/</code></pre>

<h3>Stopping the Server</h3>

<p>
In the same terminal window, press:
</p>

<pre><code>Ctrl + C</code></pre>

<p>
This will immediately terminate the local server and return you to the command prompt.
</p>

<hr>

<h2>Common Local Issues</h2>

<h3>“Could not load documentation list”</h3>

<ul>
  <li>Ensure you are accessing <code>http://localhost:8000/</code></li>
  <li>Verify that <code>http://localhost:8000/docs/_docs.json</code> loads directly</li>
  <li>Disable browser cache in DevTools if changes appear inconsistent</li>
</ul>

<h3>GitHub Pages Note</h3>

<p>
If deploying to GitHub Pages, create an empty file named:
</p>

<pre><code>.nojekyll</code></pre>

<p>
This ensures that <code>_docs.json</code> (a dotfile) is properly served.
</p>

<hr>

<h2>Adding a New Document</h2>

<ol>
  <li>Add a new <code>.md</code> file to the <code>/docs</code> directory.</li>
  <li>Add a corresponding entry in <code>docs/_docs.json</code>.</li>
  <li>Refresh the homepage — the new document will appear automatically.</li>
</ol>

<hr>

<h2>Design Goals</h2>

<ul>
  <li>Minimal dependencies</li>
  <li>Fully static deployment</li>
  <li>Clear separation of structure, style, and logic</li>
  <li>Structured metadata-driven rendering</li>
</ul>

<hr>

<h2>Related Work</h2>

<p>
This repository forms part of a broader body of work exploring
<strong>AI systems, optimisation, and mathematical modelling</strong>.
</p>

<ul>
  <li>
    <strong>AI-Based Vehicle Tracking, Counting, and Lane Estimation</strong><br>
    End-to-end computer vision pipeline for detection, tracking, motion analysis,
    and unsupervised lane estimation.<br>
    <a href="https://github.com/Jaffulee/AI_car_counting">
      View repository
    </a>
  </li>

  <li>
    <strong>Gradient Descent Optimiser & Neural Network (From First Principles)</strong><br>
    A fully custom neural network framework implemented from scratch using
    tensor-based backpropagation and generalised Jacobians.<br>
    <a href="https://github.com/Jaffulee/deep_neural_network">
      View repository
    </a>
  </li>
</ul>

<hr>

<h2>Summary</h2>

<p>
This project demonstrates how a structured Markdown registry combined with a single rendering template
can provide a scalable, production-style blog or documentation system —
while remaining entirely static and dependency-light.
</p>

</body>
</html>
