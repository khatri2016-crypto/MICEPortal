const columnDefs = [
  {
    field: "name",
    headerName: "Name",
    filter: "agTextColumnFilter",
    tooltipField: "name",
    headerTooltip: "Name",
  },
  {
    field: "startDate",
    headerName: "Start Date",
    minWidth: 215,
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "startDate",
    headerTooltip: "Start Date",
  },
  {
    field: "endDate",
    headerName: "End Date",
    minWidth: 215,
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "endDate",
    headerTooltip: "End Date",
  },
  {
    field: "location",
    headerName: "Location",
    filter: "agTextColumnFilter",
    tooltipField: "location",
    headerTooltip: "Location",
  },
  {
    field: "agency",
    headerName: "Agency",
    filter: "agTextColumnFilter",
    tooltipField: "agency",
    headerTooltip: "Agency",
  },
  {
    field: "status",
    headerName: "Status",
    filter: "agTextColumnFilter",
    tooltipField: "status",
    headerTooltip: "Status",
  },
  {
    field: "note",
    headerName: "Note",
    filter: "agTextColumnFilter",
    tooltipField: "note",
    headerTooltip: "Note",
  },
  {
    field: "actions",
    headerName: "Actions",
    filter: false,
    floatingFilter: true,
    pinned: "right",
    lockPinned: true,
    suppressMovable: true,
    sortable: false,
    cellRenderer: actionButtonsRenderer,
    tooltipField: "actions",
    headerTooltip: "Actions",
  },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    filter: true,
    floatingFilter: true,
  },
  tooltipShowDelay: 500,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#eventsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/events.json")
    .then((response) => response.json())
    .then((data) => {
      gridApi.setGridOption("rowData", data);
    });
});

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2";

  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-sm btn-outline-secondary";
  viewBtn.textContent = "View";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.textContent = "Edit";

  const respondBtn = document.createElement("button");
  respondBtn.className = "btn btn-sm btn-outline-secondary";
  respondBtn.textContent = "Respond";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-secondary";
  deleteBtn.textContent = "Delete";

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openViewModal(params.data);
  });

  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openEditModal(params.data);
  });

  respondBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openRespondModal(params.data);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDeleteModal(params.data);
  });

  const canView = params.data.status === "Cancelled";
  const canEdit = params.data.status === "Proposal Sent";
  const canRespond =
    params.data.status === "Booked" ||
    params.data.status === "Proposal Received";
  const canDelete = params.data.status === "Cancelled";

  if (canView) container.append(viewBtn);
  if (canEdit) container.append(editBtn);
  if (canRespond) container.append(respondBtn);
  if (canDelete) container.append(deleteBtn);
  return container;
}

function openViewModal(data) {
  $("#actionModal .modal-title").text("Event Details");
  const modalBody = generateViewModal(data);
  $("#actionModal .modal-body").html(modalBody);
  $("#actionModal .modal-footer").html(`
    <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              Ok
            </button>
    `);
  $("#actionModal").modal("show");
}
function openEditModal(data) {
  $("#actionModal .modal-title").text("Edit Event");
  const modalBody = generateEditModal(data);
  $("#actionModal .modal-body").html(modalBody);
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
              onclick="showToast('success', 'Event updated successfully.'), confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
              })"
            >
              Save
            </button>
    `);
  $("#actionModal").modal("show");
}
function openRespondModal(data) {
  $("#actionModal .modal-title").text("Respond Event");
  const modalBody = generateResponseModal(data);
  $("#actionModal .modal-body").html(modalBody);
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
              onclick="showToast('success', 'Response sent successfully.'), confetti({
                particleCount: 150,
                spread: 90,
                origin: { y: 0.6 },
              })"
            >
              Respond
            </button>
    `);
  $("#actionModal").modal("show");
}

