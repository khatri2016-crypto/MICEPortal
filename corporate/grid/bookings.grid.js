const columnDefs = [
  {
    headerName: "Event Name",
    field: "eventName",
    filter: "agTextColumnFilter",
    tooltipField: "eventName",
    headerTooltip: "Event Name",
  },
  {
    headerName: "Hotel",
    field: "hotelName",
    filter: "agTextColumnFilter",
    tooltipField: "hotelName",
    headerTooltip: "Hotel",
  },
  {
    field: "startDate",
    headerName: "Start Date",
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "startDate",
    headerTooltip: "Start Date",
  },
  {
    field: "endDate",
    headerName: "End Date",
    filter: "agDateColumnFilter",
    filterParams: dateFilterParams,
    tooltipField: "endDate",
    headerTooltip: "End Date",
  },
  {
    headerName: "Agency",
    field: "agency",
    filter: "agTextColumnFilter",
    tooltipField: "agency",
    headerTooltip: "Agency",
  },

  {
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
    width: 80,
  },
];

// Grid options (similar to events but simpler)
const gridOptions = {
  columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 80,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
  },
  domLayout: "normal",
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
};

// Initialize grid
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#bookingsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);
  fetch("data/bookings.json")
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

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openViewModal(params.data);
  });

  container.append(viewBtn);
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

function generateViewModal(data) {
  return `
  <form id="editEventForm">
          
          <!-- Row 1: Event Name & Client Name -->
          <div class="row g-4 mb-4">
            <div class="col-md-12">
              <label for="eventName" class="form-label fw-medium">Event Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" disabled id="eventName" value="${data.eventName}" name="eventName" placeholder="e.g. Cultural Festival Evening" required>
            </div>
          </div>

          <div class="row g-4 mb-4">
          <div class="col-md-12">
            <label for="hotelName" class="form-label fw-medium">Event Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" disabled id="hotelName" value="${data.hotelName}" name="hotelName" placeholder="e.g. Cultural Festival Evening" required>
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

          <!-- Row 4: MICE Agency -->
          <div>
            <label for="miceAgent" class="form-label fw-medium">Select MICE Agency <span class="text-danger">*</span></label>
            <input type="text" class="form-control" disabled id="miceAgent" value="${data.agency}" name="miceAgent" placeholder="e.g. Cultural Festival Evening" required>
          </div>
        </form>
  `;
}
