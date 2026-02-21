$("#newEventBtn")
  .off("click")
  .on("click", () => createNewEvent());

function createNewEvent() {
  $("#actionModal .modal-title").text("create new event");
  const modalBody = generateEventModalBody();
  const modalFooter = ` <button
    type="button"
    class="btn btn-secondary btn-sm"
    data-bs-dismiss="modal"
  >
    Cancel
  </button>
  <button
    type="button"
    onclick="newEvent()"
    class="btn btn-primary btn-sm"
    data-bs-dismiss="modal"
  >
    Save
  </button>`;
  $("#actionModal .modal-body").html(modalBody);
  $("#actionModal .modal-footer").html(modalFooter);
  const modal = new bootstrap.Modal(document.getElementById("actionModal"));
  modal.show();
}

function generateEventModalBody() {
  return `
  <form id="createEventForm">
          
          <!-- Row 1: Event Name & Client Name -->
          <div class="row g-4 mb-4">
            <div class="col-md-12">
              <label for="eventName" class="form-label fw-medium">Event Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="eventName" name="eventName" placeholder="e.g. Cultural Festival Evening" required>
            </div>
          </div>

          <!-- Row 2: Dates -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="startDate" class="form-label fw-medium">Start Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" id="startDate" name="startDate" required>
            </div>
            <div class="col-md-6">
              <label for="endDate" class="form-label fw-medium">End Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" id="endDate" name="endDate" required>
            </div>
          </div>

          <!-- Row 3: Deadline & Budget -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="responseDeadline" class="form-label fw-medium">Preferred Proposal Deadline</label>
              <input type="date" class="form-control" id="responseDeadline" name="responseDeadline" placeholder="When should agencies reply?">
            </div>
            <div class="col-md-6">
              <label for="budget" class="form-label fw-medium">Estimated Budget (NPR)</label>
              <div class="input-group">
                <span class="input-group-text">NPR</span>
                <input type="number" class="form-control" id="budget" name="budget" min="0" step="1000" placeholder="e.g. 580000">
              </div>
            </div>
          </div>

          <!-- Row 4: MICE Agency -->
          <div class="mb-4">
            <label for="miceAgent" class="form-label fw-medium">Select MICE Agency <span class="text-danger">*</span></label>
            <select class="form-select" id="miceAgent" name="miceAgent" required>
              <option value="">-- Select Agency --</option>
              <!-- Options will be populated by JavaScript -->
            </select>
          </div>

          <!-- Row 5: Notes -->
          <div class="">
            <label for="note" class="form-label fw-medium">Notes / Special Requirements</label>
            <textarea class="form-control" id="note" name="note" rows="4" placeholder="e.g. Traditional performance stage + food stalls, specific cultural requirements..."></textarea>
          </div>

        </form>
    `;
}

function newEvent() {
  showToast("success", "New event created successfully.");
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
  });
}

let agencyIdGlobal;
async function populateAgencyDropdown() {
  const select = document.getElementById("miceAgent");
  if (!select) return;
  const response = await fetch("../../corporate/data/agencies.json");
  const availableAgencies = await response.json();
  availableAgencies.forEach((agency) => {
    const option = document.createElement("option");
    option.value = agency.id; // what gets saved
    option.textContent = agency.name; // what user sees
    if (agencyIdGlobal && agency.id == agencyIdGlobal) {
      option.selected = true;
    }
    select.appendChild(option);
  });
}

// Call when modal opens
document
  .getElementById("actionModal")
  .addEventListener("show.bs.modal", async () => {
    await populateAgencyDropdown();
  });

document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");
  const agencyId = params.get("agencyId");
  if (eventId) {
    const events = await loadEvents();
    const event = events.find((x) => x.id == eventId);
    if (event.status == "Booked" || event.status == "Proposal Received")
      openRespondModal(event);
    else if (event.status == "Cancelled") openViewModal(event);
    else if (event.status == "Proposal Sent") openEditModal(event);
    return;
  }

  if (params.has("create")) {
    createNewEvent();
    return;
  }
  if (agencyId) {
    agencyIdGlobal = agencyId;
    createNewEvent();
    return;
  }
});
async function loadEvents() {
  const response = await fetch("../../corporate/data/events.json"); // ← one level up + into data/
  eventsData = await response.json();
  return eventsData;
}

async function loadAgencies() {
  const response = await fetch("../../corporate/data/agencies.json"); // ← one level up + into data/
  agenciesData = await response.json();
  return agenciesData;
}
