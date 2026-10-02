(function () {
  const FLAGS = {
    "India": "🇮🇳", "United States": "🇺🇸", "United Kingdom": "🇬🇧", "Germany": "🇩🇪",
    "United Arab Emirates": "🇦🇪", "Canada": "🇨🇦", "Netherlands": "🇳🇱", "Australia": "🇦🇺",
    "France": "🇫🇷", "Belgium": "🇧🇪", "Brazil": "🇧🇷", "Spain": "🇪🇸", "Italy": "🇮🇹",
    "Mexico": "🇲🇽", "Saudi Arabia": "🇸🇦", "Egypt": "🇪🇬",
  };
  const PAGE_SIZE = 24;
  let page = 1;

  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const stats = document.getElementById("stats");
  const pager = document.getElementById("pager");
  const searchInput = document.getElementById("search");
  const countryFilter = document.getElementById("country-filter");
  const tierFilter = document.getElementById("tier-filter");

  const countries = [...new Set(PARTNERS.map(p => p.country))].sort();
  countries.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = `${FLAGS[c] || ""} ${c}`.trim();
    countryFilter.appendChild(opt);
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function getFiltered() {
    const q = searchInput.value.trim().toLowerCase();
    const country = countryFilter.value;
    const tier = tierFilter.value;
    return PARTNERS.filter(p => {
      if (country && p.country !== country) return false;
      if (tier && p.tier !== tier) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function render() {
    const filtered = getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > totalPages) page = totalPages;
    const start = (page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    grid.innerHTML = pageItems.map(p => `
      <div class="card ${p.tier}">
        <h3>${escapeHtml(p.name)}</h3>
        <div class="meta">
          <span class="badge ${p.tier}">${p.tier} Partner</span>
          <span class="country-chip">${FLAGS[p.country] || ""} ${escapeHtml(p.country)}</span>
        </div>
        <a class="profile-link" href="${p.url}" target="_blank" rel="noopener">View official profile →</a>
      </div>
    `).join("");

    empty.hidden = filtered.length !== 0;
    stats.textContent = `${filtered.length} of ${PARTNERS.length} Odoo partner companies` +
      (totalPages > 1 ? ` — page ${page} of ${totalPages}` : "");

    pager.innerHTML = totalPages > 1 ? `
      <button type="button" id="prev-page" ${page === 1 ? "disabled" : ""}>← Previous</button>
      <button type="button" id="next-page" ${page === totalPages ? "disabled" : ""}>Next →</button>
    ` : "";
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    if (prevBtn) prevBtn.addEventListener("click", () => { page--; render(); document.getElementById("controls-wrap").scrollIntoView({ behavior: "smooth" }); });
    if (nextBtn) nextBtn.addEventListener("click", () => { page++; render(); document.getElementById("controls-wrap").scrollIntoView({ behavior: "smooth" }); });
  }

  function resetAndRender() { page = 1; render(); }

  searchInput.addEventListener("input", resetAndRender);
  countryFilter.addEventListener("change", resetAndRender);
  tierFilter.addEventListener("change", resetAndRender);

  render();

  // Hero stats strip
  const heroStats = document.getElementById("hero-stats");
  if (heroStats) {
    const goldCount = PARTNERS.filter(p => p.tier === "Gold").length;
    heroStats.innerHTML = `
      <div class="stat"><b>${PARTNERS.length}</b><span>Partner companies</span></div>
      <div class="stat"><b>${countries.length}</b><span>Countries</span></div>
      <div class="stat"><b>${goldCount}</b><span>Gold-tier partners</span></div>
    `;
  }

  // Country guide cards (SEO content section)
  const guideGrid = document.getElementById("guide-grid");
  if (guideGrid && typeof COUNTRY_INFO !== "undefined") {
    guideGrid.innerHTML = countries.filter(c => COUNTRY_INFO[c]).map(c => `
      <div class="guide-card">
        <h3>${FLAGS[c] || ""} Odoo Partners in ${escapeHtml(c)}</h3>
        <p>${escapeHtml(COUNTRY_INFO[c])}</p>
        <button type="button" data-country="${escapeHtml(c)}">View ${escapeHtml(c)} partners →</button>
      </div>
    `).join("");

    guideGrid.querySelectorAll("button[data-country]").forEach(btn => {
      btn.addEventListener("click", () => {
        countryFilter.value = btn.dataset.country;
        resetAndRender();
        document.getElementById("controls-wrap").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // Sticky filter bar shadow once scrolled under it
  const controlsWrap = document.getElementById("controls-wrap");
  if (controlsWrap) {
    const sentinel = document.createElement("div");
    document.querySelector(".hero").after(sentinel);
    const io = new IntersectionObserver(([entry]) => {
      controlsWrap.classList.toggle("stuck", !entry.isIntersecting);
    });
    io.observe(sentinel);
  }
})();
