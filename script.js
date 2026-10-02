(function () {
  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const stats = document.getElementById("stats");
  const searchInput = document.getElementById("search");
  const countryFilter = document.getElementById("country-filter");
  const tierFilter = document.getElementById("tier-filter");

  const countries = [...new Set(PARTNERS.map(p => p.country))].sort();
  countries.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    countryFilter.appendChild(opt);
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function render() {
    const q = searchInput.value.trim().toLowerCase();
    const country = countryFilter.value;
    const tier = tierFilter.value;

    const filtered = PARTNERS.filter(p => {
      if (country && p.country !== country) return false;
      if (tier && p.tier !== tier) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });

    grid.innerHTML = filtered.map(p => `
      <div class="card">
        <h3>${escapeHtml(p.name)}</h3>
        <div class="meta">
          <span class="badge ${p.tier}">${p.tier} Partner</span>
          <span class="country-chip">${escapeHtml(p.country)}</span>
        </div>
        <a class="profile-link" href="${p.url}" target="_blank" rel="noopener">View official profile →</a>
      </div>
    `).join("");

    empty.hidden = filtered.length !== 0;
    stats.textContent = `${filtered.length} of ${PARTNERS.length} Odoo partner companies`;
  }

  searchInput.addEventListener("input", render);
  countryFilter.addEventListener("change", render);
  tierFilter.addEventListener("change", render);

  render();

  // Country guide cards (SEO content section)
  const guideGrid = document.getElementById("guide-grid");
  if (guideGrid && typeof COUNTRY_INFO !== "undefined") {
    guideGrid.innerHTML = countries.filter(c => COUNTRY_INFO[c]).map(c => `
      <div class="guide-card">
        <h3>Odoo Partners in ${escapeHtml(c)}</h3>
        <p>${escapeHtml(COUNTRY_INFO[c])}</p>
        <button type="button" data-country="${escapeHtml(c)}">View ${escapeHtml(c)} partners →</button>
      </div>
    `).join("");

    guideGrid.querySelectorAll("button[data-country]").forEach(btn => {
      btn.addEventListener("click", () => {
        countryFilter.value = btn.dataset.country;
        render();
        document.getElementById("grid").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }
})();
