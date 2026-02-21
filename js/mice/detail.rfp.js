const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let rfp;

async function loadRfps() {
  const response = await fetch("../../mice/data/rfps.json"); // ← one level up + into data/
  const rfps = await response.json();
  rfp = rfps.find((x) => x.rfpId == id);
  initilaizeRfp(rfp);
  renderHoteslInvited(rfp);
}

function renderHoteslInvited(rfp) {
  const container = document.querySelector("#hotelsInvitedList");
  const hotelsInvited = rfp.hotelsInvited
    .split(",")
    .map((name) => name.trim()) // remove extra spaces
    .filter((name) => name.length > 0);

  hotelsInvited.forEach((name) => {
    const li = document.createElement("li");
    li.className = "mt-3 d-flex align-items-center gap-2"; // flex + gap for nice spacing

    // Icon link (optional: make the icon itself clickable)
    const iconLink = document.createElement("a");
    iconLink.href = "#"; // ← same URL as the text link, or different if needed
    iconLink.innerHTML =
      '<i class="fa-solid fa-arrow-turn-up" style="transform: rotate(90deg);"></i>';

    // Text link
    const textLink = document.createElement("a");
    textLink.textContent = name;
    textLink.href = "#"; // ← placeholder – replace with real URL
    textLink.className = "text-primary text-decoration-none"; // nice look

    // Append both to li
    li.appendChild(iconLink);
    li.appendChild(textLink);

    container.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadRfps();
  loadHotels();
});

function initilaizeRfp(rfp) {
  $("#eventName").text(rfp.eventName);
  $("#status").text(rfp.status);
  $("#deadline").text(rfp.deadline);
  $("#clientName").text(rfp.client);
  $("#eventDate").text(rfp.eventDate);
  $("#proposal").text(rfp.proposal);
}

$("#sendReminderBtn").on("click", () =>
  showToast("success", "Reminder has been sent to hotels."),
);
$("#editRfpBtn").on("click", () => {
  showLoading();
  setTimeout(() => {
    location.href = `/mice/edit-rfp.html?id=${id}`;
  }, 1000);
});

$("#inviteMoreHotelsBtn").on("click", () => showHotelsInvitationModal());

let hotels;
async function loadHotels() {
  const response = await fetch("../../mice/data/hotels.json"); // ← one level up + into data/
  hotels = await response.json();
}

function showHotelsInvitationModal() {
  $("#actionModal .modal-title").text("Invite Hotels");
  $("#actionModal .modal-dialog").addClass("modal-dialog-scrollable modal-lg");
  $("#actionModal .modal-body").html(buildInviteModalBodyHTML());
  $("#actionModal .modal-footer").html(`
    <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn btn-primary btn-sm"
              id="confirmInviteBtn" disabled
              onclick="showToast('success', 'Invitations sent successfully.'), confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
              })"
            >
 Send Invitations
            </button>
    `);
  $("#actionModal").modal("show");
}

// Build the full HTML string for modal body
function buildInviteModalBodyHTML() {
  let html = `
    <!-- Search + filter -->
    <div class="row g-3 mb-4">
      <div class="col-md-12">
        <div class="input-group">
          <span class="input-group-text bg-white"><i class="fas fa-search text-muted"></i></span>
          <input type="text" class="form-control" id="hotelSearchInModal" placeholder="Search by name, city, stars…">
        </div>
      </div>
    </div>

    <!-- List container -->
    <div id="hotelListContainer" class="border rounded-3 p-3 bg-light-subtle" style="min-height: 240px;">
      <!-- Checkboxes will be inserted here -->
    </div>

    <!-- No results -->
    <div id="noHotelsFound" class="text-center py-5 text-muted d-none">
      <i class="fas fa-search fa-2x mb-3 d-block"></i>
      No matching hotels found
    </div>

    <small class="text-muted d-block mt-3">
      Selected hotels will receive the existing RFP immediately.
    </small>
  `;

  return html;
}

// Populate the hotel checkboxes inside #hotelListContainer
function populateHotelList() {
  const container = document.getElementById("hotelListContainer");
  if (!container) return;

  container.innerHTML = "";

  const searchTerm = (
    document.getElementById("hotelSearchInModal")?.value || ""
  )
    .toLowerCase()
    .trim();

  let visible = 0;
  hotels.forEach((hotel) => {
    const text =
      `${hotel.name || ""} ${hotel.city || ""} ${hotel.stars || ""}`.toLowerCase();
    if (searchTerm && !text.includes(searchTerm)) return;

    visible++;

    const item = document.createElement("div");
    item.className = "form-check mb-3 border-bottom pb-3 hotel-item";
    item.innerHTML = `
      <input class="form-check-input" type="checkbox" value="${hotel.venueId}" id="hotel_${hotel.venueId}" name="hotel_select">
      <label class="form-check-label d-flex justify-content-between align-items-center w-100" for="hotel_${hotel.venueId}">
        <div>
          <strong>${hotel.name || "Unnamed"}</strong>
          <div class="text-muted small mt-1">
          ${hotel.address.split(",").at(-2)?.trim().split(/\s+/)[0] ?? ""} • ${hotel.star ? hotel.star + "★" : "?"} 
          </div>
        </div>
        <span class="badge bg-success-subtle text-success px-2 py-1">Available</span>
      </label>
    `;
    container.appendChild(item);
  });

  document
    .getElementById("noHotelsFound")
    ?.classList.toggle("d-none", visible > 0);
  updateInviteButtonState();
}

// Update button text & state
function updateInviteButtonState() {
  const count = document.querySelectorAll(
    '#hotelListContainer input[name="hotel_select"]:checked',
  ).length;
  const btn = document.getElementById("confirmInviteBtn");
  btn.disabled = count === 0;
  btn.innerHTML =
    count === 0
      ? '<i class="fas fa-paper-plane me-2"></i>Invite Selected Hotels'
      : `<i class="fas fa-paper-plane me-2"></i>Invite ${count} Hotel${count !== 1 ? "s" : ""}`;
}

// Main modal show handler – replace body + populate list
document
  .getElementById("actionModal")
  ?.addEventListener("show.bs.modal", async () => {
    populateHotelList();
    const searchInput = document.getElementById("hotelSearchInModal");
    if (searchInput) {
      searchInput.value = ""; // reset search
      searchInput.addEventListener("input", populateHotelList); // attach once per modal open
    }
  });

document.addEventListener("change", (e) => {
  if (e.target.matches('#actionModal input[name="hotel_select"]')) {
    updateInviteButtonState();
  }
});

// ============================ COMPARE SELECTED ===================================
let selectedProposalIds = [];
let proposals = [];
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
    const hotelsInvited = rfp.hotelsInvited
      .split(",")
      .map((name) => name.trim()) // remove extra spaces
      .filter((name) => name.length > 0);
    const invitedHotels = hotels.filter((x) => hotelsInvited.includes(x.name));

    const proposal = proposals.find((p) => p.proposalId === id);
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
