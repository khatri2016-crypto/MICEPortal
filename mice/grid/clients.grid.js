const columnDefs = [
  {
    field: "client",
    headerName: "Client",
    filter: "agTextColumnFilter",
    tooltipField: "client",
    headerTooltip: "Client",
  },
  {
    field: "industry",
    headerName: "Industry",
    filter: "agTextColumnFilter",
    tooltipField: "industry",
    headerTooltip: "Industry",
  },
  {
    field: "activeRFPs",
    headerName: "Active RFPs",
    filter: "agNumberColumnFilter",
    tooltipField: "activeRFPs",
    headerTooltip: "Active RFPs",
  },
  {
    field: "totalBookings",
    headerName: "Total Bookings",
    filter: "agNumberColumnFilter",
    tooltipField: "totalBookings",
    headerTooltip: "Total Bookings",
    width: 200,
  },
  {
    field: "lastEvent",
    headerName: "Last Event",
    filter: "agTextColumnFilter",
    tooltipField: "lastEvent",
    headerTooltip: "Last Event",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    filter: "agTextColumnFilter",
    tooltipField: "status",
    headerTooltip: "Status",
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
    width: 150,
  },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    filter: true,
    floatingFilter: true,
  },
  tooltipShowDelay: 500,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100, 200, 500],
  onCellDoubleClicked: (params) => openViewClientModal(params.data),
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#clientsGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  fetch("data/clients.json")
    .then((response) => response.json())
    .then((data) => {
      gridApi.setGridOption("rowData", data);
    });
});

function actionButtonsRenderer(params) {
  const container = document.createElement("div");
  container.className = "d-flex gap-2 mt-1";

  const viewBtn = document.createElement("button");
  viewBtn.className = "btn btn-sm btn-outline-secondary";
  viewBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-sm btn-outline-secondary";
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-sm btn-outline-secondary";
  deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openViewClientModal(params.data);
  });

  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openEditClientModal(params.data);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openDeleteClientModal();
  });

  container.append(viewBtn, editBtn, deleteBtn);
  return container;
}

function openViewClientModal(data) {
  $("#informativeModal .modal-title").text("Client Details");
  $("#informativeModal .modal-body").html(`
    <div class="mb-3">
              <label class="form-label fw-medium">Company Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="e.g. TechCorp Ltd" value="${data.client}" disabled />
            </div>
            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="form-label fw-medium">Contact Person</label>
                <input type="text" class="form-control" placeholder="Full name" disabled />
              </div>
              <div class="col-6">
                <label class="form-label fw-medium">Designation</label>
                <input type="text" class="form-control" placeholder="e.g. Event Manager" disabled />
              </div>
            </div>
            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="form-label fw-medium">Email</label>
                <input type="email" class="form-control" placeholder="contact@company.com" disabled />
              </div>
              <div class="col-6">
                <label class="form-label fw-medium">Phone</label>
                <input type="tel" class="form-control" placeholder="+977 98XXXXXXXX" disabled />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-medium">Industry</label>
              <select class="form-select" disabled>
                <option value="">Select industry</option>
                <option ${data.industry == "Technology" ? "selected" : null}>Technology</option>
                <option ${data.industry == "Events & DMC" ? "selected" : null}>Events & DMC</option>
                <option ${data.industry == "Conglomerate" ? "selected" : null}>Conglomerate</option>
                <option ${data.industry == "Banking & Finance" ? "selected" : null}>Banking & Finance</option>
                <option ${data.industry == "Non-Profit / Education" ? "selected" : null}>Non-Profit / Education</option>
                <option ${data.industry == "Trading & Commerce" ? "selected" : null}>Trading & Commerce</option>
                <option ${data.industry == "Telecommunications" ? "selected" : null}>Telecommunications</option>
                <option ${data.industry == "Tourism & Government" ? "selected" : null}>Tourism & Government</option>
                <option ${data.industry == "Investment & Holdings" ? "selected" : null}>Investment & Holdings</option>
                <option ${data.industry == "Other" ? "selected" : null}>Other</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-medium">Notes</label>
              <textarea class="form-control" rows="2" placeholder="Any additional details about the client..." disabled></textarea>
            </div>
    `);
  $("#informativeModal").modal("show");
}

function openEditClientModal(data) {
  $("#actionModal .modal-title").text("Update Client Details");
  $("#actionModal .modal-body").html(`
    <div class="mb-3">
              <label class="form-label fw-medium">Company Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" placeholder="e.g. TechCorp Ltd" value="${data.client}" />
            </div>
            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="form-label fw-medium">Contact Person</label>
                <input type="text" class="form-control" placeholder="Full name" />
              </div>
              <div class="col-6">
                <label class="form-label fw-medium">Designation</label>
                <input type="text" class="form-control" placeholder="e.g. Event Manager" />
              </div>
            </div>
            <div class="row g-3 mb-3">
              <div class="col-6">
                <label class="form-label fw-medium">Email</label>
                <input type="email" class="form-control" placeholder="contact@company.com" />
              </div>
              <div class="col-6">
                <label class="form-label fw-medium">Phone</label>
                <input type="tel" class="form-control" placeholder="+977 98XXXXXXXX" />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-medium">Industry</label>
              <select class="form-select">
                <option value="">Select industry</option>
                <option ${data.industry == "Technology" ? "selected" : null}>Technology</option>
                <option ${data.industry == "Events & DMC" ? "selected" : null}>Events & DMC</option>
                <option ${data.industry == "Conglomerate" ? "selected" : null}>Conglomerate</option>
                <option ${data.industry == "Banking & Finance" ? "selected" : null}>Banking & Finance</option>
                <option ${data.industry == "Non-Profit / Education" ? "selected" : null}>Non-Profit / Education</option>
                <option ${data.industry == "Trading & Commerce" ? "selected" : null}>Trading & Commerce</option>
                <option ${data.industry == "Telecommunications" ? "selected" : null}>Telecommunications</option>
                <option ${data.industry == "Tourism & Government" ? "selected" : null}>Tourism & Government</option>
                <option ${data.industry == "Investment & Holdings" ? "selected" : null}>Investment & Holdings</option>
                <option ${data.industry == "Other" ? "selected" : null}>Other</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-medium">Notes</label>
              <textarea class="form-control" rows="2" placeholder="Any additional details about the client..."></textarea>
            </div>
    `);
  $("#actionModal .modal-footer")
    .html(`<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="updateClient()">Update Client
            </button>`);
  $("#actionModal").modal("show");
}

function openDeleteClientModal() {
  $("#confirmationModal .modal-title").text(
    "are you sure you want to delete client?",
  );
  $("#confirmationModal").modal("show");
}

$("#confirmationModal .modal-footer button").on("click", () => {
  showLoading();
  setTimeout(() => {
    showToast("success", "Client has been deleted successfully.");
    hideLoading();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, 1000);
});

function updateClient() {
  showLoading();
  setTimeout(() => {
    $("#actionModal").modal("hide");
    showToast("success", "Client has been updated.");
    hideLoading();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, 1000);
}
