let agenciesData
async function loadAndRenderAgencies() {
  const response = await fetch("../../corporate/data/agencies.json"); // ← one level up + into data/
  agenciesData = await response.json();
  renderAgencies(agenciesData);
}
function renderAgencies(agencies) {
  const container = document.getElementById("agencyGrid");
  const noResults = document.getElementById("noResults");
  container.innerHTML = "";

  if (agencies.length === 0) {
    noResults.classList.remove("d-none");
    return;
  }

  noResults.classList.add("d-none");

  agencies.forEach((agency) => {
    const card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
      <div class="card h-100 border-0 shadow-sm agency-card">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center mb-3">
            <div class="bg-secondary text-white rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style="width:60px;height:60px;">
              <i class="fa-solid fa-building fa-2x"></i>
            </div>
            <div>
              <h5 class="card-title mb-1">${agency.name}</h5>
              <p class="text-muted small mb-0">${agency.location}</p>
            </div>
          </div>
          <p class="flex-grow-1">${agency.description}</p>
          <div class="mt-auto">
            <div class="d-flex gap-2 flex-wrap mb-3">
              ${agency.specialties.map((s) => `<span class="badge bg-secondary opacity-50">${s}</span>`).join("")}
            </div>
            <a href="events.html?agencyId=${agency.id}" class="btn btn-outline-secondary btn-sm w-100 select-agency-btn" 
                    data-agency-id="${agency.id}" 
                    data-agency-name="${agency.name}">
              Select Agency
            </a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Search / filter logic (basic example)
document.getElementById("agencySearch")?.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = agenciesData.filter(
    (a) =>
      a.name.toLowerCase().includes(term) ||
      a.location.toLowerCase().includes(term) ||
      a.description.toLowerCase().includes(term),
  );
  renderAgencies(filtered);
});

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  loadAndRenderAgencies();
});

