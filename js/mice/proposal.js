let id;
let rfps;
let selectedProposalIds = [];
let proposals = [];
let hotels;

async function loadRfps() {
  const response = await fetch("../../mice/data/rfps.json"); // ← one level up + into data/
  rfps = await response.json();
}

async function loadProposals() {
  const response = await fetch("../../mice/data/proposals.json"); // ← one level up + into data/
  proposals = await response.json();
}

async function loadHotels() {
  const response = await fetch("../../mice/data/hotels.json"); // ← one level up + into data/
  hotels = await response.json();
}
// Build comparison table content
function renderComparisonTable(selectedIds) {
  const modal = document.getElementById("compareProposalsModal");
  const tbody = modal.querySelector("tbody");
  const theadRow = modal.querySelector("thead tr");
  const noSelection = document.getElementById("noSelectionMessage");

  if (!selectedIds.length) {
    noSelection.classList.remove("d-none");
    tbody.innerHTML = "";
    theadRow.innerHTML = '<th scope="col" class="bg-light">Criteria</th>';
    modal.querySelector("#exportComparisonBtn").disabled = true;
    return;
  }

  noSelection.classList.add("d-none");
  modal.querySelector("#exportComparisonBtn").disabled = false;

  // Clear existing columns (except first)
  while (theadRow.children.length > 1) {
    theadRow.removeChild(theadRow.lastChild);
  }

  // Add hotel columns
  selectedIds.forEach((id) => {
    // Find proposal data (you need to have rfp.proposals or similar)
    const proposal = proposals.find((x) => x.proposalId == id);
    const rfp = rfps.find((x) => x.rfpId == proposal.rfpId);
    const hotelsInvited = rfp.hotelsInvited
      .split(",")
      .map((name) => name.trim()) // remove extra spaces
      .filter((name) => name.length > 0);
    const invitedHotels = hotels.filter((x) => hotelsInvited.includes(x.name));

    const hotelName = invitedHotels.find(
      (h) => h.venueId === proposal.venueId,
    )?.name;

    const th = document.createElement("th");
    th.className = "text-center align-middle bg-light";
    th.style.minWidth = "220px";
    th.innerHTML = `
      <div class="fw-bold">${hotelName}</div>
      <small class="text-muted">${proposal.status || "—"}</small>
    `;
    theadRow.appendChild(th);
  });

  // Define rows (criteria) – customize based on your data model
  const criteria = [
    {
      label: "Proposed Amount",
      key: "proposedAmount",
      format: (v) => (v ? `NPR ${v.toLocaleString()}` : "—"),
    },
    {
      label: "Rooms Available (Peak)",
      key: "roomsAvailable.peak",
      format: (v) => v ?? "—",
    },
    {
      label: "Total Rooms Available",
      key: "roomsAvailable.total",
      format: (v) => v ?? "—",
    },
    {
      label: "Concessions / Special Offers",
      key: "concessions",
      format: (v) => v || "None",
    },
    {
      label: "Submitted At",
      key: "submittedAt",
      format: (v) => (v ? new Date(v).toLocaleDateString() : "—"),
    },
    {
      label: "Last Message",
      key: "lastMessageAt",
      format: (v) => (v ? new Date(v).toLocaleString() : "No messages"),
    },
    // Add more: F&B package, AV included, Sustainability score, etc.
  ];

  tbody.innerHTML = "";

  criteria.forEach((crit) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th scope="row" class="bg-light sticky-left">${crit.label}</th>`;

    selectedIds.forEach((id) => {
      const proposal = proposals.find((p) => p.proposalId === id);
      let value = crit.key.includes(".")
        ? crit.key.split(".").reduce((o, k) => o?.[k], proposal)
        : proposal[crit.key];

      value = crit.format ? crit.format(value) : (value ?? "—");

      const td = document.createElement("td");
      td.className = "text-center align-middle";
      td.innerHTML = value;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

// Wire up the button
document
  .querySelector('[data-action="compare-selected"]')
  ?.addEventListener("click", () => {
    if (selectedProposalIds.length < 2) {
      showToast("danger", "Please select at least 2 proposals to compare.");
      return;
    }

    if (selectedProposalIds.length > 6) {
      alert("Maximum 6 proposals can be compared at once for readability.");
      return;
    }

    renderComparisonTable(selectedProposalIds);

    const modal = new bootstrap.Modal(
      document.getElementById("compareProposalsModal"),
    );
    modal.show();
  });

// Optional: Export button (simple CSV download for MVP)
document
  .getElementById("exportComparisonBtn")
  ?.addEventListener("click", () => {
    showToast("success", "Export functionality – CSV generation coming soon");
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
    $("#compareProposalsModal").modal("hide");
  });

document.addEventListener("DOMContentLoaded", function () {
  loadRfps();
  loadProposals();
  loadHotels();
});