function openDeleteModal(data) {
  $("#actionModal .modal-title").text("Delete Event");
  $("#actionModal .modal-body").html(
    `Are you sure you want to delete the event <span class="fw-bold">${data.name}</span>?`,
  );
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
              class="btn btn-danger btn-sm"
              onclick="showToast('success', 'Event deleted successfully.')"
            >
              Delete
            </button>
    `);
  $("#actionModal").modal("show");
}

function generateEditModal(data) {
  return `
  <form id="editEventForm">
          
          <!-- Row 1: Event Name & Client Name -->
          <div class="row g-4 mb-4">
            <div class="col-md-12">
              <label for="eventName" class="form-label fw-medium">Event Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" id="eventName" value="${data.name}" name="eventName" placeholder="e.g. Cultural Festival Evening" required>
            </div>
          </div>

          <!-- Row 2: Dates -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="startDate" class="form-label fw-medium">Start Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" id="startDate" name="startDate" value="${data.startDate}" required>
            </div>
            <div class="col-md-6">
              <label for="endDate" class="form-label fw-medium">End Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" id="endDate" name="endDate" value="${data.endDate}" required>
            </div>
          </div>

          <!-- Row 3: Deadline & Budget -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="responseDeadline" class="form-label fw-medium">Preferred Proposal Deadline</label>
              <input type="date" class="form-control" id="responseDeadline" name="responseDeadline" value="${data.responseDeadline}"  placeholder="When should agencies reply?">
            </div>
            <div class="col-md-6">
              <label for="budget" class="form-label fw-medium">Estimated Budget (NPR)</label>
              <div class="input-group">
                <span class="input-group-text">NPR</span>
                <input type="number" class="form-control" id="budget" name="budget" value="${data.budget}"  min="0" step="1000" placeholder="e.g. 580000">
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
            <textarea class="form-control" id="note" name="note" rows="4" placeholder="e.g. Traditional performance stage + food stalls, specific cultural requirements...">${data.note}</textarea>
          </div>

        </form>
  `;
}

function generateViewModal(data) {
  return `
  <form id="editEventForm">
          
          <!-- Row 1: Event Name & Client Name -->
          <div class="row g-4 mb-4">
            <div class="col-md-12">
              <label for="eventName" class="form-label fw-medium">Event Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" disabled id="eventName" value="${data.name}" name="eventName" placeholder="e.g. Cultural Festival Evening" required>
            </div>
          </div>

          <!-- Row 2: Dates -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="startDate" class="form-label fw-medium">Start Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" disabled id="startDate" name="startDate" value="${data.startDate}" required>
            </div>
            <div class="col-md-6">
              <label for="endDate" class="form-label fw-medium">End Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" disabled id="endDate" name="endDate" value="${data.endDate}" required>
            </div>
          </div>

          <!-- Row 3: Deadline & Budget -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="responseDeadline" class="form-label fw-medium">Preferred Proposal Deadline</label>
              <input type="date" class="form-control" disabled id="responseDeadline" name="responseDeadline" value="${data.responseDeadline}"  placeholder="When should agencies reply?">
            </div>
            <div class="col-md-6">
              <label for="budget" class="form-label fw-medium">Estimated Budget (NPR)</label>
              <div class="input-group">
                <span class="input-group-text">NPR</span>
                <input type="number" class="form-control" disabled id="budget" name="budget" value="${data.budget}"  min="0" step="1000" placeholder="e.g. 580000">
              </div>
            </div>
          </div>

          <!-- Row 4: MICE Agency -->
          <div class="mb-4">
            <label for="miceAgent" class="form-label fw-medium">Select MICE Agency <span class="text-danger">*</span></label>
            <select class="form-select" disabled id="miceAgent" name="miceAgent" required>
              <option value="">-- Select Agency --</option>
              <!-- Options will be populated by JavaScript -->
            </select>
          </div>

          <!-- Row 5: Notes -->
          <div class="">
            <label for="note" class="form-label fw-medium">Notes / Special Requirements</label>
            <textarea class="form-control" id="note" disabled name="note" rows="4" placeholder="e.g. Traditional performance stage + food stalls, specific cultural requirements...">${data.note}</textarea>
          </div>

        </form>
  `;
}

function generateResponseModal(data) {
  return `
  <form id="editEventForm">
          
          <!-- Row 1: Event Name & Client Name -->
          <div class="row g-4 mb-4">
            <div class="col-md-12">
              <label for="eventName" class="form-label fw-medium">Event Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" disabled id="eventName" value="${data.name}" name="eventName" placeholder="e.g. Cultural Festival Evening" required>
            </div>
          </div>

          <!-- Row 2: Dates -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="startDate" class="form-label fw-medium">Start Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" disabled id="startDate" name="startDate" value="${data.startDate}" required>
            </div>
            <div class="col-md-6">
              <label for="endDate" class="form-label fw-medium">End Date <span class="text-danger">*</span></label>
              <input type="date" class="form-control" disabled id="endDate" name="endDate" value="${data.endDate}" required>
            </div>
          </div>

          <!-- Row 3: Deadline & Budget -->
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label for="responseDeadline" class="form-label fw-medium">Preferred Proposal Deadline</label>
              <input type="date" class="form-control" disabled id="responseDeadline" name="responseDeadline" value="${data.responseDeadline}"  placeholder="When should agencies reply?">
            </div>
            <div class="col-md-6">
              <label for="budget" class="form-label fw-medium">Estimated Budget (NPR)</label>
              <div class="input-group">
                <span class="input-group-text">NPR</span>
                <input type="number" class="form-control" disabled id="budget" name="budget" value="${data.budget}"  min="0" step="1000" placeholder="e.g. 580000">
              </div>
            </div>
          </div>

          <!-- Row 4: MICE Agency -->
          <div class="mb-4">
            <label for="miceAgent" class="form-label fw-medium">Select MICE Agency <span class="text-danger">*</span></label>
            <select class="form-select" disabled id="miceAgent" name="miceAgent" required>
              <option value="">-- Select Agency --</option>
              <!-- Options will be populated by JavaScript -->
            </select>
          </div>

          <!-- Row 5: Notes -->
          <div class="mb-4">
            <label for="note" class="form-label fw-medium">Notes / Special Requirements</label>
            <textarea class="form-control" id="note" disabled name="note" rows="4" placeholder="e.g. Traditional performance stage + food stalls, specific cultural requirements...">${data.note}</textarea>
          </div>

          <!-- Row 5: Notes -->
          <div class="">
            <label for="note" class="form-label fw-medium">Response Message</label>
            <textarea class="form-control" id="responseMessage" name="note" rows="4" placeholder="e.g. Budget negotiation and venue pictures..."></textarea>
          </div>

        </form>
  `;
}
